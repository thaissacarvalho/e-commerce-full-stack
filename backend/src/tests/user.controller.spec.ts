import { Request, Response } from 'express';
import { UserController } from '../controllers/user.controller';
import { UserService } from '../services/user.service';
import User from '../models/user.model';

// Mocka o módulo UserService
jest.mock('../services/user.service');

describe('UserController', () => {
  let userController: UserController;
  let userService: jest.Mocked<UserService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    userService = new UserService() as jest.Mocked<UserService>;

    userController = new UserController();
    userController['userService'] = userService; 

    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  // RegisterUser
  it('should register a new user', async () => {
    const newUser = new User({
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Mocka o método registerUser para retornar um usuário
    userService.registerUser.mockResolvedValue(newUser);

    req.body = { name: 'John Doe', email: 'john@example.com', password: 'password123' };

    await userController.registerUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newUser);
  });

  // FindUserById
  it('should return user by id', async () => {
    const mockUser = new User({
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      comparePassword: jest.fn().mockResolvedValue(true),
    });

    // Mocka o método findUserById para retornar um usuário
    userService.findUserById.mockResolvedValue(mockUser);

    req.params = { id: '1' };

    await userController.findUserById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should return 404 if user not found', async () => {
    userService.findUserById.mockResolvedValue(null);

    req.params = { id: '999' };

    await userController.findUserById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  // Update User
  it('should update user', async () => {
    const updatedUser = new User({
      _id: '1',
      name: 'John Doe Updated',
      email: 'john.updated@example.com',
      password: 'password123',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      comparePassword: jest.fn().mockResolvedValue(true),
    });

    const updates = { name: 'John Doe Updated', email: 'john.updated@example.com' };

    // Mock do UserService e do User.findOne
    userService.updateUser.mockResolvedValue(updatedUser);
    User.findOne = jest.fn().mockResolvedValue(null); // Simula que o email não existe, logo pode ser atualizado

    req.params = { id: '1' };
    req.body = updates;

    await userController.updateUser(req as Request, res as Response);

    // Verifica o status e o conteúdo da resposta
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User updated successfully',
      user: updatedUser,
    });
  });

  it('should return 400 if no fields provided for update', async () => {
    req.params = { id: '1' };
    req.body = {};

    await userController.updateUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'No fields provided for update' });
  });

  it('should return 404 if user not found for update', async () => {
    const updates = { name: 'Updated Name' };

    userService.updateUser.mockResolvedValue(null);

    req.params = { id: '1' };
    req.body = updates;

    await userController.updateUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
  });

  it('should return 409 if email already exists during update', async () => {
    User.findOne = jest.fn().mockResolvedValueOnce({ email: 'john.doe@example.com' });
  
    userService.updateUser.mockResolvedValue(null);
  
    req.params = { id: '1' };
    req.body = { email: 'john.doe@example.com' };
  
    await userController.updateUser(req as Request, res as Response);
  
    expect(res.status).toHaveBeenCalledWith(409); 
    expect(res.json).toHaveBeenCalledWith('Email already exists');
  });  

  // Delete User
  it('should delete user successfully', async () => {
    const deletedUser = new User({
      _id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      isAdmin: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    userService.deleteUser.mockResolvedValue(deletedUser);

    req.params = { id: '1' };

    await userController.deleteUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
  });

  it('should return 404 if user not found for deletion', async () => {
    userService.deleteUser.mockResolvedValue(null);

    req.params = { id: '999' };

    await userController.deleteUser(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

});
