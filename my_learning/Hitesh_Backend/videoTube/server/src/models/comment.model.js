/* comments [icon:comment] {
  id             string pk
  content        string
  createdAt      Date
  updatedAt      Date
  video          ObjectId videos
  owner          ObjectId users
} */

import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model("Comment", commentSchema);

//? Mongoose's aggregate.paginate() is used to implement pagination when working with Mongoose aggregation pipelines, allowing for efficient retrieval of large datasets in manageable chunks. This is particularly useful for web applications where displaying all results at once could overload the client or server. By paginating results, you can improve performance, reduce memory usage, and enhance user experience.

//*  it's a very precious tool when you are dealing with queries requiring multiple layers using mongoose's aggregation tool. that the benefits of aggregation and pagination are : -efficiency: fetch only the data you need (e.g., 10 results per page). -scalability: manage large data files efficiently
