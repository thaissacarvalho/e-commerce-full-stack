import { createClient } from 'redis';

const redis_user = process.env.REDIS_USER;
const redis_password = process.env.REDIS_PASSWORD;
const redis_host = process.env.REDIS_HOST;

export const client = createClient({
    username: redis_user,
    password: redis_password,
    socket: {
        host: redis_host,
        port: 10021
    }
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect();