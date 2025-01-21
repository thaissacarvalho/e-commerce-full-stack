import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/mongoose'; 
import redisClient from './config/redis';      
// import productRoutes from './routes/productRoutes'; 
// import cartRoutes from './routes/cartRoutes';        

dotenv.config();

const app = express();

app.use(cors());             
app.use(express.json());    
app.use(express.urlencoded({ extended: true })); 

connectDB();

redisClient.on('connect', () => {
  console.log('Redis connected');
});

// app.use('/api', productRoutes);  
// app.use('/api', cartRoutes);     

app.get('/', (req: Request, res: Response) => {
  res.send('E-commerce API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
