import { Redis } from 'ioredis';
// ioredis is a redis client library for node js

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

// ioredis client, which is a popular alternative for production applications.

//! we are not going to use the radis package , so either you can use the node radius because that is the  radis for our node client or we can use something like Io-Radis and that is pretty cool so in our microservices project we are going to use Io-radis
//? because ioredis  will be giving some more features like this will give you automatic pipelining and also built-in support for your radius cluster then also it will support low scripting for complex radis operations but we are not going into much details right now, this will also support typescript and so many other things and the main advantage is this is also actively maintained and updated.if you go to the npm website you'll be able to see its features very easily

// it is almost similar to redis - so we are not going to check every command ok

// install - npm i ioredis

//!  just one thing I want to mention that in our microservices project we are going to use ioradis instead of the official radis package
