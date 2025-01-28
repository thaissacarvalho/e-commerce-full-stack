import User from '../models/user.model';

export const seedUsers = async () => {
  const users = [
    { name: 'Joana Doe', email: 'joanadoe@email.com', password: 'joanadoe2024', isAdmin: true },
    { name: 'Paul Doe', email: 'pauldoe@email.com', password: 'pauldoe2023', isAdmin: false },
    { name: 'John Doe', email: 'johndoe@email.com', password: 'johndoe2025', isAdmin: true },
  ];

  try {
    await User.insertMany(users);
    console.log('Usuários criados com sucesso.');
  } catch (err) {
    console.error('Erro ao criar usuários:', err);
  }
};
