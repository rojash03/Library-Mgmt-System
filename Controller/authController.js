import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyToken } from "../Middleware/verifyToken.js"
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate all fields, especially name
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    // Check if user already exists by unique field (usually email)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const Check = bcrypt.compareSync(password, user.password);

    if (!Check) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const { password: pass, ...userdata } = user._doc;

    const token = jwt.sign(
      {
        id: userdata._id,
        role: userdata.role,
      },
      process.env.JWT
    );

    return res.status(200).json({ token, data: userdata });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyLibrarian = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "librarian") {
      next();
    } else {
      return res.status(401).json({ message: "Access denied" });
    }
  });
};

export const verifyBorrower = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "borrower") {
      next();
    } else {
      return res.status(401).json({ message: "Access denied" });
    }
  });
};
