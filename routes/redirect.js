import express from "express";
import { handleRedirect } from "../controllers/redirectController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Snip Backend is alive",
  });
});

router.get("/:shortId", handleRedirect);

export default router;
