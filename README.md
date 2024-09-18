# Estoque Loja API

Esta é uma API simples para gerenciar o estoque de uma loja, construída com Express e PouchDB.

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/Pvrodrigues10/CrudProdutos.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd <NOME_DO_DIRETORIO>
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```

## Uso

1. Inicie o servidor:
    ```bash
    node <nome do arquivo>
    ```
2. O servidor estará rodando na porta 3000.

## Endpoints

### Criar Produto

- **URL:** `/products`
- **Método:** `POST`
- **Descrição:** Cria um novo produto.
- **Body:**
    ```json
    {
        "name": "Nome do Produto",
        "price": 100,
        "stockQuantity": 10,
        "description": "Descrição do Produto",
        "category": "Categoria do Produto"
    }
    ```

### Listar Produtos

- **URL:** `/products`
- **Método:** `GET`
- **Descrição:** Lista todos os produtos com filtros opcionais.
- **Query Params:**
    - `category`: Filtra por categoria.
    - `minprice`: Filtra por preço mínimo.
    - `maxprice`: Filtra por preço máximo.
    - `limit`: Limita o número de resultados (padrão: 10).
    - `offset`: Deslocamento dos resultados (padrão: 0).

### Obter Produto por ID

- **URL:** `/products/:id`
- **Método:** `GET`
- **Descrição:** Obtém um produto pelo ID.

### Atualizar Produto

- **URL:** `/products/:id`
- **Método:** `PUT`
- **Descrição:** Atualiza um produto pelo ID.
- **Body:**
    ```json
    {
        "name": "Nome do Produto",
        "price": 100,
        "stockQuantity": 10,
        "description": "Descrição do Produto",
        "category": "Categoria do Produto"
    }
    ```

### Deletar Produto

- **URL:** `/products/:id`
- **Método:** `DELETE`
- **Descrição:** Deleta um produto pelo ID.

### Estrutura Banco de dados

- **Body**
  ```json
  {
      "name": "Nome do Produto",
      "price": 100,
      "stockQuantity": 10,
      "description": "Descrição do Produto",
      "category": "Categoria do Produto"
      "_id": ID do produto criado pelo própio BD
      "_rev":  ID de revisão criado pelo própio BD
  }

## Estrutura do Projeto

- `mainProgram/index.js`: Arquivo principal do servidor.
- `db/estoqueLoja`: Banco de dados PouchDB.

## Tecnologias Utilizadas

- Express
- PouchDB
