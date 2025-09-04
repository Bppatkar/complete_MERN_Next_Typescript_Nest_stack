import amqp from 'amqp';
import logger from './logger';

let connection = null;
let channel = null;

const EXCHANGE_NAME = 'facebook_events';

async function connectToRabbitMQ() {
  try {
    connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: false });
    logger.info('Connected to RABBITMQ');
    return channel;
  } catch (error) {
    logger.error('Error connecting to rabbitMQ', error);
  }
}

async function publishEvent(routingey, message) {
  if (!channel) {
    await connectToRabbitMQ();
  }

  channel.publish(
    EXCHANGE_NAME,
    routingey,
    Buffer.from(JSON.stringify(message))
  );
  logger.info(`Event published: ${routingey}`);
}

export { connectToRabbitMQ, publishEvent };
