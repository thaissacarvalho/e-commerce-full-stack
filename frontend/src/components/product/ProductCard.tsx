import React, { useContext } from 'react';
import { CartContext } from '../../context/Cart';
import { Product } from '../../types/product';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
      <img
        className="w-full h-48 object-cover"
        src={product.imageUrl}
        alt={product.name}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{product.name}</h3>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold">
            R$ {product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
              product.stock < 1 ? 'cursor-not-allowed bg-gray-400' : ''
            }`}
            disabled={product.stock < 1}
          >
            {product.stock < 1 ? 'Indisponível' : 'Adicionar ao Carrinho'}
          </button>
        </div>
        <Link
          to={`/product/${product._id}`}
          className="text-blue-500 mt-2 block"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
