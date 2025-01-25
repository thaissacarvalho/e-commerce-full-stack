# Use a imagem base oficial do Node.js
FROM node:23-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json tsconfig.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos do projeto para o contêiner
COPY ./src ./src
COPY ./tests ./tests
COPY .env .env

# Compila o código TypeScript para JavaScript
RUN npm run build

# Exponha a porta que o Express utiliza
EXPOSE 5000

# Define o comando para iniciar a aplicação
CMD ["npm", "run", "start"]
