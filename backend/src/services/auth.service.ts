import User from "../models/user.model";
import jwt from 'jsonwebtoken';


export class AuthService {

  async loginUser(email: string, password: string): Promise<string> {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('JWT Secret is not defined');

    const user = await User.findOne({ email });
    if (!user) throw new Error('Email not found');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid password');

    const payload = { id: user.id, email: user.email };

    const token = jwt.sign(payload, jwtSecret, { expiresIn: '7d' });

    return token;
  }
}