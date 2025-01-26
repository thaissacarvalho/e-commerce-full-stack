import { useState } from 'react';

const Produtos = () => {
  const [cart, setCart] = useState<any[]>([]);

  const addToCart = (product: any) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const products = [
    { id: 1, name: 'Produto 1', price: 20 },
    { id: 2, name: 'Produto 2', price: 30 },
    { id: 3, name: 'Produto 3', price: 40 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="bg-gray-100 p-4 rounded-lg">
          <h3>{product.name}</h3>
          <p>{`R$ ${product.price.toFixed(2)}`}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-2 bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-600"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      ))}
    </div>
  );
};

export default Produtos;
