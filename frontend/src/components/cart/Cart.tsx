import { useContext } from 'react';
import { CartContext } from '../../context/Cart';
import CartActions from './CartActions';
import { FiX } from 'react-icons/fi'; // Importando o ícone de 'X' do react-icons

const Cart = ({ closeCart }: { closeCart: () => void }) => {
  const { cartItems, removeFromCart } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => {
    const price = item.productId.price || 0;
    const quantity = item.quantity || 0;
    return acc + price * quantity;
  }, 0);

  return (
    <div className="fixed top-0 right-0 bg-white shadow-lg rounded-lg p-6 w-1/3 h-full max-w-md overflow-y-auto border-l-2 border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Carrinho de Compras</h3>
        <button
          onClick={() => closeCart()}
          className="text-gray-600 hover:text-gray-800"
        >
          <FiX size={24} />
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.productId._id} className="mb-4 flex justify-between items-center py-3 border-b border-gray-200">
              <div className="flex-1">
                <span className="text-lg font-medium text-gray-800">{item.productId?.name}</span>
                <p className="text-sm text-gray-500">Qtd: {item.quantity}</p>
              </div>
              <CartActions
                productId={item.productId._id}
                quantity={item.quantity}
                stock={item.productId.stock}
                onRemove={() => removeFromCart(item.productId._id)}
              />
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6 border-t pt-4">
        <strong className="text-xl text-gray-800">Total: <span className="text-gray-600">{total.toFixed(2)} R$</span></strong>
      </div>
    </div>
  );
};

export default Cart;
