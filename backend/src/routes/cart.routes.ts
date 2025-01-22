import { Router } from 'express';
import { getCart, addItemToCart } from '../controllers/cart.controller';

const router = Router();

router.get('/:userId', getCart);
router.post('/add', addItemToCart);

export default router;
