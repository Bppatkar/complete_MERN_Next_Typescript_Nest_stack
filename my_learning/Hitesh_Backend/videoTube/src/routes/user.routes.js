import express from "express";
import {
  registerUser,
  logoutUser,
  refreshAccessToken,
  changedCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getUserChannelProfile,
  getWatchHistory,
} from "../controller/user.controller.js";
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
router.route("/refresh-token").post(refreshAccessToken);

// secured route
router.route("/logout").get(verifyJwt, logoutUser);
router.route("/change-password").post(verifyJwt, changedCurrentPassword);

router.route("/current-user").get(verifyJwt, getCurrentUser);
router.route("/c/:username").get(verifyJwt, getUserChannelProfile);

router.route("/update-account").patch(verifyJwt, updateAccountDetails);

router
  .route("/avatar")
  .patch(verifyJwt, upload.single("avatar"), updateUserAvatar);
router
  .route("/cover-image")
  .patch(verifyJwt, upload.single("coverImage"), updateUserCoverImage);

router.route("/history").get(verifyJwt, getWatchHistory);

export default router;
