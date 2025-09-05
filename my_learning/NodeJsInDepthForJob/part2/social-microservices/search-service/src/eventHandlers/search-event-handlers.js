import SearchPost from '../models/Search.js';
import logger from '../utils/logger.js';

async function handlePostCreated(event) {
  try {
    const newSearchPost = new SearchPost({
      postId: event.postId,
      userId: event.userId,
      content: event.content,
      createdAt: event.createdAt,
    });

    await newSearchPost.save();
    logger.info(
      `Search post created: ${event.postId}, ${newSearchPost._id.toString()}`
    );
  } catch (e) {
    logger.error('Error handling post creation event', e);
  }
}

async function handlePostDeleted(event) {
  try {
    const result = await SearchPost.findOneAndDelete({ postId: event.postId }); 
    if (result) {
      logger.info(`Search post deleted: ${event.postId}`); 
    } else {
      logger.info(`Search post not found for deletion: ${event.postId}`); 
    }
  } catch (error) {
    logger.error('Error handling post deletion event', error); 
  }
}

export { handlePostCreated, handlePostDeleted };
