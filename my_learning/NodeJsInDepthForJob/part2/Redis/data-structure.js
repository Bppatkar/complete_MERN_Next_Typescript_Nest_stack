import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379',
});

// event listner
client.on('error', (error) => {
  console.log('Redis client error occured!', error);
});

client.on('connect', () => {
  console.log('Connecting to Redis...');
});

client.on('ready', () => {
  console.log('Redis client ready');
});

async function redisDataStructure() {
  try {
    await client.connect();
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
    // await client.sAdd('user:nickName', ['john', 'varun', 'xyz']);
    // const extractUserNicknames = await client.sMembers('user:nickName');
    // console.log(extractUserNicknames); // [ 'xyz', 'varun', 'john' ]

    // const isVarunIsOneOfUserNickName = await client.sIsMember(
    //   'user:nickName',
    //   'varun'
    // );

    // console.log(isVarunIsOneOfUserNickName); // 1

    // await client.sRem('user:nickName', 'xyz');

    // const getUpdatedUserNickNames = await client.sMembers('user:nickName');
    // console.log(getUpdatedUserNickNames); // [ 'varun', 'john' ]

    // // sorted sets
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
    // console.log(extractALlCartItemsWithScore); // []

    // const cartTwoRank = await client.zRank('cart', 'Cart 2');
    // console.log(cartTwoRank); // 2

    // hashes  --> HSET, HGET, HGETALL , HDEL

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
  }
}
redisDataStructure();

// _______________________________
//! for checking code - install redis from google - [search on google - "redis windows git install" ]
// open cmd - write -- redis-server
// redis-cli ping  -- # Should return "PONG" means server is running
// for stopping server - run cmd as administrator and then - run cmd -- net stop redis
// and in your file write - await client.connect()    [dont forgot to add this ]
