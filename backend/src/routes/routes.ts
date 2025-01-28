import { Router } from 'express';
import userRoutes from './user.routes';
import productRoutes from './product.routes';
import cartRoutes from './cart.routes';
import authRoutes from './auth.routes';
import emailRoutes from './email.routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/login', authRoutes);
router.use('/emails', emailRoutes)

export default router;
