import { useContext } from 'react';
import { CartContext } from '../../context/Cart';
import { FaTrash } from 'react-icons/fa'; // Ícone de lixeira

interface CartActionsProps {
  productId: string;
  quantity: number;
  stock: number;
  onRemove: () => void;
}

const CartActions = ({ productId, quantity, stock, onRemove }: CartActionsProps) => {
  const { updateCartItem } = useContext(CartContext);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) return;
    if (newQuantity > stock) {
      alert('Quantidade excede o estoque disponível');
      return;
    }
    updateCartItem(productId, newQuantity);
  };

  return (
    <div className="flex items-center justify-end">
      <button
        className="p-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
        onClick={() => handleQuantityChange(quantity - 1)}
      >
        -
      </button>
      <span className="mx-4 text-lg font-semibold text-blue-700">{quantity}</span> {/* Número da quantidade visível */}
      <button
        className="p-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
        onClick={() => handleQuantityChange(quantity + 1)}
      >
        +
      </button>
      <button
        className="ml-4 text-red-500 hover:text-red-600 transition duration-300"
        onClick={onRemove}
      >
        <FaTrash size={20} />
      </button>
    </div>
  );
};

export default CartActions;
