import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Products from './components/product/Product';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';

const App: React.FC = () => {
  return (
    <Router>
        <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product/:_id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
