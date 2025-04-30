import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!videoId || !isValidObjectId(videoId)) {
    throw new ApiError(400, "getVideoComments :: video Id is not valid");
  }

  const comment = await Comment.aggregate([
    {$match : {
      video: mongoose.Types.ObjectId(videoId),
      }},
      {
        $lookup:{
          form: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
          pipeline:[
            {$project:{
              _id: 1,
              userName: 1,
              avatar:1,
              fullName:1,
            }}
          ]
        }
      },
      //  this step converts the owner array into an object
  ]})
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
});

export { getVideoComments, addComment, updateComment, deleteComment };
