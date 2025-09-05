import Post from '../models/Post.js';
import logger from '../utils/logger.js';
import { publishEvent } from '../utils/rabbitmq.js';
import { validateCreatePost } from '../utils/validation.js';

async function invalidatePostCache(req, input) {
  const cachedKey = `post:${input}`;
  await req.redisClient.del(cachedKey);

  const keys = await req.redisClient.keys('posts:*');
  if (keys.length > 0) {
    await req.redisClient.del(keys);
  }
}

const createPost = async (req, res) => {
  logger.info('Create post endpoint hit....');
  try {
    //validate the schema
    const { error } = validateCreatePost(req.body);
    if (error) {
      logger.warn('Validation error', error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { content, mediaIds } = req.body;
    const newlyCreatedPost = new Post({
      user: req.user.userId,
      content,
      mediaIds: mediaIds || [],
    });

    await newlyCreatedPost.save();

    await publishEvent('post.created', {
      postId: newlyCreatedPost._id.toString(),
      userId: newlyCreatedPost.user.toString(),
      content: newlyCreatedPost.content,
      createdAt: newlyCreatedPost.createdAt,
    });

    await invalidatePostCache(req, newlyCreatedPost._id.toString());
    logger.info('Post created successfully', newlyCreatedPost);
    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      post: newlyCreatedPost,
    });
  } catch (error) {
    logger.error('Error creating post', error);
    res.status(500).json({
      success: false,
      message: 'Error creating post',
    });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    const cachedKey = `posts:${page}:${limit}`;
    const cachedPosts = await req.redisClient.get(cachedKey);

    if (cachedPosts) {
      return res.json(JSON.parse(cachedPosts));
    }

    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .populate('user', 'username email');

    const totalNoOfPosts = await Post.countDocuments();

    const result = {
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalNoOfPosts / limit),
      totalPosts: totalNoOfPosts,
    };

    // save your posts in redis cache
    await req.redisClient.setex(cachedKey, 300, JSON.stringify(result));

    res.json(result);
  } catch (error) {
    logger.error('Error Fetching posts', error);
    res.status(500).json({
      success: false,
      message: 'Error Fetching post',
    });
  }
};

const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const cachedKey = `post:${postId}`;
    const cachedPost = await req.redisClient.get(cachedKey);

    if (cachedPost) {
      return res.json(JSON.parse(cachedPost));
    }

    const singlePostDetailsById = await Post.findById(postId).populate(
      'user',
      'username email'
    );

    if (!singlePostDetailsById) {
      return res.status(404).json({
        message: 'Post not found',
        success: false,
      });
    }

    await req.redisClient.setex(
      cachedKey,
      3600,
      JSON.stringify(singlePostDetailsById)
    );

    res.json(singlePostDetailsById);
  } catch (error) {
    logger.error('Error fetching post by Id', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching post By Id',
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!post) {
      return res.status(404).json({
        message: 'Post not found',
        success: false,
      });
    }

    // publish post delete method
    await publishEvent('post.deleted', {
      postId: post._id.toString(),
      userId: req.user.userId,
      mediaIds: post.mediaIds,
    });

    await invalidatePostCache(req, req.params.id);

    res.json({
      message: 'Post deleted successfully',
      success: true,
    });
  } catch (error) {
    logger.error('Error deleting post', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting post',
    });
  }
};

export { createPost, getAllPosts, getPost, deletePost };
