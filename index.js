import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { CreateUserSchema, LinkSchema, SigninSchema } from "./zod.js";
import { LinkModel, UserModel } from "./db.js";
import { nanoid } from 'nanoid';
import qrcode from 'qrcode';
import { middleware } from "./middleware.js";

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

app.post("/api/links/shorten", middleware, async function (req, res) {
  //url shortening
  //auth is left
  try {
    const parsedData = LinkSchema.safeParse(req.body);

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Incorrect inputs"
      });
    }

    let finalId;
    const { title, originalUrl, customAlias } = parsedData.data;

    if (customAlias) {
      // Check collision in both shortId and customAlias fields
      const checkAlias = await LinkModel.findOne({
        $or: [{ shortId: customAlias }, { customAlias: customAlias }]
      });

      if (checkAlias) {
        return res.status(409).json({
          message: "Alias already exists"
        });
      } else {
        finalId = customAlias;
      }
    } else {
      const shortId = nanoid(6); // customized length to 6
      //nanoid - unique string id generator for js
      finalId = shortId;
    }

    const qrDataUrl = await qrcode.toDataURL(originalUrl);

    const link = await LinkModel.create({
      title: title,
      originalUrl: originalUrl,
      shortId: finalId,
      customAlias: customAlias || null,
      userId: req.userId,
      qrCode: qrDataUrl,
    });

    return res.json({
      finalId,
      qrDataUrl
    });
    
  } catch (e) {
    return res.status(500).json({
      message: "Server Error",
      error: e.message
    });
  }
});

app.get("/api/links", middleware, async function (req, res) {
  //dashboard
  try{
    const userId = req.userId;

    const links = await LinkModel.find({ //find all links with this userId
      userId
    })

    res.json({ //send all links of user
      links
    })

  }catch(e){
    return res.status(500).json({
      message: "Server Error"
    })
  }
  
});

app.delete("/api/links/:id", middleware, async function (req, res) {
  // link delete ke liye
  try{
    const linkId = req.params.id;
    const userId = req.userId;

    const dlt = await LinkModel.findOneAndDelete({
      userId,
      _id: linkId
    })

    if(!dlt){
      return res.status(404).json({
        message: "Link Not Found"
      })
    }

    res.json({
      message: "Link deleted"
    })

  }catch(e){
    return res.status(500).json({
      message: "Server Error"
    })
  }

});

app.patch("/api/links/:id", middleware, async function (req, res) {
  //update ke liye

  try{
    const linkId = req.params.id;

    const parsedData = LinkSchema.safeParse(req.body);

    if(!parsedData.success){
      return res.status(400).json({
        message: "Incorrect input"
      })
    }

    const userId = req.userId;

    await LinkModel.findOneAndUpdate({
      userId,
      _id: linkId
    }, {
      $set: {
        title: parsedData.data.title,
        originalUrl: parsedData.data.originalUrl
      }
    })

    res.json({
      message: "Updated successfully"
    })
  }
  catch(e){
    return res.status(500).json({
      message: "Server Error"
    })
  }
});

app.get("/:shortId", async function (req, res) {
  //click tracking
  const shortId = req.params.shortId; // extracting shortId form url params

  // const link = await LinkModel.findOne({
  //   shortId: shortId
  // });

  // if(!link){
  //   return res.status(404).json({
  //     message: "Not Found"
  //   })
  // }

  try{

  //   await LinkModel.updateOne({
  //     shortId: link.shortId
  //   }, {
  //     $inc: {
  //       clicks: 1
  //     }
  //  })

  const link = await LinkModel.findOneAndUpdate({ //finding and updating at once
    shortId: shortId
    }, {
      $inc : { //$inc inbuild mongo function to increase count
        clicks: 1
      }
  })

  if(!link){
    return res.status(404).json({  // 404 == not found
      message: "Not found"
    })
  }

    res.redirect(link.originalUrl); // redirect is express inbult funcition

  }catch(e){
    return res.status(500).json({
      message: "Server Error"
    })
  }
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