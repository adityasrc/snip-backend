import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CreateUserSchema, SigninSchema } from "../utils/zod.js";
import { UserModel } from "../models/db.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async function (req, res) {
  const parsedData = CreateUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      message: "Incorrect inputs",
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
    console.error(e);
    if (e.code === 11000) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.post("/signin", async function (req, res) {
  const parsedData = SigninSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      message: "Incorrect inputs",
      error: parsedData.error.errors[0].message,
    });
  }

  try {
    const { email, password } = parsedData.data;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Incorrect credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({ token });

  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Cannot signin",
    });
  }
});

export default router;