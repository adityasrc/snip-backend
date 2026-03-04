import mongoose from "mongoose";


const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;




const User = new Schema({
  name: String,
  email: { type: String, unique: true, required: true, lowercase: true },
  password: {type: String, required: true},

});

export const UserModel = mongoose.model("users", User);
