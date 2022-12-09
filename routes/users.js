import express from "express";
import { signInUser, signUpUser } from "../controllers/user.js";

const router = express.Router();

/**
 * Request
 * localhost:8080/users/
 */

router.post("/signIn", signInUser);
router.post("/signUp", signUpUser);

export default router;
