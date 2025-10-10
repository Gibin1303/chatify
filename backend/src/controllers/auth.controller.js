import { generateToken } from "../lib/util.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
import cloudinary from "../lib/cloudinarry.js";

export const signup = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email) === false) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Here you would typically check if the user already exists in the database
    const exixtingUser = await User.findOne({ email });
    if (exixtingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      profilePic,
    });

    if (newUser) {
      // generateToken(newUser._id, res);
      // await newUser.save();
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        },
      });
      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          ENV.CLIENT_URL
        );
      } catch (error) {
        console.error("Error sending welcome email:", error);
        // throw new Error("Failed to send welcome email");
        res.status(500).json({ message: "Failed to send welcome email" });
      }
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
      // never tell the user which one is incorrect for security reasons
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
    return   res.status(400).json({ message: "Invalid email or password" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", {
    maxAge: 0,
  });
  res.status(200).json({ message: "Logout successfully" });
};

export const updateProfile = async (req, res) =>{
    const{profilePic} = req.body
    try {
        if(!profilePic){
            return res.status(400).json({message:"Profile picture is required"})
        }
              const userId = req.user._id
           const uploadRespone =  await cloudinary.uploader.upload(profilePic)
          const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadRespone.secure_url }, { new: true })
          return res.status(200).json(updatedUser)
        }
    catch (error) {
        console.log("Error in update profile controller",error);
        return res.status(500).json({message:"Internal server error"})
    }
  }
