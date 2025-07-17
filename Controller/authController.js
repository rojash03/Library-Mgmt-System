import express from "express";
import { user } from "../models/User.js";

export const registerUser = async (req, res) => {
  try {
    const { Name, Email, Password, Role } = req.body;
    if (!Name || !Email || !Password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const newUser = new user({ Name, Email, Password, Role });
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

    const userData = await User.findOne({
      email,
    }).select("+password");

    if (!userData) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const Check = bcrypt.compareSync(password, userData.password);

    if (!Check) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const { password: pass, ...rest } = userData._doc;

    const token = jwt.sign(
      {
        id: rest._id,
        role: rest.role,
      },
      process.env.JWT
    );

    return res.status(200).json({ token, data: rest });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyLibrarian = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === 'Librarian') {
            next();
        } else {
            return res.status(401).json({ message: 'Access denied' });
        }
    });
}

export const verifyBorrower = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.role === 'Borrower') {
            next();
        } else {
            return res.status(401).json({ message: 'Access denied' });
        }
    });
}
