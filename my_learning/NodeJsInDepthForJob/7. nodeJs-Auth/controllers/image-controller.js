import Image from '../models/Image.js';
import {
  deleteFromCloudinary,
  fileUplodeOnCloudinary,
} from '../config/cloudinary.js';
import fs from 'fs';

const uploadImageController = async (req, res) => {
  try {
    // checking if file is missing in req object
    if (!req.files) {
      return res.status(400).json({
        success: false,
        message: 'File is required. Please upload an image',
      });
    }

    // Upload to Cloudinary
    const cloudinaryResponse = await fileUplodeOnCloudinary(req.file.path);

    if (!cloudinaryResponse) {
      throw new Error('Cloudinary upload failed');
    }

    // Store in database
    const newlyUploadedImage = await Image.create({
      url: cloudinaryResponse.secure_url,
      publicId: cloudinaryResponse.public_id,
      uploadedBy: req.user.userId,
    });

    // Return response
    return res.status(201).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        id: newlyUploadedImage._id,
        url: newlyUploadedImage.url,
        publicId: newlyUploadedImage.publicId,
      },
    });
  } catch (error) {
    // Clean up file if exists
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Image upload failed',
    });
  }
};
const fetchImageController = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query;
    const skip = (page - 1) * limit;
    const sortDirection = sortOrder === 'asc' ? 1 : -1;

    // Get total count
    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    // Fetch paginated results
    const images = await Image.find()
      .sort({ [sortBy]: sortDirection })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-__v'); // Exclude version key

    return res.status(200).json({
      success: true,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalImages,
        imagesPerPage: parseInt(limit),
      },
      data: images,
    });
  } catch (error) {
    console.error('Fetch error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch images',
    });
  }
};
const deleteImageController = async (req, res) => {
  try {
    const getCurrentIdOfImageToBeDeleted = req.params.id;
    const userId = req.userInfo.userId;

    const image = await Image.findById(getCurrentIdOfImageToBeDeleted);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found',
      });
    }

    //check if this image is uploaded by the current user who is trying to delete this image
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: `You are not authorized to delete this image because you haven't uploaded it`,
      });
    }
    // Delete from Cloudinary
    await deleteFromCloudinary(image.publicId);

    // Delete from database
    await Image.findByIdAndDelete(imageId);

    return res.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete image',
    });
  }
};

export { uploadImageController, fetchImageController, deleteImageController };
