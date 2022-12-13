import express from "express";
import { changePassword, signInUser, signUpUser } from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/**
 * Request
 * localhost:8080/users/
 */

router.post("/signIn", signInUser);
router.post("/signUp", signUpUser);
router.post("/changePassword", auth, changePassword);

export default router;
