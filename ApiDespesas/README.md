Objetivo da API: Organização de despesas
Tecnologias Usadas: Node JS e Express JS

Como executar o projeto

npm install
npm start

servidor rodando em localhost:8080

GET|/expenses|Lista todas despesas,
GET|/expense/:id|Busca despesa por id,
POST|/expenses|Cria despesa,
PUT|/expense/:id|Atualiza despesa,
DELETE|/expense/:id|Remove despesa,
GET|/expenses/summary/total|Retorna o total de despesas(totalAmount).

    +------------------+
    |     EXPENSE      |
    +------------------+
    | id (PK)          |  Identificador unico
    | title            |  Titulo da despesa
    | amount           |  Valor da despesa
    | category         |  categoria da despesa
    | date             |  data da despesa
    | description      |  descrição da despesa
    | createdAt        |  data de criação da despesa
    +------------------+

Exemplo de requisição

Post localhost:8080/expenses

body:
{
  "title": "Supermercado",
  "amount": 150.50,
  "category": "Alimentação",
  "date": "2026-03-10",
  "description": "Compra semanal"
}

Put localhost:8080/expense/1

body:
{
  "title": "Komprao",
  "amount": 200,
  "category": "Alimentação",
  "date": "2026-03-07",
  "description": "Compra mensal"
}

get all localhost:8080/expenses

get por ID localhost:8080/expense/1

delete localhost:8080/expense/1

get summary total localhost:8080/expense/summary/total