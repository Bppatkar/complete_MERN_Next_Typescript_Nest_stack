import express from "express";
import { registerUser, logoutUser } from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = express.Router();

// for uploading multiple files we use fields method [method means ()]
// and inside () there is a array of objects

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

// secured route
router.route("/logout").get(verifyJwt, logoutUser);

export default router;
