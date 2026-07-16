import express from "express";
import { LinkSchema } from "../utils/zod.js";
import { LinkModel, ClickModel } from "../models/db.js";
import { generateShortId } from "../utils/base62.js";
import { getRedisClient } from "../utils/redis.js";
import qrcode from 'qrcode';
import { requireAuth } from "../middleware.js";

const router = express.Router();
const BASE_URL = process.env.FRONTEND_URL || "http://localhost:5173";

router.post("/shorten", requireAuth, async function (req, res) {
  try {
    const parsedData = LinkSchema.safeParse(req.body);
    if (!parsedData.success) return res.status(400).json({ message: "Incorrect inputs" });

    let shortUrl;
    const { title, originalUrl, customAlias, expiresAt } = parsedData.data;

    if (customAlias) {
      const aliasExists = await LinkModel.exists({
        $or: [{ shortId: customAlias }, { customAlias: customAlias }]
      });

      if (aliasExists) {
        return res.status(409).json({ message: "Alias already exists" });
      }

      shortUrl = customAlias;
    } else {
      shortUrl = await generateShortId();
    }

    const link = await LinkModel.create({
      title: title,
      originalUrl: originalUrl,
      shortId: shortUrl,
      customAlias: customAlias || null,
      userId: req.userId,
      expiresAt: expiresAt || null
    });

    const qrDataUrl = await qrcode.toDataURL(`${BASE_URL}/${shortUrl}`);

    return res.json({
      _id: link._id,
      finalId: shortUrl,
      qrDataUrl: qrDataUrl,
      originalUrl: originalUrl
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.get("/", requireAuth, async function (req, res) {
  try {
    const userId = req.userId;

    const links = await LinkModel.find({ userId })
      .sort({ createdAt: -1 })
      .limit(100)
      .lean();

    return res.json({ links });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", requireAuth, async function (req, res) {
  try {
    const linkId = req.params.id;
    const userId = req.userId;

    const dlt = await LinkModel.findOneAndDelete({ userId, _id: linkId });

    if (!dlt) return res.status(404).json({ message: "Link Not Found" });

    await ClickModel.deleteMany({ linkId: linkId });

    try {
      const redis = getRedisClient();
      await redis.del(`snip:link:${dlt.shortId}`);
    } catch (redisErr) {
      console.error("[Redis] Cache invalidation failed:", redisErr.message);
    }

    res.json({ message: "Link and associated analytics deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/:id", requireAuth, async function (req, res) {
  try {
    const linkId = req.params.id;
    const parsedData = LinkSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({ message: "Incorrect input" });
    }

    const userId = req.userId;

    const updated = await LinkModel.findOneAndUpdate({
      userId,
      _id: linkId
    }, {
      $set: {
        title: parsedData.data.title,
        originalUrl: parsedData.data.originalUrl
      }
    }, { new: true });

    if (updated) {
      try {
        const redis = getRedisClient();
        await redis.del(`snip:link:${updated.shortId}`);
      } catch (redisErr) {
        console.error("[Redis] Cache invalidation failed:", redisErr.message);
      }
    }

    res.json({ message: "Updated successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server Error" });
  }
});

router.get("/qr/:shortId", async (req, res) => {
  try {
    const link = await LinkModel.findOne({ shortId: req.params.shortId });
    if (!link) return res.status(404).json({ message: "Not found" });

    const qrDataUrl = await qrcode.toDataURL(`${BASE_URL}/${link.shortId}`);
    res.json({ qrDataUrl });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/analytics/:linkId", requireAuth, async function (req, res) {
  try {
    const linkId = req.params.linkId;
    const userId = req.userId;

    const link = await LinkModel.findOne({ _id: linkId, userId }).lean();

    if (!link) {
      return res.status(404).json({ message: "Not found" });
    }

    const clickData = await ClickModel.find({ linkId: link._id }).lean();

    res.json({
      link,
      clicks: clickData
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server Error" });
  }
});

export default router;