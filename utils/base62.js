import { CounterModel } from "../models/db.js";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

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
  const counter = await CounterModel.findOneAndUpdate(
    { _id: "linkId" },
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );
  return toBase62(counter.seq);
}
