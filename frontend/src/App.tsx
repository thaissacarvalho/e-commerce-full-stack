import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import CartSidebar from './components/cart/CartSidebar';
import Produtos from './pages/Products';
import Login from './pages/Login';
import './App.css';
import { useState } from 'react';

function App() {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCart = () => {
    setIsCartVisible(prevState => !prevState);
  };

  return (
    <Router>
      <div className="relative">
        <Header toggleCart={toggleCart} />
        {isCartVisible && <CartSidebar />}
        <div className="p-4">
          <Routes>
            <Route path="/" element={<Produtos />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
