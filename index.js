import dotenv from "dotenv";
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error("FATAL: JWT_SECRET is missing from environment");
}

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.js";
import linkRoutes from "./routes/links.js";
import redirectRoutes from "./routes/redirect.js";

const PORT = process.env.PORT || 10000;

const app = express();

app.use(express.json()); // to parse the json body
app.use(cors({ 
  origin: [
    process.env.FRONTEND_URL, 
    "https://getsnip.vercel.app", 
    "http://localhost:5173",
    "http://localhost:3000"
  ].filter(Boolean) 
}));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  message: { message: "Too many requests, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth", limiter, authRoutes);
app.use("/api/links", limiter, linkRoutes);
app.use("/", redirectRoutes); // The short link redirector

// Global Error Handler (SDE-1 Flex)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Internal Server Error! Something went wrong." });
});



async function main() {
  try {
    await mongoose.connect(process.env.MD_URL);
    console.log("Connected to MongoDB");
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at port ${PORT}`);
    });
  } catch (e) {
    console.error("DB Connection Failed:", e.message);
  }
}

main();
