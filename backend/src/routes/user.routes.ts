import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/register', userController.registerUser);
router.get('/:id', userController.findUserById);
router.patch('/update', userController.updateUser);
router.delete('/delete', userController.deleteUser);

export default router;