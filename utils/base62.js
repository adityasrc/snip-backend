import { CounterModel } from "../models/db.js";

const CHARS = "zAmikyd4BYjgqJ0T8eXlcrNFGHLWpZKfxQoM7DS69OPb5CsnIU2E3uthav1wVR";
const OFFSET = 100_000_000_000;

function toBase62(num) {
  if (num === 0) return CHARS[0];
  let result = "";
  while (num > 0) {
    result = CHARS[num % 62] + result;
    num = Math.floor(num / 62);
  }
  return result;
}

export async function generateShortId() {
  try {
    const counter = await CounterModel.findOneAndUpdate(
      { _id: "linkId" },
      { $inc: { seq: 1 } },
      { upsert: true, new: true }
    );

    const finalSeq = counter.seq + OFFSET;
    return toBase62(finalSeq);
  } catch (error) {
    console.error("Failed to generate short ID:", error.message);
    throw new Error("Database error while generating short ID");
  }
}