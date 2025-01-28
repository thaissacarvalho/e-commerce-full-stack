import { useState, useContext } from 'react';
import { CartContext } from '../../context/Cart';
import { Link } from 'react-router-dom';
import Cart from '../cart/Cart'; 

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems } = useContext(CartContext);

  const cartItemsCount = cartItems.reduce((acc, item) => acc + (item.quantity || 0), 0);

  return (
    <header className="bg-gray-800 text-white py-4 px-6 relative">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Logo</Link>
        </div>

        <div className="flex space-x-6 lg:hidden items-center">
          <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-1 18H4L3 3z" />
            </svg>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartItemsCount}
            </span>
          </button>
        </div>

        <nav className="hidden lg:flex space-x-8">
          <Link to="/" className="hover:text-gray-400">Produtos</Link>
          <Link to="/login" className="hover:text-gray-400">Login</Link>
          <button onClick={() => setIsCartOpen(!isCartOpen)} className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18l-1 18H4L3 3z" />
            </svg>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartItemsCount}
            </span>
          </button>
        </nav>
      </div>

      {/* Renderize o componente Cart, passando a função de fechar como prop */}
      {isCartOpen && <Cart closeCart={() => setIsCartOpen(false)} />}
    </header>
  );
};

export default Header;