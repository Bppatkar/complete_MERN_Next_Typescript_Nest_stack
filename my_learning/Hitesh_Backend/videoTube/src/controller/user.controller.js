import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
  if ([email, userName, password].some(field => field?.trim() === ""))
    throw new ApiError(400, "Email or UserName are required");

  // find the user
  const user = await User.findOne({ $or: [{ userName }, { email }] });
  if (!user) throw new ApiError(400, "Couldn't find the user");

  // checking password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid User Credentail");

  // access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  // So there are two strategies in front of us. Either take this existing user and add this refresh token and then create an object, or just fire a database query and grab the fresh object since this generate access token again go ahead and save new data in the database. So I would say yes, it is definitely an extra query, but it's a fail safe query, it  will help you to secure the system more.

  // loggedIn User by database query
  const loggedInUser = await user
    .findById(user._id)
    .select("-password -refreshToken");

  if (!loggedInUser) throw new ApiError(400, "Couldn't find the user");

  //sending response
  const options = {
    httpOnly: true, // this makes the cookies non-modifiable by the client side
    secure: process.env.NODE_ENV === "production", // false while you are testing
  };

  //! sending data
  return res
    .status(200)
    .cookies("accessToken", accessToken, options)
    .cookies("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, refreshToken },
        "User Logged In SuccessFully"
      )
    );
});

export { registerUser, loginUser };
