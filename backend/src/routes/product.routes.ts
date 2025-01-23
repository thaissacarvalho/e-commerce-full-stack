import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();
const productController = new ProductController();

router.get('/products/all', productController.getProducts);
router.post('/register', productController.addProduct);
router.get('/products/:id', productController.getProductById);
router.patch('/products/edit/:id', productController.updateProduct);
router.delete('products/delete/:id', productController.deleteProduct)

export default router;
