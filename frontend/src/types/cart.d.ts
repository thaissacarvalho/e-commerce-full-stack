export interface CartItemPopulated {
  productId: Product; 
  quantity: number;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ICart {
  userId: string;
  items: CartItemPopulated[]; 
}
