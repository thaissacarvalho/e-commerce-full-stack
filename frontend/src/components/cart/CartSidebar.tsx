type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartProps = {
  cartItems: CartItem[];
  updateQuantity: (id: number, quantity: number) => void;
};

const CartSidebar = ({ cartItems, updateQuantity }: CartProps) => {
  return (
    <div className="fixed left-0 top-0 bottom-0 bg-gray-800 bg-opacity-80 z-40 w-64 p-4">
      <h2 className="text-white text-xl mb-4">Carrinho</h2>
      <div className="text-white">
        {/* Exemplo de como você pode mapear os itens do carrinho */}
        <div className="flex justify-between mb-2">
          <span>Produto 1</span>
          <span>Quantidade: 2</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Produto 2</span>
          <span>Quantidade: 1</span>
        </div>
        {/* Adicionar mais itens do carrinho aqui */}
      </div>
    </div>
  );
};

export default CartSidebar;
