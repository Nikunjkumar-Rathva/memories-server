/**
 * All logic
 * will goes here
 */

import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();

    res.status(200).json({
      success: true,
      data: postMessages,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    res.status(201).json({
      success: true,
      message: "new post created",
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: error.message,
    });
  }
};
