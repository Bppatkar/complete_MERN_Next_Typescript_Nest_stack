import mongoose from "mongoose";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  try {
    const channelStats = [];
    if (req.user) {
      // --------------------numOfSubscribers----------------
      const subscriptions = await Subscription.find({
        channel: req.user?._id,
      }); // array
      if (!subscriptions || subscriptions.length === 0) {
        throw new ApiError(404, "channel not found");
      }

      const subscribers = subscriptions.map(
        subscription => subscription.subscriber
      );

      const numOfSubscribers = subscribers.length;
      channelStats.push(numOfSubscribers);

      // --------------------numOfVideos----------------
      const videos = await Video.find({
        owner: req.user?._id,
        isPublished: true,
      }); // it will rerturn an array
      let numOfVideos = 0;

      if (!videos || videos.length === 0) {
        channelStats.push(0);
      } else {
        numOfVideos = videos.length;
        channelStats.push(numOfVideos);

        let totalView = 0;
        const views = videos.map(views => (totalView += views.view));
        channelStats.push(totalView);
      }
      //---------------numOfLikes----------------------
      // find number of likes a channel does have on his videos

      let videoLikes = 0;
      for (let video of videos) {
        const likes = await Like.find({ video: video?._id });
        videoLikes += likes.length;
      }
      channelStats.push(videoLikes);
      res
        .status(200)
        .json(
          new ApiResponse(
            200,
            `numOfSubscribers: ${channelStats[0]} , numOfVideos : ${channelStats[1]} , numOfViews: ${channelStats[2]} , numOfLikes: ${channelStats[3]}`,
            "Channel Stats has been fetched successfully"
          )
        );
    } else {
      throw new ApiError(
        403,
        "User not logged in: Login with channel official credentials"
      );
    }
  } catch (error) {
    throw new ApiError(
      500,
      error,
      "some error occurred while getting the channel state: Please try again letter"
    );
  }
});

const getChannelVideos = asyncHandler(async (req, res) => {
  try {
    let channelVideos;
    if (req.user) {
      channelVideos = await Video.find({ owner: req.user?._id });
    }
    if (!channelVideos || channelVideos.length === 0) {
      throw new ApiError(
        404,
        `No videos exist for channel of user: ${req.user.username}`
      );
    }

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          channelVideos,
          "Channel videos fetched successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      404,
      error,
      "Some error occurred while fetching video your videos"
    );
  }
});

export { getChannelStats, getChannelVideos };

