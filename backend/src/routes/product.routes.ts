import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';

const router = Router();
const productController = new ProductController();

router.get('/all', productController.getProducts.bind(productController));
router.post('/register', productController.addProduct.bind(productController));
router.get('/:id', productController.getProductById.bind(productController));
router.patch('/edit/:id', productController.updateProduct.bind(productController));
router.delete('/delete/:id', productController.deleteProduct.bind(productController));

export default router;
