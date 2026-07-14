import express from "express";
import { LinkModel, ClickModel } from "../models/db.js";
import { parseUserAgent } from "../utils/ua.js";
import geoip from "geoip-lite";
import { getRedisClient } from "../utils/redis.js";

const router = express.Router();

router.get("/", function (req, res) {
  res.status(200).json({
    message: "Snip Backend is alive",
  });
});

router.get("/:shortId", async function (req, res) {
  const shortId = req.params.shortId;
  const cacheKey = `snip:link:${shortId}`;

  try {
    let link = null;

    try {
      const redis = getRedisClient();
      const cached = await redis.get(cacheKey);
      if (cached) {
        link = JSON.parse(cached);
      }
    } catch (redisErr) {
      console.error("[Redis] Cache read failed:", redisErr.message);
    }

    if (!link) {
      link = await LinkModel.findOne({ shortId: shortId }).lean();

      if (link) {
        let ttl = 7 * 24 * 60 * 60; // 7 days for permanent links
        if (link.expiresAt) {
          const secondsLeft = Math.floor((new Date(link.expiresAt) - Date.now()) / 1000);
          ttl = Math.max(secondsLeft, 1);
        }

        try {
          const redis = getRedisClient();
          await redis.setex(cacheKey, ttl, JSON.stringify(link));
        } catch (redisErr) {
          console.error("[Redis] Cache write failed:", redisErr.message);
        }
      }
    }

    if (!link) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
      return res.status(410).json({
        message: "Not found",
      });
    }

    res.redirect(link.originalUrl);

    await LinkModel.updateOne(
      { shortId: shortId },
      {
        $inc: { clicks: 1 },
      },
    );

    const ua = req.headers["user-agent"];
    const { browser: browserName, device: deviceType } = parseUserAgent(ua);
    const referrer = req.query.ref || req.get("Referrer") || "Direct";

    let ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.headers["x-real-ip"] ||
      req.socket.remoteAddress;

    if (ip.startsWith("::ffff:")) {
      ip = ip.substring(7);
    }

    const geo = geoip.lookup(ip);

    ClickModel.create({
      linkId: link._id,
      browser: browserName,
      device: deviceType,
      referrer,
      country: geo ? geo.country : "Unknown",
      city: geo ? geo.city : "Unknown",
    }).catch((err) => console.log("Analytics save error", err));
  } catch (e) {
    if (!res.headersSent) {
      console.error("Redirection Error:", e);
    }
  }
});

export default router;
