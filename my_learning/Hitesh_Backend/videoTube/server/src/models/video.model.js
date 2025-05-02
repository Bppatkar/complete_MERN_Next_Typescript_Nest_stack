/* videos [icon:video] {
  id             string pk
  videoFile      string
  thumbnail      string
  owner          ObjectId users
  title          string
  description    string
  duration       number
  views          number
  isPublished    boolean
  createdAt      Date
  updatedAt      Date
} */

//? Mongoose's aggregate.paginate() is used to implement pagination when working with Mongoose aggregation pipelines, allowing for efficient retrieval of large datasets in manageable chunks. This is particularly useful for web applications where displaying all results at once could overload the client or server. By paginating results, you can improve performance, reduce memory usage, and enhance user experience.

//*  it's a very precious tool when you are dealing with queries requiring multiple layers using mongoose's aggregation tool. that the benefits of aggregation and pagination are : -efficiency: fetch only the data you need (e.g., 10 results per page). -scalability: manage large data files efficiently

import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      required: true,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
