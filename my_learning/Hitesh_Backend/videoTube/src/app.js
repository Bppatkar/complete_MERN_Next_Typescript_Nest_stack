import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//middleware after app design
app.use(cors({ origin: process.env.VITE_FRONTEND_URL, credentials: true }));
// inbuilt express middleware [all the json data allowed to comeIn]
app.use(express.json({ limit: "16kb" }));
// in url bar when there is space , so that means %20 and that come to the server
app.use(express.urlencoded({ extended: true }));
// serving any static files , like css or image etc
app.use(express.static("public"));

// to read any cookie we have to use cookie parser [from that we can read user's cookies]
app.use(cookieParser());

// importing all routes
import healthCheckRouter from "./routes/healthcheck.routes.js";

// routes
app.use("/api/v1/healthCheck", healthCheckRouter);

export { app };

/* //* CORS
// who should be able to talk to your database [CORS- CROSS ORIGIN RESOURCE SHARING]
// with this we can allow who can talk to our database
 */

//! we dont have option in express to handle images, so for that there is a package, Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.
// go to middleware folder --> multer.middlware.js [for more info go to npm multer and read doc]
// using multer we are justing giving folder access that we want to upload that folder files on server or in cloudinary or in AWS [just folder destination and filename]
