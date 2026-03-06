import express from "express";
import { LinkSchema } from "../utils/zod.js";
import { LinkModel, ClickModel } from "../models/db.js";
import { nanoid } from 'nanoid';
import qrcode from 'qrcode';
import { middleware } from "../middleware.js";

const router = express.Router();

router.post("/shorten", middleware, async function (req, res) {
  //url shortening
  //auth is left (done via middleware)
  try {
    const parsedData = LinkSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Incorrect inputs"
      });
    }

    let finalId;
    const { title, originalUrl, customAlias, expiresAt } = parsedData.data;

    if (customAlias) {
      // Check collision in both shortId and customAlias fields
      const checkAlias = await LinkModel.findOne({
        $or: [{ shortId: customAlias }, { customAlias: customAlias }]
      });

      if (checkAlias) {
        return res.status(409).json({
          message: "Alias already exists"
        });
      } else {
        finalId = customAlias;
      }
    } else {
      const shortId = nanoid(6); // customized length to 6
      //nanoid - unique string id generator for js
      finalId = shortId;
    }

    const link = await LinkModel.create({
      title: title,
      originalUrl: originalUrl,
      shortId: finalId,
      customAlias: customAlias || null,
      userId: req.userId,
      expiresAt: expiresAt || null
    });

    return res.json({
      shortId: finalId,
      originalUrl
    });
    
  } catch (e) {
    return res.status(500).json({
      message: "Server Error",
      error: e.message
    });
  }
});

router.get("/", middleware, async function (req, res) {
  //dashboard
  try{
    const userId = req.userId;
    const links = await LinkModel.find({ //find all links with this userId
      userId
    }).sort({ createdAt: -1 }); // Naya: Latest links pehle aayenge

    res.json({ //send all links of user
      links
    });
  }catch(e){
    return res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", middleware, async function (req, res) {
  // link delete ke liye
  try{
    const linkId = req.params.id;
    const userId = req.userId;

    const dlt = await LinkModel.findOneAndDelete({
      userId,
      _id: linkId
    });

    if(!dlt){
      return res.status(404).json({ message: "Link Not Found" });
    }

    res.json({ message: "Link deleted" });
  }catch(e){
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