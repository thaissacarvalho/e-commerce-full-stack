import React, { useContext } from 'react';
import { CartContext } from '../../context/Cart';
import { Product } from '../../types/product';
import { Link } from 'react-router-dom';
import { HiShoppingCart } from 'react-icons/hi'; 

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-transform transform hover:scale-105 p-4">
      <img
        className="w-full h-48 object-cover rounded-md transition-transform transform hover:scale-110"
        src={product.imageUrl}
        alt={product.name}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
        <div className="flex flex-col mt-4 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-700">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className={`flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all ${
              product.stock < 1 ? 'cursor-not-allowed bg-gray-400' : ''
            }`}
            disabled={product.stock < 1}
          >
            <HiShoppingCart className="mr-2" />
            {product.stock < 1 ? 'Indisponível' : 'Adicionar ao Carrinho'}
          </button>
          <Link
            to={`/product/${product._id}`}
            className="text-blue-500 block hover:underline text-center"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;