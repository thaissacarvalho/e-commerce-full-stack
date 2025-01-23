import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';

const router = Router();
const cartController = new CartController();


router.get('/:userId', cartController.getCart);
router.post('/add', cartController.addItemToCart);

export default router;
