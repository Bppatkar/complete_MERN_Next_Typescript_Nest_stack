import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379',
});

// event listner
client.on('error', (error) => {
  console.log('Redis client error occured!', error);
});

async function redisDataStructure() {
  try {
    await client.connect();
    console.log('Connected to Redis...');

    // String -> SET, GET, MSET, MGET  [M - means multiple value]

    // await client.set('user:name', 'Bhanu pratap');
    // const name = await client.get('user:name');
    // console.log(name); // Bhanu pratap

    // //? setting multiple values at onces
    // await client.mSet([
    //   'user:email',
    //   'bhanupratap@ok.com',
    //   'user:age',
    //   '60',
    //   'user:country',
    //   'India',
    // ]);
    // const [email, age, country] = await client.mGet([
    //   'user:email',
    //   'user:age',
    //   'user:country',
    // ]);

    // console.log(email, age, country); //bhanupratap@ok.com 60 India

    // //? ____________________________________

    // // lists --> LPUSH, RPUSH, LRANGE , LPOP, RPOP

    // await client.lPush('notes', ['note 1', 'note 2', 'note 3']);
    // const extractAllNotes = await client.lRange('notes', 0, -1);
    // // console.log(extractAllNotes); // [ 'note 3', 'note 2', 'note 1' ]

    // const firstNote = await client.lPop('notes');
    // console.log(firstNote); // note 3

    // const remainingNotes = await client.lRange('notes', 0, -1);
    // // console.log(remainingNotes, 'remainingNotes'); // [ 'note 2', 'note 1' ] remainingNotes

    // // sets -> SADD, SMEMBERS, SISMEMBER, SREM
    // // SADD --> add one or more items
    // // SMEMBERS --> return all the members from a set
    // // SISMEMBER --> check if any particular member is exist in a set
    // // SREM --> remove one or more member from set
    // await client.sAdd('user:nickName', ['john', 'varun', 'xyz']);
    // const extractUserNicknames = await client.sMembers('user:nickName');
    // console.log(extractUserNicknames); // [ 'xyz', 'varun', 'john' ]

    // const isVarunIsOneOfUserNickName = await client.sIsMember(
    //   'user:nickName',
    //   'varun'
    // );

    // console.log(isVarunIsOneOfUserNickName); // true

    // await client.sRem('user:nickName', 'xyz');

    // const getUpdatedUserNickNames = await client.sMembers('user:nickName');
    // console.log(getUpdatedUserNickNames); // [ 'varun', 'john' ]

    //!  sorted sets - means - redis will maintain the order
    // // ZADD, ZRANGE, ZRANK, ZREM

    // await client.zAdd('cart', [
    //   {
    //     score: 100,
    //     value: 'Cart 1',
    //   },
    //   {
    //     score: 150,
    //     value: 'Cart 2',
    //   },
    //   {
    //     score: 10,
    //     value: 'Cart 3',
    //   },
    // ]);

    // const getCartItems = await client.zRange('cart', 0, -1);
    // console.log(getCartItems); // [ 'Cart 3', 'Cart 1', 'Cart 2' ]

    // const extractALlCartItemsWithScore = await client.zRangeWithScores(
    //   'Cart',
    //   0,
    //   -1
    // );
    // console.log(extractALlCartItemsWithScore);
    /* [{
        score: 100,
        value: 'Cart 1',
      },
      {
        score: 150,
        value: 'Cart 2',
      },
      {
        score: 10,
        value: 'Cart 3',
      }]
    */

    // const cartTwoRank = await client.zRank('cart', 'Cart 2');
    // console.log(cartTwoRank); // 2

    //! most of the time , we are working with Redis 'Caching' only, and most of time we use - SET, GET
    //? setting some keys and getting some keys

    //! hashes  --> HSET, HGET, HGETALL , HDEL

    await client.hSet('product:1', {
      name: 'Product 1',
      description: 'product one description',
      rating: '5',
    });

    const getProductRating = await client.hGet('product:1', 'rating');
    console.log(getProductRating); // 5

    const getProductDetails = await client.hGetAll('product:1');
    console.log(getProductDetails);
    /*
    [Object: null prototype] {
      name: 'Product 1',
      description: 'product one description',    
      rating: '5'
    }
    */

    await client.hDel('product:1', 'rating');
    const updatedProductDetails = await client.hGetAll('product:1');
    console.log(updatedProductDetails);

    /* 
    [Object: null prototype] {
      name: 'Product 1',
      description: 'product one description'     
    }
    */
  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
    // this client will give you a quit method , why --> this is important to avoid leaving open connections , so there can be sometimes open connection so this will actually make sure that there is no open connections should left
  }
}
redisDataStructure();
// ---------------------------
//? move to the pub-sub
//! in social media microservices project we use messageQ and RabbitMQ, so for that we need to learn basic
// concept is simillar to sockets

// _______________________________
//! for checking code - install redis from google - [search on google - "redis windows git install" ]
// open cmd - write -- redis-server
// redis-cli ping  -- # Should return "PONG" means server is running
// for stopping server - run cmd as administrator and then - run cmd -- net stop redis
// and in your file write - await client.connect()    [dont forgot to add this ]

// --------------------------------------------------

//? In Redis, a data structure is a specific way of organizing and storing data in memory, allowing for efficient operations on that data. Unlike a simple key-value store that only handles strings, Redis offers several built-in data structures, each optimized for different types of data and use cases.

//! Here are the main data structures in Redis, explained simply:
//? Strings: The most basic type, a sequence of bytes. You can store text, numbers, or even binary data.
/* 
    SET mykey "Hello World"
    GET mykey
 */
//? Lists: Ordered collections of strings, like a linked list. You can add elements to the beginning or end, or retrieve a range of elements. Useful for queues, logs, or timelines.
/* 
    LPUSH mylist "item1" "item2"
    LRANGE mylist 0 -1
*/
//? Hashes: Similar to a dictionary or map, storing field-value pairs under a single key. Ideal for representing objects or structured data like user profiles.
/* 
    HSET user:1 name "Alice" age 30
    HGET user:1 name
*/
//? Sets: Unordered collections of unique strings. Useful for storing unique items like tags, categories, or user roles, and performing set operations like union or intersection.
/* 
    SADD tags "redis" "database" "nosql"
    SMEMBERS tags
*/
//? Sorted Sets (ZSETs): Like sets, but each member also has an associated "score," which is used to keep the set ordered. Perfect for leaderboards, rankings, or items with priorities.
/* 
    ZADD leaderboard 100 "playerA" 200 "playerB"
    ZRANGE leaderboard 0 -1 WITHSCORES
 */

//* These data structures provide flexibility and efficiency for modeling various data types directly within Redis, enabling fast in-memory operations and reducing the need for complex data transformations between your application and the database.
