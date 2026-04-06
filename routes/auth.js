import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CreateUserSchema, SigninSchema } from "../utils/zod.js";
import { UserModel } from "../models/db.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async function (req, res) {
  //new user ke liye
  const parsedData = CreateUserSchema.safeParse(req.body); //req.body == parsing the json body

  if (!parsedData.success) {
    return res.status(400).json({ // 400 bad request lagaya
      message: "Incorrect inputs",
      error: parsedData.error.errors[0].message,
    });
  }
  try {
    const { name, email, password } = parsedData.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.status(201).json({
      userId: user._id,
    });
  } catch (e) {
    res.status(409).json({
      //409 matlab confict or duplicate user
      message: "User already exisits with this email",
    });
  }
});

router.post("/signin", async function (req, res) {
  //login ke liye
  const parsedData = SigninSchema.safeParse(req.body);
  // safe parse return parsed data, true or false, error

  if (!parsedData.success) {
    return res.status(400).json({ //400 bad request
      message: "Incorrect inputs",
      error: parsedData.error.errors[0].message,
    });
  }

  try {
    const { email, password } = parsedData.data;
    const user = await UserModel.findOne({ email: email });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          { id: user._id, name: user.name, email: user.email },
          JWT_SECRET
        );
        return res.json({ token });
      } else {
        return res.status(401).json({
          message: "Incorrect credentails"
        });
      }
    } else {
      return res.status(401).json({ //401 =  unauthorized
        message: "Incorrect credentials",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Cannot signin",
    });
  }
});

export default router;