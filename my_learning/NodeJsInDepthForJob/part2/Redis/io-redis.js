import { Redis } from 'ioredis';

const redis = new Redis();

async function ioRedisDemo() {
  try {
    await redis.set('userName', 'Bhanu Pratap');
    const val = await redis.get('userName');
    console.log(val); // Bhanu Pratap
  } catch (error) {
    console.log(error);
  } finally {
    redis.quit();
  }
}

ioRedisDemo();
