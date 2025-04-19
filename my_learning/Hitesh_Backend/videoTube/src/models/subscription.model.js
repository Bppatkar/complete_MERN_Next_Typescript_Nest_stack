/* subscriptions [icon:cash] {
  id             string pk
  subscriber     ObjectId users
  channel        ObjectId users
  createdAt      Date
  updatedAt      Date
} */

import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId, // one who is SUBSCRIBING
      ref: "User",
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId, // one to whom is 'subcriber' Is SUBSCRIBING
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
