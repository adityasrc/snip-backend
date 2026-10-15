import express from "express";
import rateLimit from "express-rate-limit";
import { requireAuth } from "../middleware.js";
import {
  createShortLink,
  getUserLinks,
  deleteLink,
  updateLink,
  getLinkAnalytics,
} from "../controllers/linkController.js";

const router = express.Router();

const createLinkLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { message: "Too many links created, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
router.post("/shorten", createLinkLimiter, requireAuth, createShortLink);
router.get("/", requireAuth, getUserLinks);
router.delete("/:id", requireAuth, deleteLink);
router.patch("/:id", requireAuth, updateLink);
router.get("/analytics/:linkId", requireAuth, getLinkAnalytics);

export default router;
