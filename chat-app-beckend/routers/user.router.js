const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../model/usermodel");  
const auth = require("../config/auth");
const protectroute = require("../middleware/protectroute");
const { cloudinary } = require("../config/cloudnary");



dotenv.config();

const userrouter = express.Router();

userrouter.get("/", (req, res) => {
    res.status(200).json({ message: "user" });
});

userrouter.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newuser = new User({
            name,
            email,
            password: hashedPassword
        });

        
        // Generate JWT
        if (newuser) {
          auth(newuser._id,res)
          await newuser.save();
        res.status(201).json({
            _id: newuser._id,
            name: newuser.name,
            email: newuser.email,
            profilepic: newuser.profilepic,
        });
      } else {
        res.status(400).json({ message: "Invalid user data" });
        
      }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
});

userrouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
      if (!email || !password) {
          return res.status(400).json({ message: "All fields are required" });
      }

      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ message: "Invalid email  " });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid   password" });
      }

      // Generate JWT Token
     auth(user._id,res);
     res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilepic: user.profilepic,
  });

  } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error" });
  }
});


userrouter.post("/logout", (req, res) => {
    try {
      res.cookie("jwt","",{maxAge:0})
      res.status(200).json({ message: "logged out successfully" });

    } catch (error) {
      console.log("error in logout",error.message);
      res.status(500).json({ message: "Internal server error" });
      
    }
});


userrouter.put("/update-profilepic",protectroute,async(req, res) => {
  try {
   const { profilepic } = req.body;
   const userId = req.user._id;
if (!profilepic) {
  return   res.status(400).json({ message: "profilepic is required" });
}
const uploadResponse=await cloudinary.uploader.upload(profilepic);
const updateUser=await User.findByIdUpdate(userId,{profilepic:uploadResponse.secure_url},{new:true});

res.status(200).json(updateUser);

  } catch (error) {
    console.log("error in update profile",error.message);
    res.status(500).json({ message: "Internal server error" });
    
  }
});


userrouter.get("/check",protectroute,(req,res)=>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("error in chackAuth",error.message);
    res.status(500).json({ message: "Internal server error" });
  }
})



module.exports = userrouter;
