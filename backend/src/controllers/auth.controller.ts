import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    try {
      const token = await this.authService.login(email, password);
      res.status(200).json({ token });
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
}
