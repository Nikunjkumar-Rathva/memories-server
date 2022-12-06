import express from "express";

import { createPost, getPosts } from "../controllers/index.js";

const router = express.Router();

/**
 * Request
 * localhost:8080/posts/
 */

router.get("/", getPosts);
router.post("/", createPost);

export default router;
