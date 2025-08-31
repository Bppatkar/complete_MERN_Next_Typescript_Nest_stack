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

    
  } catch (error) {
    console.log(error);
  } finally {
    client.quit();
    // this client will give you a quit method , why --> this is important to avoid leaving open connections , so there can be sometimes open connection so this will actually make sure that there is no open connections should left
  }
}

testAdditionalFeatures();
