import express from 'express';
import emailController from '../controllers/email.controller';

const router = express.Router();

router.post('/send-abandoned-cart-email', emailController.sendAbandonedCartEmail);

export default router;
