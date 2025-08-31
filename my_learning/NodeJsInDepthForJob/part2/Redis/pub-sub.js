//! In social media microservices project we use messageQ and RabbitMQ, so for that we need to learn basic
// concept is simillar to sockets
// publisher send a message through channel, and subscriber will consume that messsage
// publisher --> send --> channel --> subscriber consume
// ======================================
import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379',
});

client.on('error', (error) => {
  console.log('Redis client error occured!', error);
});

async function testAdditionalFeatures() {
  try {
    await client.connect();
    console.log('Connected to Redis...');

    /* //! First create a new client instance where we are going to subscribe to the messages , and that will allow us to listen to channels independently

    const subscriber = client.duplicate(); // create a new client --> shares the same connection
    await subscriber.connect(); // connect to redis server for the subscriber

    await subscriber.subscribe('dummy-channel', (message, channel) => {
      console.log(`Recieved message from ${channel}: ${message}`);
    });

    //? publish message to the dummy channel
    //!  [the variable name we use] client is publisher and subsciber is subscriber ok, publisher publish the msg and subscriber listen that msg

    await client.publish(
      'dummy-channel',
      'this is a msg ,Some dummy data from publisher client to subscriber'
    );
    await client.publish(
      'dummy-channel',
      'some new message again from publisher'
    );

    // creating a short time
    await new Promise((resolve) => setTimeout(resolve, 3000));

    //? we are going to ensure that the messages that we are sending that are received before unsubscribing because we also need to unsubscribe for that particular dummy channel , after receiving messages and it's a very basic concept ,--> like in socket you're going to send some message then you're going to receive or consume it from your client side and vice versa similarly from your client side you are going to send something to your back end and then from back end you're going to consume that
    await subscriber.unsubscribe('dummy-channel');
    await subscriber.quit(); // close the subscriber connection 
   
    
    */

    // ================================
    /* 
    //! pipelining & transactions in redis
    //? what is pipelining --> it's a technique of sending multiple commands to the radis server in a batch
    //? Transactions --> allow multiple commands to be executed as a single unit

    //* so we use multi cmd and execute cmd

    const multi = client.multi();

    multi.set('key-transaction1', 'value1');
    multi.set('key-transaction2', 'value2');
    multi.get('key-transaction1');
    multi.get('key-transaction2');

    const result = await multi.exec();
    // console.log('multi result', result);
    // multi result [ 'OK', 'OK', 'value1', 'value2' ]

    const pipeline = client.multi();
    multi.set('key-pipeline1', 'value1');
    multi.set('key-pipeline2', 'value2');
    multi.get('key-pipeline1');
    multi.get('key-pipeline2');

    const pipelineResult = await multi.exec();
    // console.log('pipeline result', pipelineResult);
    // pipeline result ['OK','OK','value1','value2']

    // batch data operation -->

    const pipelineOne = client.multi();

    for (let i = 0; i < 1000; i++) {
      pipeline.set(`user:${i}.action`, `Action ${i}`);
    }

    await pipelineOne.exec();
    // we're simply inserting all of these user accents at once into your radius database and on the other side , you see transactions

    // _________________________
    // Bank example -->you are withdrawing money from one account and you doing deposit into another account so it's will be see something like

    const dummyExample = client.multi();
    multi.decrBy('account:1234:balance', 100);
    multi.incrBy('account:1111:balance', 100);

    // why transactions are suitable here because you are doing a atomacity here ,so that means if either the decrement or increment commands fail your both will fail right and in that way your data will remain consistent
    const finalResult = await multi.exec();

    // _________________________

    //? Other example - Ecommerce shopping cart with price
    const cartExample = client.multi();

    multi.hIncrBy('cart:1234', 'item_count', 1);
    multi.hIncrBy('cart:1234', 'total_price', 10);

    await multi.exec();
    // every time you're incrementing item_count by 1, you are also increasing the total price by 10

    // ==================================
    //! So these will be the very basic things that how you are going to implement pipelining and transactions 
     
    
    */
    // ==================================

    //! I'll give you some of the performance example like how this pipeline will help you

    console.log('Performance test');
    console.time('without pipelining');

    for (let i = 0; i < 1000; i++) {
      await client.set(`user${i}`, `user_value${i}`);
    }

    console.timeEnd('without pipelining');

    console.time('with pipelining');
    const bigPipeline = client.multi();

    for (let i = 0; i < 1000; i++) {
      bigPipeline.set(`user_pipeline_key${i}`, `user_pipeline_value${i}`);
    }

    await bigPipeline.exec();

    console.timeEnd('with pipelining');
    // output
    // without pipelining: 155.809ms
    // with pipelining: 17.841ms
    //? check 3-4 time , u will get diff results
    // without pipelining: 139.504ms
    // with pipelining: 45.591ms

  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
    // this client will give you a quit method , why --> this is important to avoid leaving open connections , so there can be sometimes open connection so this will actually make sure that there is no open connections should left
  }
}

testAdditionalFeatures();
// --------------------------------------------------

// Redis Pub/Sub (Publish/Subscribe) is a messaging pattern that enables real-time, one-to-many communication between different parts of an application or system. It functions like a broadcast system where:

//? Publishers: are like broadcasters who send out messages to specific "channels" (topics or categories). They don't know or care who is listening.

//? Subscribers: are like listeners who "tune into" specific channels to receive messages. They only receive messages published to the channels they are subscribed to.

//? Channels: are the named conduits through which messages are sent and received.

// In simple terms:
// Imagine a radio station (publisher) broadcasting music on a specific frequency (channel). Anyone with a radio (subscriber) can tune into that frequency and listen to the music. The radio station doesn't know who is listening, and the listeners don't know who else is listening or where the music is coming from, only that it's on that specific frequency.

//? In Redis Pub/Sub, when a message is PUBLISHed to a channel, Redis immediately pushes that message to all clients currently SUBSCRIBEd to that channel. Messages are not stored; if a subscriber is not connected or subscribed at the time a message is published, they will not receive that message.


//! we are not going to use the radis package ,so either you can use the node radius because that is the  radis for our node client or we can use something like Io-Radis and that is pretty cool so in our microservices project we are going to use Io-radis