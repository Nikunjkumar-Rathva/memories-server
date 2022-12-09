/**
 * All logic
 * will goes here
 */

import mongoose from "mongoose";
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

  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
    likes: [],
  });

  try {
    await newPost.save();

    res.status(201).json({
      success: true,
      message: "new post created",
      data: newPost,
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  // const { title, message, creator, tags, selectedFile } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({
      success: false,
      message: "Id Not Found !",
    });
  }

  const updatePost = await PostMessage.findByIdAndUpdate(
    _id,
    {
      ...post,
      _id,
    },
    {
      new: true,
    }
  );

  // const updatePost = await PostMessage.findByIdAndUpdate(
  //   _id,
  //   {
  //     title: title,
  //     message: message,
  //     creator: creator,
  //     tags: tags,
  //     selectedFile: selectedFile,
  //   },
  //   {
  //     new: true,
  //   }
  // );

  res.status(200).json({
    success: true,
    data: updatePost,
  });
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({
      success: false,
      message: "Id Not Found !",
    });
  }

  await PostMessage.findByIdAndRemove(_id);

  res.status(200).json({
    success: true,
    message: "Memory Deleted Successfully !!!",
  });
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!req.userId) {
    return res.json({ message: "Unauthenticated" });
  }

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({
      success: false,
      message: "Id Not Found !",
    });
  }

  const post = await PostMessage.findById(_id);

  const index = post.likes.findIndex((id) => {
    return id === String(req.userId);
  });

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatePost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.status(200).json({
    success: true,
    data: updatePost,
  });
};
