# Usando a imagem oficial do Node.js
FROM node:16-alpine

# Diretório de trabalho
WORKDIR /app

# Copiar os arquivos de dependências
COPY package.json package-lock.json ./

# Instalar dependências
RUN npm install

# Copiar os arquivos do projeto
COPY . .

# Compilar o TypeScript
RUN npm run build

# Expor a porta
EXPOSE 5000

# Iniciar o servidor
CMD ["npm", "start"]
