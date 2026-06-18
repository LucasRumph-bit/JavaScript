const expressModel = require('./expense')
const CategoriaModel = require('./categoria')

const Expenses = expressModel.Expenses;
const Categoria = CategoriaModel.Categoria;

Expenses.hasmany(Categoria, {
    foreingKey: 'id'
})