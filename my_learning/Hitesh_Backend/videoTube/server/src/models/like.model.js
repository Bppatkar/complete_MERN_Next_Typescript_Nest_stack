/* likes [icon:heart] {
  id             string pk
  comment        ObjectId comments
  video          ObjectId videos
  tweet          ObjectId tweets
  likedBy        ObjectId users
  createdAt      Date
  updatedAt      Date
} */

import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    tweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
    },
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
