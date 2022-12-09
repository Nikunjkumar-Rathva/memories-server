/**
 * All logic
 * will goes here
 */

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import mongoose from "mongoose";
import User from "../models/user.js";

export const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: `User Not Found By Email Id ${email}`,
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Password Is Incorrect",
      });
    }

    const token = jwt.sign(
      {
        email: existingUser.email,
        _id: existingUser._id,
      },
      "test",
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login Successfull",
      result: existingUser,
      token: token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong on server",
    });
  }
};

export const signUpUser = async (req, res) => {
  const { email, password, firstName, lastName, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({
      email: email,
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User Already Exist With This Email Address !" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Password Doesn't Match With Confirm Password !" });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email: email,
      password: hashPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      {
        email: newUser.email,
        _id: newUser._id,
      },
      "test",
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "User Created Successfully",
      result: newUser,
      token: token,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong on server",
    });
  }
};
