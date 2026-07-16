import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.js";
import linkRoutes from "./routes/links.js";
import redirectRoutes from "./routes/redirect.js";

const PORT = process.env.PORT || 10000;

const app = express();

app.set("trust proxy", 1);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use(cors({ 
  origin: [
    process.env.FRONTEND_URL,
    "http://localhost:5173",
    "http://localhost:3000"
  ].filter(Boolean) 
}));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many auth attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

const createLinkLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many links created, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/links/shorten", createLinkLimiter);
app.use("/api/links", linkRoutes);
app.use("/", redirectRoutes);

app.use("*", function (req, res) {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
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