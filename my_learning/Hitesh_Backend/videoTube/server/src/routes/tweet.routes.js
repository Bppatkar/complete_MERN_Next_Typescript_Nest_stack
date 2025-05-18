import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createTweet,
  deleteTweet,
  getUserTweets,
  updateTweet,
} from "../controller/tweet.controller.js";

const router = Router();
router.route("/c/:username").get(getUserTweets);
router.use(verifyJwt);

router.route("/").post(createTweet);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);

export default router;
