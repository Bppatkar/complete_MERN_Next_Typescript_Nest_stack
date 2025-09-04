import express from 'express';
import {
  createPost,
  getAllPosts,
  getPost,
  deletePost,
} from '../controllers/post-controller.js';

const router = express.Router();

app.use(authenticateRequest);

router.route('/create-post').post(createPost);
router.route('/all-posts').get(getAllPosts);
router.route('/:id').get(getPost);
router.route('/:id').delete(deletePost);

export default router;
