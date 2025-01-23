import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();
const productController = new ProductController();

router.get('/all', productController.getProducts);
router.post('/register', productController.addProduct);
router.get('/:id', productController.getProductById);
router.patch('/edit/:id', productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct)

export default router;
