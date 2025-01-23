import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from './config/mongoose';
import { client } from './config/redis.config';     
import router from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './config/swagger';

dotenv.config();
connectToDatabase();

const swaggerDocs = swaggerJSDoc(swaggerOptions);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

client.on('connect', () => {
  console.log('Redis connected');
});

app.use('/api', router);    
app.use('/api/v1/ecommerce/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
