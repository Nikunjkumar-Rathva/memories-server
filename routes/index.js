import express from "express";

import {
  createPost,
  deletePost,
  getPosts,
  likePost,
  updatePost,
} from "../controllers/index.js";

const router = express.Router();

/**
 * Request
 * localhost:8080/posts/
 */

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/likePost", likePost);

export default router;
