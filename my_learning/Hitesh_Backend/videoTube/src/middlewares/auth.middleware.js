import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const verifyJwt = asyncHandler(async (req, _, next) => {
  console.log("Auth middleware called");
  // console.log("Request headers:", req.headers);
  // console.log("Request cookies:", req.cookies);
  // But I want to show you there is one more way of how usually this token comes up. It usually doesn't come in the body even if you're working with the mobile app.There is one more way how it comes up. Let me show you that.
  // go to postman and just click on the headers, sometimes some of the stuff comes up in the header as well.
  // Especially there is a special name given to that header where the access token can come up automatically.
  // As you can see there is an automatic key here. Authorization.
  // And the way how you put up your access token, because remember it says just a large string of tokens, you go ahead.The way how you write it is simply first you go ahead and say be error. So I'm a bearer, that's a keyword.It remains always same.Then you put up a space and  then you write whatever the token name.
  // res.headers['content-type'] will work; req.headers['Content-Type] will not; and remeber headers not header.
  const token =
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  // there is a space after bearer ok
  if (!token) throw new ApiError(401, "Access token is required");

  // decode the token
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log("Decoded token:", decodedToken);
    // Once we have this decoded token, what's the next step? Grab the user. So I'm going to request a query from the database and get it back.
    const user = await User.findById(decodedToken._id).select(
      "-password -refreshToken"
    );
    if (!user) throw new ApiError(401, "unAuthorized");
    //That's great, but what's really important is since I'm into this function, if you remember, we have access to req, which is nothing more. It's just a big object and that is why we were able to extract information from it on different cases and scenarios.  This request has one more parameter known as body.
    // so we can do this
    // This req has one more parameter known as body. There could be more parameters.we saw request cookies.There is so much more we can do here. Just like we can extract existing information,we definitely go ahead, and add more information to it.
    req.user = user; // above user assigned to req.user
    // We create a new parameter and just assign it with the user that we extracted from the database. Now it has all the information and this information is happening all in the middleware in this part. But I have to now transfer the request and the flow of the control of this from middleware to the controller.
    next();
    // Whenever you want to transfer the flow  control, you go ahead and say next.
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid access token");
  }
});

//! now go to logout controller
// there we have req.user and main thing we have _id of user

//* we inject this middleware to  the routes
