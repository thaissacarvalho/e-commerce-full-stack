import { Request, Response } from 'express';
import { CartController } from '../controllers/cart.controller';
import { CartService } from '../services/cart.service';
import { client } from '../config/redis.config';
import Cart from '../models/cart.model';

jest.mock('../services/cart.service'); 
jest.mock('redis', () => {
  const mockRedisClient = {
    on: jest.fn(),
    connect: jest.fn(),
    set: jest.fn(),
    get: jest.fn(),
    disconnect: jest.fn(),
  };
  return {
    createClient: jest.fn(() => mockRedisClient),
  };
});

describe('CartController', () => {
  let cartController: CartController;
  let mockCartService: jest.Mocked<CartService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    cartController = new CartController();
    mockCartService = new CartService() as jest.Mocked<CartService>;
    cartController['cartService'] = mockCartService; 

    mockRequest = {
      body: {},
      params: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterAll(async () => {
    await client.disconnect();
  });

  describe('createCart', () => {
    it('Should be create a cart and return status 201', async () => {
      const userId = '12345';
      const mockCart = { userId, items: [] };

      mockCartService.createCart.mockResolvedValueOnce(mockCart as any);
      mockRequest.body = { userId };

      await cartController.createCart(mockRequest as Request, mockResponse as Response);

      expect(mockCartService.createCart).toHaveBeenCalledWith(userId);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCart);
    });

    it('Should be return status 500 on error', async () => {
      mockCartService.createCart.mockRejectedValueOnce(new Error('Erro ao criar o carrinho'));

      await cartController.createCart(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao criar o carrinho' });
    });
  });

  describe('addItemToCart', () => {
    it('Should be add an item to cart and return status 200', async () => {
      const userId = '12345';
      const productId = '54321';
      const quantity = 2;
      const updatedCart = { userId, items: [{ productId, quantity }] };

      mockCartService.addToCart.mockResolvedValueOnce(updatedCart as any);
      mockRequest.body = { userId, productId, quantity };

      await cartController.addItemToCart(mockRequest as Request, mockResponse as Response);

      expect(mockCartService.addToCart).toHaveBeenCalledWith(userId, productId, quantity);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedCart);
    });

    it('Should return status 500 in case of error', async () => {
      mockCartService.addToCart.mockRejectedValueOnce(new Error('Erro ao adicionar item'));

      await cartController.addItemToCart(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao adicionar item' });
    });
  });

  describe('getCartById', () => {
    it('deve retornar um carrinho existente com status 200', async () => {
      const userId = '12345';
      const mockCart = { userId, items: [] };

      mockRequest.params = { id: userId };

      mockCartService.getCartByUserId.mockResolvedValueOnce(mockCart as any);

      await cartController.getCartByUserId(mockRequest as Request, mockResponse as Response);

      expect(mockCartService.getCartByUserId).toHaveBeenCalledWith(userId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCart);
    });

    it('deve retornar 404 caso o carrinho não seja encontrado', async () => {
      const userId = '12345';

      mockRequest.params = { id: userId };

      mockCartService.getCartByUserId.mockResolvedValueOnce(null);

      await cartController.getCartByUserId(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Cart not found' });
    });

    it('deve retornar status 500 em caso de erro', async () => {
      const userId = '12345';

      mockRequest.params = { id: userId };

      mockCartService.getCartByUserId.mockRejectedValueOnce(new Error('Erro ao buscar carrinho'));

      await cartController.getCartByUserId(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao buscar carrinho' });
    });
  });

  describe('getCart', () => {
    it('deve retornar o carrinho do usuário com status 200', async () => {
      const userId = '12345';
      const mockCart = { userId, items: [] };

      mockRequest.params = { userId }; 
      Cart.findOne = jest.fn().mockReturnValueOnce({
        populate: jest.fn().mockResolvedValueOnce(mockCart),
      });

      await cartController.getCart(mockRequest as Request, mockResponse as Response);

      expect(Cart.findOne).toHaveBeenCalledWith({ userId });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCart);
    });

    it('deve retornar 404 caso o carrinho não seja encontrado', async () => {
      const userId = '12345';

      mockRequest.params = { userId };
      Cart.findOne = jest.fn().mockReturnValueOnce({
        populate: jest.fn().mockResolvedValueOnce(null),
      });

      await cartController.getCart(mockRequest as Request, mockResponse as Response);

      expect(Cart.findOne).toHaveBeenCalledWith({ userId });
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Cart not found' });
    });

    it('deve retornar status 500 em caso de erro', async () => {
      const userId = '12345';

      mockRequest.params = { userId };
      Cart.findOne = jest.fn().mockImplementationOnce(() => {
        throw new Error('Erro ao buscar o carrinho');
      });

      await cartController.getCart(mockRequest as Request, mockResponse as Response);

      expect(Cart.findOne).toHaveBeenCalledWith({ userId });
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro ao buscar o carrinho' });
    });
  });

  describe('updateCartItem', () => {
    it('Must update the quantity of an item in the cart with status 200', async () => {
      const userId = '12345';
      const productId = '54321';
      const quantity = 3;
      const updatedCart = { userId, items: [{ productId, quantity }] };

      mockRequest.params = { userId, productId };
      mockRequest.body = { quantity };

      mockCartService.updateCartItemQuantity.mockResolvedValueOnce(updatedCart as any);

      await cartController.updateCartItem(mockRequest as Request, mockResponse as Response);

      expect(mockCartService.updateCartItemQuantity).toHaveBeenCalledWith(userId, productId, quantity);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(updatedCart);
    });

    it('Should return 404 if the cart or item is not found', async () => {
      const userId = '12345';
      const productId = '67890';
      const quantity = 2;
  
      mockRequest.params = { userId, productId };
      mockRequest.body = { quantity };
  
      mockCartService.updateCartItemQuantity.mockRejectedValueOnce(new Error('Item not found in cart'));
  
      await cartController.updateCartItem(mockRequest as Request, mockResponse as Response);
  
      expect(mockCartService.updateCartItemQuantity).toHaveBeenCalledWith(userId, productId, quantity);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith('Item not found in cart');
    });

    it('Should return status 500 on error', async () => {
      mockCartService.updateCartItemQuantity.mockRejectedValueOnce(new Error('Erro interno'));

      await cartController.updateCartItem(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro interno' });
    });
  });

  describe('removeFromCart', () => {
    it('Must remove an item from cart and return status 200', async () => {
      const userId = '12345';
      const productId = '54321';
      const updatedCart = { userId, items: [] };

      mockRequest.params = { id: userId };
      mockRequest.body = { productId };

      mockCartService.removeFromCart.mockResolvedValueOnce(updatedCart as any);

      await cartController.removeFromCart(mockRequest as Request, mockResponse as Response);

      expect(mockCartService.removeFromCart).toHaveBeenCalledWith(userId, productId);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Item deleted successfully' });
    });

    it('Should return 404 if the item is not found', async () => {
      const userId = '12345';
      const productId = '67890';
  
      mockRequest.params = { id: userId };
      mockRequest.body = { productId };
  
      mockCartService.removeFromCart.mockRejectedValueOnce(new Error('Item not found in cart'));
  
      await cartController.removeFromCart(mockRequest as Request, mockResponse as Response);
  
      expect(mockCartService.removeFromCart).toHaveBeenCalledWith(userId, productId);
      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Item not found in cart' });
    });

    it('Should return status 500 on error', async () => {
      mockCartService.removeFromCart.mockRejectedValueOnce(new Error('Erro interno'));

      await cartController.removeFromCart(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Erro interno' });
    });
  });
});