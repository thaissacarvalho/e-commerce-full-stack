import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/product';
import { getProductById } from '../services/product';
import { CartContext } from '../context/Cart';

const ProductDetail: React.FC = () => {
  const { _id } = useParams();
  const cartContext = useContext(CartContext);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [addedToCart, setAddedToCart] = useState<boolean>(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (_id) {
        try {
          const data = await getProductById(_id);
          setProduct(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setError('ID do produto não encontrado');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [_id]);

  const handleAddToCart = () => {
    if (cartContext && product) {
      cartContext.addToCart(product); // Adiciona ao carrinho
      setAddedToCart(true); // Atualiza o estado local
    } else {
      console.error('CartContext não está definido ou produto é nulo.');
    }
  };

  if (loading) {
    return <div className="text-center text-xl font-semibold">Carregando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{`Erro ao carregar produto: ${error}`}</div>;
  }

  if (!product) {
    return <div className="text-center">Produto não encontrado</div>;
  }

  return (
    <div className="flex justify-center items-center p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Imagem do Produto */}
          <div className="flex justify-center lg:w-1/2 mb-6 lg:mb-0">
            <img
              className="w-full h-96 object-cover rounded-lg shadow-lg"
              src={product.imageUrl}
              alt={product.name}
            />
          </div>

          {/* Detalhes do Produto */}
          <div className="lg:w-1/2 lg:ml-6">
            <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
            <p className="text-xl font-semibold text-green-500 mt-2">R$ {product.price.toFixed(2)}</p>
            <p className="text-gray-700 mt-4">{product.description}</p>
            <p className="text-gray-500 mt-2">Estoque: {product.stock}</p>

            {/* Botão de Adicionar ao Carrinho */}
            <button
              onClick={handleAddToCart}
              className={`mt-6 w-full py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 ${
                addedToCart ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              } ${product.stock > 0 ? '' : 'cursor-not-allowed opacity-60'}`}
              disabled={addedToCart || product.stock <= 0}
            >
              {addedToCart ? 'Produto Adicionado' : 'Adicionar ao Carrinho'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
