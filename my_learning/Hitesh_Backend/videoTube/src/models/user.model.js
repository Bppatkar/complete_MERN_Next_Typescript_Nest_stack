/* users [icon:user] {
 id             string pk
 watchHistory   ObjectId[] videos
 userName       string
 email          string
 fullName       string
 avatar         string
 coverImage     string
 password       string
 refreshToken   string
 createdAt      Date
 updatedAt      Date
} */

//! here installing bcrypt for password hashing and JWT for generating token and refresh token
//* accessToken and refreshToken  they both are JWT token , just usecase are different of each other
//? AccessToken - we give the user for a short time, like hey just take this
//? RefreshToken - it is a longTerm token which we store in database as well, and it allows us to disable the users as well whenever we want that like , hey user you need to fresh login, so we can just this out from the database.

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
    },
    // watch history is an array of video ids not object
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// we are triggring save event before saving data into database that's why we are using pre ok
// but remember dont use arrow function here because we need context ok
userSchema.pre("save", async next => {
  // it means when password is getting modified then it will triggered not on every single change
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// comparing password [by creating own method and adding in prototype]

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//! generating shortTerm Token [short lived]
//* using JWT

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

//! generating LongTerm Token [long lived]
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
