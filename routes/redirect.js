import express from "express";
import { LinkModel, ClickModel } from "../models/db.js";
import { UAParser } from "ua-parser-js";
import geoip from "geoip-lite";

const router = express.Router();

router.get("/", function (req, res) {
  res.status(200).json({
    message: "Snip Backend is alive",
  });
});

router.get("/:shortId", async function (req, res) {
  //click tracking
  const shortId = req.params.shortId; // extracting shortId form url params

  try {
    const link = await LinkModel.findOne({
      shortId: shortId,
    }).lean();

    if (!link) {
      return res.status(404).json({
        // 404 == not found
        message: "Not found",
      });
    }

    if (link.expiresAt && link.expiresAt < new Date()) {
      return res.status(410).json({
        // 410 matlab gone means link expired
        message: "Not found",
      });
    }

    // Redirect pehle kar do
    res.redirect(link.originalUrl); // redirect is express inbult funcition

    // Background Async task (Increases clicks and logs analytics)
    await LinkModel.updateOne(
      { shortId: shortId },
      {
        $inc: { clicks: 1 },
      },
    );

    const ua = req.headers["user-agent"];
    const parse = new UAParser(ua);
    const browserName = parse.getBrowser().name;
    const deviceType = parse.getDevice().type || "Desktop";
    const referrer = req.get("Referrer") || "Direct";

    // IP based Location
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
    // Don't res.send if already redirected, handle silently
    console.error("Redirection Error:", e);
  }
});

export default router;
