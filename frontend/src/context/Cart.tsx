import { createContext, useState, ReactNode } from 'react';

interface CartItem {
  productId: any; // Tipar de acordo com o seu modelo
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any) => void; // Tipar o produto corretamente
  updateCartItem: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void; // Função para remover um item
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: any) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.productId._id === product._id);
      if (itemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      }
      return [...prevItems, { productId: product, quantity: 1 }];
    });
  };

  const updateCartItem = (productId: string, quantity: number) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.productId._id === productId ? { ...item, quantity } : item
      );
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.productId._id !== productId);
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateCartItem, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};