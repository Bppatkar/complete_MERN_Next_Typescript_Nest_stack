import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  //TODO: toggle like on video
  const { videoId } = req.params;

  if (!videoId || !isValidObjectId(videoId)) {
    throw new ApiError(400, "toggleVideoLike :: Video Id is not valid");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "toggleVideoLike : Video not found");
  }

  const existingLikeStatus = await Like.findOne({
    video: mongoose.Types.ObjectId(videoId),
    likedBy: mongoose.Types.ObjectId(req.user?._id),
  });

  // if already liked
  if (existingLikeStatus) {
    // removing like
    const dislike = await Like.findOneAndDelete(existingLikeStatus._id);
    if (!dislike) {
      throw new ApiError(500, "toggleVideoLike :: Failed to remove like");
    } else {
      const liked = await Like.create({
        // adding like
        video: mongoose.Types.ObjectId(videoId),
        likedBy: mongoose.Types.ObjectId(req.user?._id),
      });
      if (!liked) {
        throw new ApiError(500, "toggleVideoLike :: Failed to add like");
      }
    }

    const likes = await Video.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(videoId),
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "video",
          as: "likes",
        },
      },
      {
        $addFields: {
          likesCount: { $size: "$likes" },
        },
      },
      {
        $project: {
          likeCount: 1,
        },
      },
    ]);

    // console.log("LIKES: ", likes[0].likesCount);
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          { isLiked: !existingLikeStatus, likesCount: likes[0].likesCount },
          "Like Status Updated"
        )
      );
  }
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
