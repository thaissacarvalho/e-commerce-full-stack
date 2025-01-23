import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';

const router = Router();
const cartController = new CartController();

router.get('/carts', cartController.getCart)
router.get('/:userId', cartController.getCartByUserId);
router.post('/add-item', cartController.addItemToCart);
router.post('/create-cart', cartController.createCart);
router.patch('/edit-cart-item', cartController.updateCartItem);
router.delete('/clear-cart/:userId', cartController.removeFromCart);

export default router;
