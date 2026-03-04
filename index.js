import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CreateUserSchema, SigninSchema } from "./zod.js";
import { UserModel } from "./db.js";

const JWT_SECRET = process.env.JWT_SECRET;
const app = express();

app.use(express.json()); // to parse the json body


app.post("/api/auth/signup", async function (req, res) {
  //new user ke liye
  const parsedData = CreateUserSchema.safeParse(req.body); //req.body == parsing the json body

  if (!parsedData.success) {
    res.json({
      message: "Incorrect inputs",
      error: parsedData.error,
    });
    return;
  }
  try {
    const name = parsedData.data.name;
    const email = parsedData.data.email;
    const password = parsedData.data.password;

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

app.post("/api/auth/signin", async function (req, res) {
  //login ke liye

  const parsedData = SigninSchema.safeParse(req.body);
  // safe parse return parsed data, true or false, error

  if (!parsedData.success) {
    return res.status(400).json({ //400 bad request
      message: "Incorrect inputs",
      error: parsedData.error,
    });
  }

  try {
    const email = parsedData.data.email;
    const password = parsedData.data.password;

    const user = await UserModel.findOne({
      email: email,
    });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          JWT_SECRET,
        );

        return res.json({
          token,
        });
      }else{
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
    res.json({
      message: "Cannot signin",
    });
  }
});

app.post("/api/links/shorten", function (req, res) {
  //url shortening
});

app.get("/api/links", function (req, res) {
  //dashboard
});

app.delete("/api/links/:id", function (req, res) {
  // link delete ke liye
});

app.patch("/api/links/:id", function (req, res) {
  //update ke liye
});

app.get("/:shortId", function (req, res) {
  //click tracking
});

app.get("/api/analytics/:linkId", function (req, res) {
  //link data
});

// app.listen(3000, ()=>{
//   console.log("Server running at port 3000");
// });

async function main() {
    try {
        await mongoose.connect(process.env.MD_URL);
        console.log("Connected to MongoDB");
        app.listen(3000, () => {
            console.log("Server running at port 3000");
        });
    } catch (e) {
        console.error("DB Connection Failed:", e.message);
    }
}

main();