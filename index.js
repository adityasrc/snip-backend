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
import { FRONTEND_URL } from "./config.js";

const PORT = process.env.PORT || 10000;
const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL || process.env.MD_URL;

const app = express();

app.set("trust proxy", true);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

const rawOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
  : ["http://localhost:5173", "http://localhost:3000", "https://trysnip.vercel.app"];

const allowedOrigins = Array.from(new Set([...rawOrigins, FRONTEND_URL].filter(Boolean)));

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many auth attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/links", linkRoutes);
app.use("/", redirectRoutes);

app.use(function (req, res) {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

let server;

async function main() {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running at port ${PORT}`);
    });
  } catch (e) {
    console.error("DB Connection Failed:", e.message);
    process.exit(1);
  }
}

const shutdown = async (signal) => {
  console.log(`\nReceived ${signal}. Starting graceful shutdown...`);
  if (server) {
    server.close(() => {
      console.log("HTTP server closed.");
    });
  }
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
  } catch (err) {
    console.error("Error during graceful shutdown:", err);
    process.exit(1);
  }
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

main();