import express from "express";
import { login, logout, register } from "../controller/user.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(isAuthenticated, logout);

export default router;
