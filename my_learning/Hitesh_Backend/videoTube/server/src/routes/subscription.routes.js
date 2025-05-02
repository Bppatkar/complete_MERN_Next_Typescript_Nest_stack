import { Router } from "express";
import {
  getSubscribedChannels,
  getUserChannelSubscribers,
  toggleSubscription,
} from "../controller/subscription.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();
router.route("/c/subscribed-to/:username").get(getSubscribedChannels);

router.use(verifyJwt); // Apply verifyJWT middleware to all routes in this file

router.route("/c/subscribers/:channelId").get(getUserChannelSubscribers);
router.route("/c/:channelId").post(toggleSubscription);

export default router;
