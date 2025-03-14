# E-Commerce Frontend

Este repositório contém o código do frontend de um projeto de e-commerce, desenvolvido com React. A aplicação permite a visualização de produtos, interação com o carrinho de compras e a gestão de quantidades. A interface é responsiva e otimizada para uma boa experiência do usuário.

#### Arquitetura do Projeto
A estrutura do projeto segue a arquitetura modularizada com base nas funcionalidades principais da aplicação. Aqui está uma visão geral da estrutura de diretórios:

```
src/
├── components/
│   ├── cart/
│   │   ├── Cart.tsx
│   │   └── CartActions.tsx
│   ├── header/
│   │   └── Header.tsx
│   └── product/
│       ├── Product.tsx
│       └── ProductCard.tsx
├── context/
│   └── Cart.tsx
├── pages/
│   ├── Login.tsx
│   └── ProductDetail.tsx
├── services/
│   ├── api.ts
│   ├── auth.ts
│   ├── cart.ts
│   ├── product.ts
│   └── user.ts
├── types/
│   ├── product.d.ts
│   ├── cart.d.ts
│   └── user.d.ts
├── App.tsx
└── index.tsx
```

## Tecnologias

- **React**: Biblioteca para construir interfaces de usuário.
- **Vite**: Ferramenta de build rápida e moderna.
- **Tailwind CSS**: Framework de estilização utilitário.
- **TypeScript**: Para garantir tipagem estática.

#### Como Rodar o Projeto

##### 1. Clonar o repositório
Clone este repositório para a sua máquina local:

```bash
git clone https://github.com/thaissacarvalho/e-commerce-full-stack.git
cd frontend
```

##### 2. Instalar dependências
Instale as dependências do projeto utilizando o NPM ou Yarn:

```bash
npm install
```

##### 3. Rodar o projeto em ambiente de desenvolvimento
Para rodar o projeto em modo de desenvolvimento, use o comando:

```bash
npm run dev
```

Isso iniciará a aplicação em http://localhost:5173/

#### Estrutura do Código

- Components: Contém os componentes reutilizáveis da aplicação, como os produtos e o carrinho de compras.

- Context: Armazena o estado global do carrinho de compras, utilizando o Context API do React.

- Pages: Contém as páginas principais da aplicação, como Login e a página de detalhes do produto.

- Services: Contém os serviços responsáveis pela comunicação com a API, incluindo a autenticação e manipulação de dados de produtos e carrinho.

- Types: Define as interfaces de tipos para garantir que os dados manipulados na aplicação sigam um padrão.

#### Funcionalidades
- Listagem de Produtos: Exibe os produtos disponíveis no e-commerce.
- Carrinho de Compras: Permite adicionar produtos ao carrinho, ajustar quantidades e visualizar o total.
- Login: Página simples de login para simular um sistema de autenticação.
- Detalhes do Produto: Exibe informações detalhadas sobre um produto selecionado.

#### Melhorias Futuras
- Implementar a funcionalidade de envio de e-mails para usuários que abandonaram o carrinho.
- Adicionar funcionalidades de pagamento e finalização de compra.
Deploy
- Dashboard para adicionar, editar e remover produto.
- Aba login

#### Observações
- **Armazenamento de Estado**: O arquivo `Cart.tsx` dentro de `context/` gerencia o estado global do carrinho de compras, utilizando o **React Context API** para compartilhar dados entre os componentes.
- **Responsividade**: Como solicitado, o layout da aplicação será desenvolvido de forma responsiva usando **TailwindCSS**, permitindo uma boa experiência de uso em dispositivos móveis e desktop.

#### Contribuição
Contribuições são bem-vindas! Se você tiver sugestões ou melhorias, fique à vontade para abrir um pull request.

Feito com 💻 por Thaissa Carvalho