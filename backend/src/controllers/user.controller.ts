import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import User from '../models/user.model';

export class UserController {

  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const newUser = await this.userService.registerUser(name, email, password);

      res.status(201).json(newUser);
      return;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Email not found' || error.message === 'Invalid password') {
          res.status(401).json({ message: 'Invalid email or password' });
          return;
        }
        res.status(500).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
  }

  async findUserById(req: Request, res: Response) {
    try {
      const user = await this.userService.findUserById(req.params.id);
      if (!user){
        res.status(404).json({ message: 'User not found' }) 
        return;
      } 
      
      res.status(200).json(user);
      return;
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'User not found') {
          res.status(401).json({ message: 'Invalid user' });
          return;
        }
        res.status(500).json({ message: error.message });
        return;
      }
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      if (!updates || Object.keys(updates).length === 0) {
        res.status(400).json({ message: 'No fields provided for update' });
        return;
      }
  
      const userExists = await User.findOne({ email: updates.email }); 
      if (userExists) {
        res.status(409).json('Email already exists');
        return;
      }
  
      const updateUser = await this.userService.updateUser(id, updates);
  
      if (!updateUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
  
      res.status(200).json({
        message: 'User updated successfully',
        user: updateUser
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
  

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userService.deleteUser(req.params.id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          res.status(401).json(error.message);
        }
        res.status(500).json({ message: error.message });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}