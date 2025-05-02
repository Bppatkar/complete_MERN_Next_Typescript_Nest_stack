import { Router } from "express";
import {
  deleteVideo,
  getAllRecommendedVideos,
  getVideoById,
  publishVideo,
  togglePublishStatus,
  updateVideo,
} from "../controller/video.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/recommendation/:videoId").get(getAllRecommendedVideos);

router.use(verifyJwt); // It applies every route in this file
/*************  ✨ Windsurf Command 🌟  *************/
router.route("/upload-video").post(
  upload.fields([
    {
      name: "videoFile",
      maxCount: 1,
    },
    {
      name: "thumbnail",
      maxCount: 1,
    },
  ]),
  publishVideo
);
/*******  956ebbf1-4b31-4ca9-8cda-19b9c8daa014  *******/
router.route("/:videoId").get(getVideoById);

router.route("/update/:videoId").patch(upload.single("thumbnail"), updateVideo);
router.route("/delete/:videoId").delete(deleteVideo);
router.route("/toggle/:videoId").patch(togglePublishStatus);

export default router;
