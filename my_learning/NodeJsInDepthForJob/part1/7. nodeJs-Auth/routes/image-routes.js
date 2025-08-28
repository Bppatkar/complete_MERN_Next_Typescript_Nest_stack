import express from 'express';
import authMiddleware from '../middleware/auth-middleware.js';
import adminMiddleware from '../middleware/admin-middleware.js';
import uploadMiddleware from '../middleware/upload-middleware.js';

import {
  uploadImageController,
  fetchImageController,
  deleteImageController,
} from '../controllers/image-controller.js';

const router = express.Router();

// upload the image
router.post(
  '/upload',
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single('file'),
  uploadImageController
);

// to get all the images
router.get('/get', authMiddleware, fetchImageController);

// delete Image route
router.delete(
  '/delete/:id',
  authMiddleware,
  adminMiddleware,
  deleteImageController
);

export default router;
