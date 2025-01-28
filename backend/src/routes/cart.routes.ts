import { Router } from 'express';
import { CartController } from '../controllers/cart.controller';

const router = Router();
const cartController = new CartController();

router.get('/', cartController.getCart.bind(cartController));
router.get('/:userId', cartController.getCartByUserId.bind(cartController));
router.post('/add-item', cartController.addItemToCart.bind(cartController));
router.post('/create-cart', cartController.createCart.bind(cartController));
router.patch('/edit-cart-item', cartController.updateCartItem.bind(cartController));
router.delete('/clear-cart/:userId', cartController.removeFromCart.bind(cartController));

export default router;
