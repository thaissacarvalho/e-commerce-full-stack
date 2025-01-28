import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

const router = Router();
const userController = new UserController();

router.post('/register', userController.registerUser.bind(userController));
router.get('/:id', userController.findUserById.bind(userController));
router.patch('/update', userController.updateUser.bind(userController));
router.delete('/delete', userController.deleteUser.bind(userController));

export default router;