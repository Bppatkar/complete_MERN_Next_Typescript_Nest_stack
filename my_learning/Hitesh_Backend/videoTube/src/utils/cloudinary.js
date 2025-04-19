// go to cloudinary.com and  follo instructions
// npm i cloudinary

// if you notice here, the Cloudinary, what it needs is what should I upload. So you can either give this function the method.So what we want to do is we want to design a simple method and in the argument we want to provide the URL and the file path basically.

// there you will get cloud_name, api_key and api_secret so put it in env file

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// creating method (func) for file upload and in argument we take filename
// we're going to give is whoever is calling this function needs to provide me a local file path. So once you give me the local file path, because whenever you upload through the multer, the return that you get from the multer function is the file path, wherever that is in your local storage. Local storage by means your server storage

//So we'll just wrap everything with the try catch.That's always a good idea.And handling the catch part is pretty simple.If there is something wrong in uploading to Cloudinary, we want to remove this file from our local storage as well so for that we need fs module

const uploadOnCloudinary = async localFilePath => {
  try {
    if (!localFilePath) return null;
    // only simple thing to do
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // automatially handle file ext name
    });
    console.log("File upload on cloudinary. File src: ", response.url);
    // once the file is uploaded, we would like to delete it from our server/local storage/laptop
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };


// yeah it's done