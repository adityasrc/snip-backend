import mongoose from "mongoose";
import { required } from "zod/mini";



const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;




const User = new Schema({
  name: String,
  email: { type: String, unique: true, required: true, lowercase: true },
  password: {type: String, required: true},

});

const Link = new Schema({
    title: String,
    originalUrl: {type: String, required: true},
    shortId: { type: String, unique: true, index: true}, //unique code , index true for fast redirection
    customAlias : { type: String, unique: true},
    userId: { type: ObjectId, ref: "users", index: true, required: true},
    qrCode: String, //qr code's base 64 data
    clicks: { type: Number, default: 0},
    expiresAt: { type: Date, default: null},
},{timestamps: true}); // will add createdAt and updatedAt auto

const Click = new Schema({
  linkid: {type: ObjectId, ref: "links", required: true, index: true},
  timestamp: { type: Date, default: Date.now},
  browser: String,
  device: String,
  referrer: String
})

export const UserModel = mongoose.model("users", User);
export const LinkModel = mongoose.model("links", Link);
export const ClickModel = mongoose.model("clicks", Click);
