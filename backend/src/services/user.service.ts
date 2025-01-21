import User, { IUser } from '../models/user.model';

export const registerUser = async (name: string, email: string, password: string): Promise<IUser | null> => {
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('User already exists');

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.save();
  return newUser;
};

export const loginUser = async (email: string, password: string): Promise<IUser | null> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid email or password');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new Error('Invalid email or password');

  return user;
};

export const findUserById = async (userId: string): Promise<IUser | null> => {
  return User.findById(userId);
};

export const updateUser = async (userId: string, updates: Partial<IUser>): Promise<IUser | null> => {
  const user = await User.findByIdAndUpdate(userId, updates, { new: true });
  return user;
};
