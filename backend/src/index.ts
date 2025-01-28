import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectToDatabase from './config/mongoose.config';
import { startServer } from './config/redis.config';     
import router from './routes/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './config/swagger.config';
import { runSeeds } from './seeds';

dotenv.config();
connectToDatabase();

const swaggerDocs = swaggerJSDoc(swaggerOptions);

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

startServer();
runSeeds();

app.use('/api', router);    
app.use('/api/v1/ecommerce/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api`);
});