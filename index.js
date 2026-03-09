import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.js";
import linkRoutes from "./routes/links.js";
import redirectRoutes from "./routes/redirect.js";

const PORT = process.env.PORT || 10000;

const app = express();

app.use(express.json()); // to parse the json body
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);
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
      console.log(`🚀 Server running at port ${PORT}`);
    });
  } catch (e) {
    console.error("DB Connection Failed:", e.message);
  }
}

main();
