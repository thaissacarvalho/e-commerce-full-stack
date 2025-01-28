# Desafio E-commerce

Bem-vindo ao repositório do projeto de e-commerce! Este repositório é uma aplicação de e-commerce simulada, construída com a intenção de demonstrar uma experiência de compra online funcional, com foco em tecnologias modernas e boas práticas de desenvolvimento.

## Descrição do Projeto

Este projeto consiste em uma aplicação de e-commerce com as seguintes funcionalidades principais:

- **Listagem de Produtos**: Exibição dos produtos disponíveis com detalhes como nome, preço e descrição.
- **Carrinho de Compras**: Adição de produtos ao carrinho, com a capacidade de ajustar a quantidade de cada item e visualizar os itens selecionados.
- **Interface Responsiva**: A aplicação é responsiva, garantindo uma boa experiência de navegação em dispositivos móveis e desktops.
- **Cache com Redis**: Utilização do Redis para armazenar e recuperar informações de forma rápida, otimizando o desempenho da aplicação.
- **Possibilidade de Funcionalidades Futuras**: O cliente planeja adicionar funcionalidades como o envio de e-mails para usuários que abandonaram o carrinho.

### Tecnologias Utilizadas

- **Backend**: Node.js, Express, MongoDB, Redis.
- **Frontend**: React, TailwindCSS e Axios.
- **Testes**: Jest
- **DevOps**: Docker

## Estrutura do Repositório

Este repositório está dividido em várias pastas, cada uma representando um componente da aplicação. Cada uma das pastas contém seu próprio `README.md` com instruções e informações detalhadas sobre como rodar, testar e implementar as funcionalidades específicas de cada parte do projeto.

As principais pastas incluem:

- **frontend**: Contém o código-fonte do aplicativo React.
- **backend**: Contém o código-fonte do servidor Node.js.
- **docker**: Contém arquivos de configuração do Docker para facilitar o deploy e o gerenciamento da aplicação.
- **tests**: Contém os testes unitários e de integração.
  
Cada uma dessas pastas tem seu próprio arquivo `README.md` explicando os passos necessários para rodar, testar e implementar as funcionalidades específicas da parte do projeto.

## Funcionalidades

### 1. **Listagem de Produtos**
A aplicação permite que os usuários visualizem todos os produtos disponíveis, com a opção de adicionar produtos ao carrinho.

### 2. **Carrinho de Compras**
O carrinho de compras pode ser visualizado e ajustado, permitindo ao usuário alterar as quantidades dos itens. 

### 3. **Cache com Redis**
Para otimizar o desempenho, utilizamos o Redis como um cache para armazenar os produtos e o estado do carrinho, reduzindo o tempo de resposta e melhorando a performance da aplicação.

### 4. **Funcionalidade Futura**
Uma das funcionalidades planejadas para o futuro é a implementação de um sistema de e-mail, que notificará os usuários que abandonaram o carrinho de compras sem finalizar a compra.

## Contribuições

Este projeto é um esforço contínuo e qualquer contribuição é bem-vinda! Caso queira colaborar, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

## Contato

Para quaisquer dúvidas ou questões sobre o projeto, entre em contato pelo e-mail: thaissa.dos2003@outlook.com

---

**Nota:** Para mais detalhes sobre como executar cada parte do projeto, consulte os arquivos `README.md` nas respectivas pastas (`frontend`, `backend`, etc.).