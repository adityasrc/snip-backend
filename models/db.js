import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true, maxlength: 50 },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
}, { timestamps: true });

const linkSchema = new Schema({
  title: { type: String, required: true, trim: true, maxlength: 100 },
  originalUrl: { type: String, required: true, trim: true, maxlength: 2048 },
  shortId: { type: String, unique: true, index: true, trim: true },
  customAlias: { type: String, unique: true, sparse: true, trim: true },
  userId: { type: ObjectId, ref: "User", index: true, required: true },
  clicks: { type: Number, default: 0 },
  expiresAt: { type: Date, default: null }
}, { timestamps: true });

linkSchema.index({ userId: 1, createdAt: -1 });

const clickSchema = new Schema({
  linkId: { type: ObjectId, ref: "Link", required: true, index: true },
  timestamp: { type: Date, default: Date.now },
  browser: String,
  device: String,
  referrer: String,
  country: String,
  city: String
});

clickSchema.index({ linkId: 1, timestamp: -1 });

const counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});

export const UserModel = mongoose.model("User", userSchema);
export const LinkModel = mongoose.model("Link", linkSchema);
export const ClickModel = mongoose.model("Click", clickSchema);
export const CounterModel = mongoose.model("Counter", counterSchema);
