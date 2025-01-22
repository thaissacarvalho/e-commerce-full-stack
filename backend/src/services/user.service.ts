import User, { IUser } from '../models/user.model';

export class UserService {
  async registerUser(name: string, email: string, password: string): Promise<IUser | null> {
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error('Email already exists');

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();
    return newUser;
  }

  async findUserById(userId: string): Promise<IUser | null> {
    return User.findById(userId);
  };

  async updateUser(userId: string, updates: Partial<IUser>): Promise<IUser | null> {
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });
    return user;
  };

  async deleteUser(userId: string) {
    const user = await User.findByIdAndDelete(userId);
    return user;
  }
}