import { Request, Response } from 'express';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';

jest.mock('../services/product.service');
jest.mock('redis', () => {
  const mockRedisClient = {
    connect: jest.fn(),
    disconnect: jest.fn(),
    on: jest.fn(),
  };

  return {
    createClient: jest.fn(() => mockRedisClient),
  };
});

describe('ProductController', () => {
  let productController: ProductController;
  let productServiceMock: jest.Mocked<ProductService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    productServiceMock = new ProductService() as jest.Mocked<ProductService>;
    productController = new ProductController();
    productController['productService'] = productServiceMock;

    req = {
      body: {},
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('addProduct', () => {
    it('should add a product successfully', async () => {
      req.body = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
        category: 'Test Category',
        imageUrl: 'test.jpg',
      };
    
      const mockProduct = {
        save: jest.fn().mockResolvedValueOnce(true),
      };
    
      productServiceMock.createProduct.mockResolvedValue(mockProduct as any);
    
      await productController.addProduct(req as Request, res as Response);
    
      expect(productServiceMock.createProduct).toHaveBeenCalledWith(
        'Test Product',
        'Test Description',
        100,
        10,
        'Test Category',
        'test.jpg'
      );
      expect(mockProduct.save).toHaveBeenCalled(); // Garantir que save foi chamado
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Product added successfully' });
    });    

    it('should handle errors when adding a product', async () => {
      req.body = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
        category: 'Test Category',
        imageUrl: 'test.jpg',
      };
    
      productServiceMock.createProduct.mockRejectedValueOnce(new Error('Error adding product'));
    
      await productController.addProduct(req as Request, res as Response);
    
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error adding product' });
    });    
  });

  describe('getProducts', () => {
    it('should return a list of products', async () => {
      const mockProducts = [{ name: 'Product 1' }, { name: 'Product 2' }];
      productServiceMock.getProducts.mockResolvedValue(mockProducts as any);

      await productController.getProducts(req as Request, res as Response);

      expect(productServiceMock.getProducts).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProducts);
    });

    it('should handle errors when fetching products', async () => {
      productServiceMock.getProducts.mockRejectedValueOnce(new Error('Error fetching products'));
    
      await productController.getProducts(req as Request, res as Response);
    
      expect(res.status).toHaveBeenCalledWith(500);
    
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching products' });
    });    
  });

  describe('getProductById', () => {
    it('should return a product by ID', async () => {
      req.params = { id: '123' };
      const mockProduct = { name: 'Product 1' };
      productServiceMock.getProductById.mockResolvedValue(mockProduct as any);

      await productController.getProductById(req as Request, res as Response);

      expect(productServiceMock.getProductById).toHaveBeenCalledWith('123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockProduct);
    });

    it('should return 400 if ID is missing', async () => {
      await productController.getProductById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'ID is required' });
    });

    it('should handle errors when fetching product by ID', async () => {
      req.params = { id: '123' };
      productServiceMock.getProductById.mockRejectedValue(new Error('Error fetching product'));

      await productController.getProductById(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching product' });
    });
  });

  describe('updateProduct', () => {
    it('should update a product successfully', async () => {
      req.params = { id: '123' };
      req.body = { name: 'Updated Product' };
      const updatedProduct = { name: 'Updated Product' };
      productServiceMock.updateProduct.mockResolvedValue(updatedProduct as any);

      await productController.updateProduct(req as Request, res as Response);

      expect(productServiceMock.updateProduct).toHaveBeenCalledWith('123', { name: 'Updated Product' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    });

    it('should handle errors when updating a product', async () => {
      req.params = { id: '123' };
      req.body = { name: 'Updated Product' };
      productServiceMock.updateProduct.mockRejectedValue(new Error('Error updating product'));

      await productController.updateProduct(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error updating product' });
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product successfully', async () => {
      // Mock do serviço
      productServiceMock.deleteProduct.mockResolvedValueOnce(true);
    
      // Configuração do request
      req.params = { id: '123' };
    
      // Chama o método do controller
      await productController.deleteProduct(req as Request, res as Response);
    
      // Verifica se o método do serviço foi chamado com o ID correto
      expect(productServiceMock.deleteProduct).toHaveBeenCalledWith('123');
    
      // Verifica se res.status(200) foi chamado
      expect(res.status).toHaveBeenCalledWith(200);
    
      // Verifica se res.json foi chamado com a mensagem correta
      expect(res.json).toHaveBeenCalledWith({ message: 'Product deleted successfully' });
    });    

    it('should handle errors when deleting a product', async () => {
      req.params = { id: '123' };
      productServiceMock.deleteProduct.mockRejectedValue(new Error('Error deleting product'));

      await productController.deleteProduct(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Error deleting product' });
    });
  });
});
