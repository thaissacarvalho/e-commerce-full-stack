import { Request, Response } from 'express';
import { loginUser } from '../services/auth.service'; 

export const loginController = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const token = await loginUser(email, password);
    return res.status(200).json({ token });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'Email not found' || error.message === 'Invalid password') {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};
