// Require the cloudinary library
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// Return "https" URLs by setting secure: true
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// // Log the configuration
// console.log(cloudinary.config());

const fileUplodeOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });
    console.log('File Uploaded on Cloudinary Succesfully');
    fs.unlinkSync(filePath);
    return response;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.error('Error while uploading to cloudinary', error);
    throw new Error('Error while uploading to cloudinary');
    return null;
  }
};

// in case there is any problem so we need to delete the file from cloudinary as well because cloudinary has limited space
const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('File deleted from cloudinary,: ', result, publicId);
  } catch (error) {
    console.log('Error deleting file from cloudinary: ', error);
    return null;
  }
};

export { fileUplodeOnCloudinary, deleteFromCloudinary };
