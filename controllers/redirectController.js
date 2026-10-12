import { LinkModel, ClickModel } from "../models/db.js";
import { parseUserAgent } from "../utils/ua.js";
import geoip from "geoip-lite";
import { getRedisClient } from "../utils/redis.js";

const BOT_USER_AGENTS = /twitterbot|telegrambot|whatsapp|facebookexternalhit|slackbot|discordbot|linkedinbot|googlebot|bingbot|applebot|preview|crawler|spider/i;

export async function handleRedirect(req, res) {
  const shortId = req.params.shortId;
  const cacheKey = `snip:link:${shortId}`;

  try {
    let link = null;

    // try reading from redis cache
    try {
      const redis = getRedisClient();
      const cached = await redis.get(cacheKey);
      if (cached) {
        link = JSON.parse(cached);
      }
    } catch (redisErr) {
      console.error("[Redis] Cache read failed:", redisErr.message);
    }

    // if not in cache, fetch from mongodb
    if (!link) {
      link = await LinkModel.findOne({ shortId }).lean();
    }

    // return 404 if link does not exist
    if (!link) {
      return res.status(404).json({ message: "Not found" });
    }

    // save to redis with dynamic ttl if not already cached
    let ttl = 7 * 24 * 60 * 60; // 7 days in seconds
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

    // check link expiration
    if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
      return res.status(410).json({ message: "Link expired" });
    }

    const userAgent = req.get("User-Agent") || "";

    // redirect immediately with 302 to prevent browser caching and allow analytics tracking
    res.redirect(302, link.originalUrl);

    // skip tracking for preview crawlers
    if (BOT_USER_AGENTS.test(userAgent)) return;

    // fire-and-forget: update click counter in background
    LinkModel.updateOne(
      { shortId },
      { $inc: { clicks: 1 } }
    ).catch((err) => console.error("Link clicks update error:", err));

    // fire-and-forget: track visitor analytics in background
    const { browser: browserName, device: deviceType } = parseUserAgent(userAgent);
    const referrer = req.query.ref || req.get("Referrer") || "Direct";

    const forwarded = req.headers["x-forwarded-for"];
    let ip =
      req.headers["cf-connecting-ip"] ||
      (typeof forwarded === "string" ? forwarded.split(",")[0].trim() : null) ||
      req.headers["x-real-ip"] ||
      req.ip ||
      req.socket.remoteAddress;

    if (ip && ip.startsWith("::ffff:")) {
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
    }).catch((err) => console.error("Analytics save error:", err));

  } catch (e) {
    console.error("Redirection Error:", e);
    if (!res.headersSent) {
      return res.status(500).json({ message: "Server Error" });
    }
  }
}
