# Arquitetura Back End

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
├── .dockerignore           # 
├── .gitignore              # 
├── Dockerfile              # Arquivo para build do Docker
├── docker-compose.yml      # Configuração do Docker Compose
├── package.json            # Dependências e scripts
├── tsconfig.json           # Configuração do TypeScript
└── README.md               # Documentação do projeto
