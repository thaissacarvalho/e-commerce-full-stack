import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de autenticação aqui
  };

  return (
    <div className="flex justify-center items-center h-screen bg-secondary text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-6 rounded-lg shadow-lg space-y-4"
      >
        <h1 className="text-2xl mb-4">Login ou Cadastro</h1>
        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="w-full bg-primary text-white py-2 rounded">
          {name ? "Cadastrar" : "Entrar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
