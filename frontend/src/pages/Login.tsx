import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // States para armazenar os dados do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Para alternar entre Login e Cadastro

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Lógica para cadastro ou login
    if (isSignUp) {
      // Ação de cadastro
      // Aqui você pode chamar sua API de cadastro
      console.log('Cadastrar:', { name, email, password });
      navigate('/'); // Redireciona para a home após cadastro
    } else {
      // Ação de login
      // Aqui você pode chamar sua API de login
      console.log('Login:', { email, password });
      navigate('/'); // Redireciona para a home após login
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-gray-800">
          {isSignUp ? 'Cadastrar Conta' : 'Entrar'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            {isSignUp ? 'Cadastrar' : 'Entrar'}
          </button>

          <div className="flex justify-center items-center mt-4">
            <span className="text-sm text-gray-600">
              {isSignUp ? 'Já tem uma conta?' : 'Não tem uma conta?'}
            </span>
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-sm font-semibold text-blue-500 hover:text-blue-700"
            >
              {isSignUp ? 'Entrar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;