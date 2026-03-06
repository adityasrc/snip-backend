import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new Schema({
  name: String,
  email: { type: String, unique: true, required: true, lowercase: true },
  password: {type: String, required: true},
}, { timestamps: true }); 

const Link = new Schema({
    title: String,
    originalUrl: {type: String, required: true},
    shortId: { type: String, unique: true, index: true }, 
    customAlias : { type: String, unique: true },
    userId: { type: ObjectId, ref: "users", index: true, required: true },
    clicks: { type: Number, default: 0 },
    expiresAt: { type: Date, default: null }
    
}, { timestamps: true }); 

const Click = new Schema({
  linkId: {type: ObjectId, ref: "links", required: true, index: true},
  timestamp: { type: Date, default: Date.now },
  browser: String,
  device: String,
  referrer: String,
  country: String, 
  city: String     
});

export const UserModel = mongoose.model("users", User);
export const LinkModel = mongoose.model("links", Link);
export const ClickModel = mongoose.model("clicks", Click);