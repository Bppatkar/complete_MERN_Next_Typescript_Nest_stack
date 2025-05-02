import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;
    const message = error.message || "Something went wrong";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}),
  };

  return res.status(error.statusCode).json(response);
};

export { errorHandler };

// this is a middleware so it will use somewhere in middle and this middleware is for error so it will use in the end so in app.js we have to use this middleware

// actually we are having our custom error for handling error called ApiError so whatever error will come from node or from mongose creating conflict between our middleware and incoming error

// so we made this error.middleware to handle error [it works like we are handling error on our own] and that's why we put extra line in env file
// NODE_ENV=development
