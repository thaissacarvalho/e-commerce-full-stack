import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT;

export const swaggerOptions = {
  swaggerDefinition: {
    myapi: '1.0.0',
    info: {
      title: 'E-commerce',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: `http://localhost:${port}/api/v1/ecommerce/docs`,
      },
    ],
  },
  apis: ['./routes/*.ts'], 
};