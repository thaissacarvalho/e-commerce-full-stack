import redis, { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL as string;

const client = createClient({
  url: REDIS_URL,
});

client.on('connect', () => {
  console.log('Connected to Redis');
});

export default client;