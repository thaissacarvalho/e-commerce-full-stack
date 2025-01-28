import express from 'express';
import { EmailController } from '../controllers/email.controller';

const router = express.Router();
const emailController = new EmailController();

router.post('/send-abandoned-cart-email', emailController.sendAbandonedCartEmail.bind(emailController));

export default router;
