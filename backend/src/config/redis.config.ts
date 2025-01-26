import { createClient } from 'redis';
import { app } from '..';

const redis_user = process.env.REDIS_USER;
const redis_password = process.env.REDIS_PASSWORD;
const redis_host = process.env.REDIS_HOST;
const PORT = 12919;

export const client = createClient({
    username: redis_user,
    password: redis_password,
    socket: {
        host: redis_host,
        port: PORT
    }
});

export const startServer = async () => {
    try {
        await client.connect();
        console.log('Redis connected');
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
        process.on('SIGINT', async () => {
            await client.disconnect();
            console.log('Redis disconnected');
            process.exit();
        });
        
    } catch (err) {
        console.log('Error connecting to Redis:', err);
    }
};