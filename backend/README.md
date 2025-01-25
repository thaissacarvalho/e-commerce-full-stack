# E-commerce Backend

Este projeto é a parte de back-end de uma aplicação de e-commerce. Ele permite a exibição de produtos, a interação com o carrinho de compras e a manipulação das quantidades dos itens. O back-end está estruturado usando Node.js com Express, MongoDB e Redis para caching. A documentação da API está disponível via Swagger.

### Tecnologias Utilizadas

- Node.js com Express para o back-end.
- MongoDB como banco de dados.
- Redis para caching.
- TypeScript para tipagem estática.
- Swagger para documentação da API.
- Jest para testes unitários.

### Funcionalidades

1. Listagem de Produtos: Exibe a lista de produtos disponíveis no e-commerce.
2. Carrinho de Compras: Permite adicionar produtos ao carrinho, ajustar quantidades e visualizar os itens selecionados.
3. Caching com Redis: Utiliza Redis para armazenar e melhorar a performance na exibição de produtos e carrinho.
4. Documentação da API: Utiliza Swagger para fornecer uma interface interativa da API.

### Como Rodar o Projeto

Comece dando um git clone na aplicação:

    https://github.com/thaissacarvalho/e-commerce-full-stack.git

#### Pré-requisitos

- Node.js (>= 18)
- MongoDB (local ou configurado na nuvem)
- Redis (local ou configurado na nuvem)

1. Instalação de Dependências

    ```bash
    npm install
    ```

2. Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis de ambiente:
    
    .env
    
    ```bash
    MONGODB_URI=mongodb://localhost:27017/ecommerce
    REDIS_HOST=link-here.redis-cloud.com
    REDIS_USER=default
    REDIS_PASSWORD=password-here
    JWT_SECRET=token_here
    PORT=5000
    ```

3. Rodando a Aplicação
Para rodar o projeto em modo de desenvolvimento, use o seguinte comando:

    ```bash
    npm run start
    // Esse comando compila o TypeScript e inicia o servidor.
    ```

4. Compilação e Build
Para compilar o código TypeScript, use o comando:

    ```bash
    npm build
    ```
    
5. Testes
Para rodar os testes, use:
    ```bash
    npm test
    ```
    
6. Docker
Se preferir rodar o projeto com Docker, utilize os seguintes comandos:

    Para construir a imgem Docker
    ```bash
    npm run docker:build
    ```
    
    Para rodar o container:
    ```bash
    npm run docker:up
    ```
7. Documentação da API
A documentação interativa da API está disponível via Swagger, acessível através do endpoint:

    ```bash
    http://localhost:${port}/api/v1/ecommerce/docs
    ```

### Estrutura de Pastas

    ecommerce/backend/
    ├── src/
    │   ├── config/             # Arquivos de configuração, como DB, Redis, etc.
    │   ├── controllers/        # Controladores para lidar com as rotas
    │   ├── models/             # Modelos do Mongoose
    │   ├── routes/             # Definição das rotas (endpoints)
    │   ├── services/           # Lógica de negócio e interações entre camadas
    │   ├── middlewares/        # Middlewares, como autenticação, validações, etc.
    │   ├── tests/              # Testes unitários, integração ou end-to-end
    │   └── index.ts            # Arquivo principal de configuração do app (Express)
    ├── .env                    # Variáveis de ambiente
    ├── .dockerignore           # Ignorando arquivos no docker
    ├── .gitignore              # Ignorando arquivos no git
    ├── Dockerfile              # Arquivo para build do Docker
    ├── docker-compose.yml      # Configuração do Docker Compose
    ├── package.json            # Dependências e scripts
    ├── tsconfig.json           # Configuração do TypeScript
    └── README.md               # Documentação do projeto

### Testes
Utilizamos o Jest para testes unitários. Os testes podem ser encontrados na pasta tests/ e podem ser executados com o comando:

    npm test

### Deploy
Este projeto pode ser implantado em qualquer plataforma que suporte Node.js, como Heroku, AWS, ou DigitalOcean. Certifique-se de configurar as variáveis de ambiente corretamente para o banco de dados MongoDB e Redis.

### Melhorias Futuras

1. Envio de E-mails: Em futuras versões, será implementado o envio de e-mails para usuários que abandonaram o carrinho de compras.
2. Segurança: Implementar autenticação JWT para proteger rotas sensíveis.
3. Criação da aba categoria para dividir.
4. Aba perfil do usuário. 

### Como Contribuir

1. Fork este repositório.
2. Crie uma branch para suas modificações (git checkout -b feature/nova-feature).
3. Faça suas alterações e adicione testes.
4. Envie um pull request detalhando as alterações.