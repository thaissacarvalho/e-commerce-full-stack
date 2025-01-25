import { Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';

jest.mock('../services/auth.service');

describe('AuthController', () => {
  let authController: AuthController;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockAuthService = new AuthService() as jest.Mocked<AuthService>;
    authController = new AuthController();
    (authController as any).authService = mockAuthService;

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return 400 if email or password is missing', async () => {
    mockRequest.body = {};

    await authController.login(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Email and password are required' });
  });

  it('should return 200 and token if login is successful', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const token = 'mockToken';

    mockRequest.body = { email, password };
    mockAuthService.login.mockResolvedValue(token);

    await authController.login(mockRequest as Request, mockResponse as Response);

    expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ token });
  });

  it('should return 401 if email or password is invalid', async () => {
    const email = 'test@example.com';
    const password = 'wrongpassword';

    mockRequest.body = { email, password };
    mockAuthService.login.mockRejectedValue(new Error('Invalid password'));

    await authController.login(mockRequest as Request, mockResponse as Response);

    expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid email or password' });
  });

  it('should return 500 for unexpected errors', async () => {
    const email = 'test@example.com';
    const password = 'password123';

    mockRequest.body = { email, password };
    mockAuthService.login.mockRejectedValue(new Error('Unexpected error'));

    await authController.login(mockRequest as Request, mockResponse as Response);

    expect(mockAuthService.login).toHaveBeenCalledWith(email, password);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Unexpected error' });
  });
});
