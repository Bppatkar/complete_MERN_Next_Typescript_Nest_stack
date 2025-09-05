import SearchPost from '../models/Search.js';
import logger from '../utils/logger.js';

//implement caching here for 2 to 5 min
const searchPostController = async (req, res) => {
  logger.info('Search endpoint hit!');
  try {
    const { query } = req.query;

    if (!query || query.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    // Check cache first
    const cacheKey = `search:${query}`;
    const cachedResults = await req.redisClient.get(cacheKey);

    if (cachedResults) {
      logger.info(`Returning cached results for query: ${query}`);
      return res.json(JSON.parse(cachedResults));
    }

    const results = await SearchPost.find(
      {
        $text: { $search: query },
      },
      {
        score: { $meta: 'textScore' },
      }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(10);

    // Cache results for 5 minutes
    await req.redisClient.setex(cacheKey, 300, JSON.stringify(results));

    res.json(results);
  } catch (error) {
    logger.error('Error while searching post', error);
    res.status(500).json({
      success: false,
      message: 'Error while searching post',
    });
  }
};

export { searchPostController };
