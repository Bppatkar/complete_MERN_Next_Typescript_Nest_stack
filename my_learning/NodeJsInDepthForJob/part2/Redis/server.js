//! Redis stands for REmote DIctionary Server and is an open-source, in-memory, NoSQL data structure store used primarily as a high-performance cache or a quick-response database. Because it stores data in RAM rather than on disk, Redis achieves extremely low data latency, providing unparalleled speed and reliability for applications that require fast data access.
//* Note: Redis is much faster than MongoDB, especially for tasks that rely on simple, high-throughput operations. The exact margin can vary, but for basic operations, Redis is often 10x to 100x faster than MongoDB.
//? Redis is a fast, in-memory data store ideal for caching, real-time analytics, and messaging. It offers high performance, scalability, and optional persistence, making it perfect for microservices and high-speed applications. Redis outperforms MongoDB in speed, especially for low-latency tasks.

//______________________________________________

//! creating a redis connection
import redis from 'redis';

const client = redis.createClient({
  host: 'localhost',
  port: 6379, // when we install redis in local machine then we got same default port
});

// event listener

client.on('error', (error) => {
  console.log('Redis client error occured!', error);
});

//? create a simple function and that is just to test our radius connection
// async function testRedisConnection() {
//   try {
//     await client.connect();
//     console.log('Connect to redis');
//   } catch (error) {
//     console.log(error);
//   } finally {
//     await client.quit();
//   }
// }
// testRedisConnection();

//! testing connection done , now go deep
async function testRedisConnection() {
  try {
    await client.connect();
    console.log('Connect to redis'); /// Connect to redis

    await client.set('name', 'Bhanu Pratap');

    const extractValue = await client.get('name');
    console.log(extractValue); // Bhanu Pratap

    const deleteCount = await client.del('name');
    console.log(deleteCount); // 1  [means 1 key has been deleted]

    const extractUpdateValue = await client.get('name');
    console.log(extractUpdateValue); // null

    await client.set('count', 100);
    const incrementCount = await client.incr('count');
    console.log(incrementCount); //  101

    const decrementCount = await client.decr('count');
    console.log(decrementCount); // 100

    await client.decr('count');
    await client.decr('count');
    await client.decr('count');
    await client.decr('count');
    await client.decr('count');
    await client.decr('count');
    console.log(await client.get('count')); // 94
  } catch (error) {
    console.log(error);
  } finally {
    await client.quit();
    // this client will give you a quit method , why --> this is important to avoid leaving open connections , so there can be sometimes open connection so this will actually make sure that there is no open connections should left
  }
}
testRedisConnection();

//? now move to data-structure section

// _____________________
//! for checking code - install redis from google - [search on google - "redis windows git install" ]
// open cmd - write -- redis-server
// redis-cli ping  -- # Should return "PONG" means server is running
//? for stopping server -
//! run cmd as administrator and then - run cmd --> net stop redis
// and in your file write - await client.connect()    [dont forgot to add this ]
