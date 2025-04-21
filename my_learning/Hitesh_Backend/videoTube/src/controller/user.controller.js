import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

//! method for generating token

const generateAccessAndRefreshToken = async userId => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    // genertaing access and refresh token
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // we can directly return both token from here but,
    // Now, refresh token is something which we can attach to the user itself as we check in the model as well. You're going to notice we have a field for it which is refresh token. So this is something that we are storing for a longer run in our database.
    // So it makes sense since we have this access to this user object, we can just go ahead and say hey user, you will have this refresh token directly up here. how...? see

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false }); // we cant save it directly because it will throw error so we use validateBeforeSave: false
    return { accessToken, refreshToken };
  } catch (error) {
    // console.log("Error generating access and refresh token: ", error);
    throw new ApiError(
      500,
      "Somwthing went wrong while generating access and refresh token"
    );
  }
};

//! register user

const registerUser = asyncHandler(async (req, res) => {
  // get user details from body
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar and coverImage
  // upload them to cloudinary, avatar and coverImage
  // create user object - create entry in db using modal User and create method
  // verifying that user is created in database or not , and if created
  // exclude password and refresh token field from response
  // check for user creation
  // return response

  const { userName, email, fullName, password } = req.body;
  // avatar and coverImage will come in req.file not in req.body

  //validation
  if ([userName, email, password, fullName].some(field => field?.trim() === ""))
    throw new ApiError(400, "All field are Required");

  // checking existing user [from Model User] (so importing it)
  const existedUser = await User.findOne({ $or: [{ userName }, { email }] });
  if (existedUser)
    throw new ApiError(409, "User With Username And Email Already Exists");

  //! handling images [in router we use name avatar and coverImage so we use same name here]
  // console.warn(req.files); // checking multer is working properly or not
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is missing");

  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

  //! upload on cloudinary
  // const avatar = await uploadOnCloudinary(avatarLocalPath);
  // let coverImage;
  // if (coverImage) coverImage = await uploadOnCloudinary(coverImageLocalPath);

  // new way of uploading because above code is facing problem so we use try and catch

  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("avatar uploaded successfully");
    // console.log("avatar uploaded successfully", avatar);
  } catch (error) {
    console.log("Error uploading avatar on cloudinary: ", error);
    throw new ApiError(500, "Error uploading avatar on cloudinary");
  }

  // same thing for coverImage

  let coverImage;
  try {
    coverImage = await uploadOnCloudinary(coverImageLocalPath);
    console.log("coverImage uploaded successfully");
    // console.log("coverImage uploaded successfully", coverImage);
  } catch (error) {
    console.log("Error uploading coverImage on cloudinary: ", error);
    throw new ApiError(500, "Error uploading coverImage on cloudinary");
  }

  //! constructing the user [this is a mongodb or mongose modal]
  try {
    const user = await User.create({
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      userName: userName.toLowerCase(),
    });

    // verifying that user is created in database or not , if it is created in database so in database ,_id will automatically generate so we are checking user by _id
    // but we dont want user password , so we deselect password field
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    // -password and -refreshToken means exclude password and refreshToken

    //! check user is in database or not
    if (!createdUser)
      throw new ApiError(500, "something went wrong while registering user");

    //! sending response to the frontend [201 for created]
    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User Registered Successfully"));
  } catch (error) {
    console.log("User Creation Failed ");
    // if  we have avatar and coverImage then we have to delete them from cloudinary because operation is failed
    if (avatar) await deleteFromCloudinary(avatar.public_id);
    if (coverImage) await deleteFromCloudinary(coverImage.public_id);
    throw new ApiError(500, "User Registration Failed All Images are deleted");
  }
});

//! Database operation always use await ok

// watchHistory   ObjectId[] videos
//  userName       string
//  email          string
//  fullName       string
//  avatar         string
//  coverImage     string
//  password       string
//  refreshToken   string

//! login user
// when we are loggin user , we also have machanism to grab access token and refresh token , so we will use it later first we grab it ok
// so for that we create a method [top of the code after import] where in argument you just pass an user_id and that method will return token by generating them

const loginUser = asyncHandler(async (req, res) => {
  // req body -> data
  // username or email
  // find the user
  // password check
  // access and referesh token
  // send cookie

  const { email, userName, password } = req.body;

  // validation
  if ([email, userName].some(field => field?.trim() === ""))
    throw new ApiError(400, "Email or UserName are required");

  // find the user
  const user = await User.findOne({ $or: [{ userName }, { email }] });
  if (!user) throw new ApiError(400, "Couldn't find the user");

  // checking password and compare that password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid User Credentail");

  // if password is correct which is valid here then we will generate access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // So there are two strategies in front of us. Either take this existing user and add this refresh token and then create an object, or just fire a database query and grab the fresh object since """"this generate access token again go ahead and save new data""""" in the database. So I would say yes, it is definitely an extra query, but it's a fail safe query, it  will help you to secure the system more.

  // loggedIn User by database query
  const loggedInUser = await user
    .findById(user._id)
    .select("-password -refreshToken");

  if (!loggedInUser) throw new ApiError(400, "Couldn't find the user");

  //preparing option for sending response [it is just a simple js object]
  const options = {
    httpOnly: true, // this makes the cookies non-modifiable by the client side
    secure: process.env.NODE_ENV === "production", // false while you are testing
  };

  //! sending data
  return (
    res
      .status(200)
      .cookies("accessToken", accessToken, options)
      .cookies("refreshToken", refreshToken, options)
      // refresh token usually is being set in the cookie only, not being sent to the user.But depends whether you're working on mobile devices or just on the web..Things change drastically in that case.
      .json(
        new ApiResponse(
          200,
          { user: loggedInUser, refreshToken },
          "User Logged In SuccessFully"
        )
      )
    //So now once we have this 200, I would like to send an object and this object will have a user. And in the user we will have logged in user access token and refresh token. Just because maybe I'm assuming you are also designing a mobile app, *****in the mobile app you cannot set the cookies.****** That's by default how mobile apps works.
  );
});

// TODO: HOW ACCESS & REFRESH TOKENS WORK (SIMPLE EXPLANATION)

//* 1. USER & SERVER
// - User sends requests → Server handles data/resources.

//* 2. TOKENS GENERATED (ON LOGIN)
// - Server creates:
//   • Access Token: Short-lived (e.g., 15 mins).
//   • Refresh Token: Long-lived (e.g., 1 day or 1 Week or how long you want) → Saved in DATABASE.

//* 3. TOKENS SENT TO USER
// - Server sends both tokens to user’s device.

//* 4. USING ACCESS TOKEN
// - User sends access token with each request.
// - If expired (e.g., after 15 mins), server returns "401 Error".

// TODO: KEY FLOW - REFRESHING TOKENS
//* 5. ON 401 ERROR:
// - User sends refresh token to special "/refresh" route.
// - Server:
//   • Checks if refresh token matches database.
//   • Issues NEW (access + refresh) tokens.
//   • Updates database with new copy of refresh token.
//   • Sends both new tokens to user.

//* 6. LOGGING OUT:
// - Server deletes refresh token from database.
// - User can’t refresh tokens → Logged out when access token expires.

// TODO: WHY THIS WORKS:
// - Users stay logged in without constant passwords.
// - Server can revoke access anytime (secure!).
// ___________________________________________________________________________________

//! before logout , we earn how to generate refresh token

const refreshAccessToken = asyncHandler(async (req, res) => {
  // The step one of having this is first of all, go ahead and collect that incoming refresh token because somebody has already, we are assuming somebody already has hit the route of 401. That means things have expired.
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken)
    throw new ApiError(400, "Refresh token is required");

  // we get it via _id [we can also get it via email or username but in user.model we use _id in refresh Token]
  // how to decode the token ---> simple just verify
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.JWT_SECRET
    );
    // if token is decoded means we get _id in the decodedToken variable so we can use it to find the user in the database
    const user = await User.findById(decodedToken?._id);
    if (!user) throw new ApiError(404, "Invalid Refresh Token");

    //  if we have a successful user, then we have a refresh token,I have taken this from the user, this has come to me and I've verified that hey, it is user and everything. But if you remember, there was one copy of this refresh token in my database. Also, I need to verify if the user is really logged in and has been not really long gone.

    if (incomingRefreshToken !== user?.refreshToken)
      throw new ApiError(401, "Invalid Refresh Token");

    // The next step is to simply just generate a new token and send it to the user. That's it.

    //* we can do like this but at the top we have function generateAccessAndRefreshToken() so we use it
    /* const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });
 */
    const option = {
      httpOnly: true, // this makes the cookies non-modifiable by the client side
      secure: process.env.NODE_ENV === "production", // this makes the cookies non-modifiable by the client side
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);

    return res
      .status(200)
      .cookies("accessToken", accessToken, option)
      .cookies("refreshToken", newRefreshToken, option)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Refresh token is successful"
        )
      );
  } catch (error) {
    // console.log("Error generating access and refresh token: ", error);
    throw new ApiError(
      500,
      "Somwthing went wrong while generating access and refresh token"
    );
  }
});

//! Logout part
// The most important part is we have something in the database that needs to be changed. Yep, that refresh true logout means that we need to just remove the refresh token. That's the most important part. Yes, we will remove the access token from user's cookie. Access token, refresh token from the cookie. That's the client side. The first thing you should always be worried about is the backend part of it.

const logoutUser = asyncHandler(async (req, res) => {
  // findByIdAndUpdate because i dont want to remove the entire record i just want to update one field
  console.log("req.user:", req.user);
  const userId = req.user._id;
  await User.findByIdAndUpdate(
    userId,
    // The next step is to simply set the refresh token to undefined. and there are couple of ways to do it
    // 1. $set
    { $set: { refreshToken: undefined } },
    // most of the times undefined work , sometime null and no harm in setting up as an empty string,.....
    { new: true }
    // now what we're going to do is this whole thing User.findByIdAndUpdate this has one more parameter that you can actually inject and that simply says that do you want me to return the previous record which is not being updated, or you want to return this fresh information so we can just pass on this new true and it will give me the fresh information.
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  return (
    res
      .status(200)
      .clearCookie("accessToken", options) // clearing the cookie by the method of clearCookie
      // Remember, when you don't pass the option, it doesn't set it to anything, it just refresh this.That's how the clear cookie works.Set cookie is different.
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "Logout is successful")) // {} means empty message that hey, there's no data with us.
  );
});

/* //! other way to logout is by $unset
 const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,{
      $unset: {
        refreshToken: 1  // this remove the field from document
      },
    },
    { new: true }
  );
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  return (
    res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "Logout is successful"))
  );
}} */

export { registerUser, loginUser, refreshAccessToken, logoutUser };
