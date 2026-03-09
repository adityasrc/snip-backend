import express from "express";
import { LinkSchema } from "../utils/zod.js";
import { LinkModel, ClickModel } from "../models/db.js";
import { nanoid } from 'nanoid';
import qrcode from 'qrcode';
import { middleware } from "../middleware.js";

const router = express.Router();

router.post("/shorten", middleware, async function (req, res) {
  try {
    const parsedData = LinkSchema.safeParse(req.body);
    if (!parsedData.success) return res.status(400).json({ message: "Incorrect inputs" });

    let finalId;
    const { title, originalUrl, customAlias, expiresAt } = parsedData.data;

    if (customAlias) {
      const checkAlias = await LinkModel.findOne({
        $or: [{ shortId: customAlias }, { customAlias: customAlias }]
      });
      if (checkAlias) return res.status(409).json({ message: "Alias already exists" });
      finalId = customAlias;
    } else {
      finalId = nanoid(6);
    }

    const link = await LinkModel.create({
      title: title,
      originalUrl: originalUrl,
      shortId: finalId,
      customAlias: customAlias || null,
      userId: req.userId,
      expiresAt: expiresAt || null
    });

    
    const qrDataUrl = await qrcode.toDataURL(originalUrl);

    
    return res.json({
      _id: link._id,
      finalId: finalId, 
      qrDataUrl: qrDataUrl,
      originalUrl
    });
    
  } catch (e) {
    return res.status(500).json({ message: "Server Error", error: e.message });
  }
});

router.get("/", middleware, async function (req, res) {
  try {
    const userId = req.userId;
    
    const links = await LinkModel.find({ userId }).sort({ createdAt: -1 }).lean(); 

    
    const linksWithQr = await Promise.all(links.map(async (link) => {
      const qrCode = await qrcode.toDataURL(link.originalUrl);
      return { ...link, qrCode }; // Add qrCode property
    }));

    res.json({ links: linksWithQr });
  } catch(e) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", middleware, async function (req, res) {
  try {
    const linkId = req.params.id;
    const userId = req.userId;

    const dlt = await LinkModel.findOneAndDelete({ userId, _id: linkId });

    if (!dlt) return res.status(404).json({ message: "Link Not Found" });

    await ClickModel.deleteMany({ linkId: linkId });

    res.json({ message: "Link and associated analytics deleted" });
  } catch(e) {
    return res.status(500).json({ message: "Server Error" });
  }
});

router.patch("/:id", middleware, async function (req, res) {
  //update ke liye
  try{
    const linkId = req.params.id;
    const parsedData = LinkSchema.safeParse(req.body);

    if(!parsedData.success){
      return res.status(400).json({ message: "Incorrect input" });
    }

    const userId = req.userId;

    await LinkModel.findOneAndUpdate({
      userId,
      _id: linkId
    }, {
      $set: {
        title: parsedData.data.title,
        originalUrl: parsedData.data.originalUrl
      }
    });

    res.json({ message: "Updated successfully" });
  } catch(e) {
    return res.status(500).json({ message: "Server Error" });
  }
});

 
router.get("/qr/:shortId", async (req, res) => {
    try {
        const link = await LinkModel.findOne({ shortId: req.params.shortId });
        if (!link) return res.status(404).json({ message: "Not found" });
        
        const qrDataUrl = await qrcode.toDataURL(link.originalUrl);
        res.json({ qrDataUrl });
    } catch (e) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/analytics/:linkId", middleware, async function (req, res) {
  //link data
  try{
    const linkId = req.params.linkId;
    const userId = req.userId;

    const link = await LinkModel.findOne({ _id: linkId, userId });

    if(!link){
      return res.status(404).json({ message: "Not found" });
    }

    const clickData = await ClickModel.find({ linkId: link._id });

    res.json({
      link,
      clicks: clickData
    });
  }catch(e){
    return res.status(500).json({ message: "Server Error" });
  }
});

export default router;