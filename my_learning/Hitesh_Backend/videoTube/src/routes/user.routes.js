import express from "express";
import { registerUser, logoutUser, refreshAccessToken, changedCurrentPassword, getCurrentUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage, getUserChannelProfile, getWatchHistory } from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = express.Router();

// for uploading multiple files we use fields method [method means ()]
// and inside () there is a array of objects

// unsecured Route
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

// secured route
router.route("/logout").get(verifyJwt, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/change-password").post(verifyJwt, changedCurrentPassword);
router.route("/current-user").get(verifyJwt, getCurrentUser);
router.route("/update-account").post(verifyJwt, updateAccountDetails);

router.route("/avatar").post(verifyJwt, upload.single("avatar"), updateUserAvatar);
router.route("/cover-image").post(verifyJwt, upload.single("coverImage"), updateUserCoverImage);

router.route("/c/username").get(verifyJwt, getUserChannelProfile);
router.route("/history").get(verifyJwt, getWatchHistory);

export default router;
