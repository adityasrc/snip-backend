import { LinkSchema } from "../utils/zod.js";
import { LinkModel, ClickModel } from "../models/db.js";
import { generateShortId } from "../utils/base62.js";
import { getRedisClient } from "../utils/redis.js";

function getTopCounts(items, getKey, limit = 5) {
  const counts = items.reduce((acc, item) => {
    const key = getKey(item) || "Unknown";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

export async function createShortLink(req, res) {
  try {
    const parsedData = LinkSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        message: "Incorrect inputs",
        error: parsedData.error.flatten().fieldErrors,
      });
    }

    let shortUrl;
    const RESERVED_ALIASES = ["api", "signin", "signup", "dashboard", "analytics", "404"];

    if (customAlias) {
      if (RESERVED_ALIASES.includes(customAlias.toLowerCase())) {
        return res.status(400).json({ message: "That alias is reserved" });
      }

      const aliasExists = await LinkModel.exists({
        $or: [{ shortId: customAlias }, { customAlias }],
      });

      if (aliasExists) {
        return res.status(409).json({ message: "Alias already exists" });
      }

      shortUrl = customAlias;
    } else {
      shortUrl = await generateShortId();
    }

    const link = await LinkModel.create({
      title: title || originalUrl,
      originalUrl,
      shortId: shortUrl,
      customAlias: customAlias || null,
      userId: req.userId,
      expiresAt: expiresAt || null,
    });

    return res.json({
      _id: link._id,
      finalId: shortUrl,
      originalUrl,
    });
  } catch (e) {
    console.error(e);
    // handle race condition for duplicate custom alias
    if (e.code === 11000) {
      return res.status(409).json({ message: "Alias already exists" });
    }
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function getUserLinks(req, res) {
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
}

export async function deleteLink(req, res) {
  try {
    const linkId = req.params.id;
    const userId = req.userId;

    const dlt = await LinkModel.findOneAndDelete({ userId, _id: linkId });
    if (!dlt) {
      return res.status(404).json({ message: "Link Not Found" });
    }

    await ClickModel.deleteMany({ linkId });

    // clear redis cache if cached
    try {
      const redis = getRedisClient();
      await redis.del(`snip:link:${dlt.shortId}`);
    } catch (redisErr) {
      console.error("[Redis] Cache invalidation failed:", redisErr.message);
    }

    return res.json({ message: "Link and associated analytics deleted" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function updateLink(req, res) {
  try {
    const linkId = req.params.id;
    const parsedData = LinkSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Incorrect inputs",
        error: parsedData.error.flatten().fieldErrors,
      });
    }

    const userId = req.userId;

    const updated = await LinkModel.findOneAndUpdate(
      { userId, _id: linkId },
      {
        $set: {
          title: parsedData.data.title,
          originalUrl: parsedData.data.originalUrl,
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Link Not Found" });
    }

    // clear redis cache
    try {
      const redis = getRedisClient();
      await redis.del(`snip:link:${updated.shortId}`);
    } catch (redisErr) {
      console.error("[Redis] Cache invalidation failed:", redisErr.message);
    }

    return res.json({ message: "Updated successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server Error" });
  }
}

export async function getLinkAnalytics(req, res) {
  try {
    const linkId = req.params.linkId;
    const userId = req.userId;

    const link = await LinkModel.findOne({ _id: linkId, userId }).lean();
    if (!link) {
      return res.status(404).json({ message: "Not found" });
    }

    const clicks = await ClickModel.find({ linkId: link._id }).lean();

    const devices = getTopCounts(clicks, (c) => c.device, 10);
    const browsers = getTopCounts(clicks, (c) => c.browser, 5);
    const countries = getTopCounts(clicks, (c) => c.country, 5);
    const referrers = getTopCounts(clicks, (c) => c.referrer || "Direct", 5);

    // build continuous 7-day timeline (utc)
    const timeline = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setUTCDate(d.getUTCDate() - i);
      const dateStr = d.toISOString().split("T")[0];

      const dayClicks = clicks.filter((c) => {
        if (!c.timestamp) return false;
        return new Date(c.timestamp).toISOString().split("T")[0] === dateStr;
      }).length;

      timeline.push({ date: dateStr, clicks: dayClicks });
    }

    const lastClick = clicks.length > 0
      ? clicks.reduce((latest, c) => (new Date(c.timestamp) > new Date(latest) ? c.timestamp : latest), clicks[0].timestamp)
      : null;

    const summary = {
      totalClicks: clicks.length,
      lastClick,
    };

    return res.json({
      link,
      analytics: {
        devices,
        browsers,
        countries,
        referrers,
        timeline,
        summary,
      },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server Error" });
  }
}
