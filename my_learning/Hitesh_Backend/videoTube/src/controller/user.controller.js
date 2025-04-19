import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
  const avatarLocalPath = req.files?.avatar[0]?.path;
  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is missing");

  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  //! upload on cloudinary
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  let coverImage;
  if (coverImage) coverImage = await uploadOnCloudinary(coverImageLocalPath);

  //! constructing the user [this is a mongodb or mongose modal]
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
});
export { registerUser };

//! Database operation always use await ok

// watchHistory   ObjectId[] videos
//  userName       string
//  email          string
//  fullName       string
//  avatar         string
//  coverImage     string
//  password       string
//  refreshToken   string
