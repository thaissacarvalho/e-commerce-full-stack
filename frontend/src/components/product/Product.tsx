import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../../services/product';
import { Product } from '../../types/product';
import ProductCard from './ProductCard';
import { AxiosError } from 'axios';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err.response?.data?.message || 'Erro ao carregar produtos');
        } else {
          setError('Erro desconhecido');
        }
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar produtos: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Produtos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}/>
        ))}
      </div>
    </div>
  );
};

export default Products;
