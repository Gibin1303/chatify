import { generateToken } from "../lib/util.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password, profilePic} = req.body;

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
      profilePic
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        message: "User created successfully",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
         profilePic: newUser.profilePic,
        },
      });
    } else {
      res.status(400).json({ message: "Inavalid username" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
