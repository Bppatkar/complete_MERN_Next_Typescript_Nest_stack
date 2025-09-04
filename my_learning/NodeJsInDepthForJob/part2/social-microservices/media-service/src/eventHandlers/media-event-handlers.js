import Media from '../models/Media.js';
import logger from '../utils/logger.js';
import { deleteMediaFromCloudinary } from '../utils/cloudinary.js';

const handlePostDeleted = async (event) => {
  console.log(event, 'eventEventevent');
  const { postId, mediaIds } = event;
  try {
    const mediaToDelete = await Media.find({ _id: { _in: mediaIds } });

    for (const media of mediaToDelete) {
      await deleteMediaFromCloudinary(media.publicId);
      await Media.findByIdAndDelete(media._id);

      logger.info(
        `Deleted media ${media._id} associated with this deleted post ${postId}`
      );
    }
  } catch (error) {
    logger.error(error, 'Error occured while media deletion');
  }
};

export default handlePostDeleted;
