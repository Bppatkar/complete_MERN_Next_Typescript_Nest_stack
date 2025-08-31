import { createClient } from 'redis';

const client = createClient({
  url: 'redis://localhost:6379',
});

client.on('error', (error) => {
  console.log('Redis client error occured!', error);
});
client.on('connect', () => {
  console.log('Connecting to Redis...');
});

client.on('ready', () => {
  console.log('Redis client ready');
});

async function testAdditionalFeatures() {
  try {
    await client.connect();

    const subscriber = client.duplicate(); // create a new client --> shares the same connection
    await subscriber.connect(); // connect to redis server for the subscriber

    await subscriber.subscribe('dummy-channel', (message, channel) => {
      console.log(`Recieved message from ${channel}: ${message}`);
    });

    //? publish message to the dummy channel
    await client.publish('dummy-channel', 'Some dummy data from publisher');
    await client.publish(
      'dummy-channel',
      'some ne message again from publisher'
    );

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await subscriber.unsubscribe('dummy-channel');
    await subscriber.quit(); // close the subscriber connection

    // pipelining & transactions

    const multi = client.multi();

    multi.set('key-transaction1', 'value1');
    multi.set('key-transaction2', 'value2');
    multi.get('key-transaction1');
    multi.get('key-transaction2');

    const result = await multi.exec();
    console.log(result);

    const pipeline = await multi.exec();
    multi.set('key-pipeline1', 'value1');
    multi.set('key-pipeline2', 'value2');
    multi.get('key-pipeline1');
    multi.get('key-pipeline2');

    const pipelineResult = await multi.exec();
    console.log(pipelineResult);

    // batch data operation -->

    const pipelineOne = client.multi();

    for (let i = 0; i < 1000; i++) {
      pipeline.set(`user:${i}.action`, `Action ${i}`);
    }

    await pipelineOne.exec();

    const dummyExample = client.multi();
    multi.decrBy('account:1234:balance', 100);
    multi.decrBy('account:1111:balance', 100);

    const finalResult = await multi.exec();

    const cartExample = client.multi();

    multi.hIncrBy('cart:1234', 'item_count', 1);
    multi.hIncrBy('cart:1234', 'total_price', 19);

    await multi.exec();

    console.log('Performance test');
    console.log('without pipelining');

    for (let i = 0; i < 1000; i++) {
      await client.set(`user${i}`, `user_value${i}`);
    }

    console.timeEnd('without pipelining');
    console.time('with pipeline');

    const bigPipeline = client.multi();

    for (let i = 0; i < 1000; i++) {
      bigPipeline.set(`user_pipeline_key${i}`, `user_pipeline_value${i}`);
    }

    await bigPipeline.exec();
    console.log('with pipelining');
  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
    // this client will give you a quit method , why --> this is important to avoid leaving open connections , so there can be sometimes open connection so this will actually make sure that there is no open connections should left
  }
}

testAdditionalFeatures();
