import express from "express";
import { login, register } from "../controller/user.js";

const router = express.Router();
// importing method from controller
router.route("/register").post(register);
router.route("/login").post(login);

export default router;

// exporting that router and importing in app.js
