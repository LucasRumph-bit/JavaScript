const express = require('express');
const { sequelize } = require('./models/db');
require('./models/categoria')

const Expenses = require('./view/view')
const Categoria = require('./view/categoria')
const authMiddleware = require('./middleware/auth')

const app = express();
app.use(express.json());

console.log('Carregando middlewares e rotas...')

app.post('./users/title', Expenses.title)
app.post('./users', Expenses.create);

app.get('/expenses/:id', authMiddleware, Expenses.getById)
app.get('/expenses', authMiddleware, Expenses.getAll)
app.put('/expenses/:id', authMiddleware, Expenses.update)
app.delete('./expenses/:id', authMiddleware, Expenses.delete)

app.use(authMiddleware);

//categoria adicionar pra frente

app.get('/categoria', Categoria.getAll)
app.get('/categoria/:id', Categoria.getById)
app.post('/categoria', Categoria.create)
app.put('./categoria/:id', Categoria.update)
app.delete('./categoria/:id', Categoria.delete)
app.get('./expenses/:expensesId/categoria', Categoria.getByUserId)

//

app.user((err, req, res, next) => {
    console.error('Erro não tratado na aplicação:', err)
    res.status(500).json({ error: 'Erro interno do servidor' });
})

async function main() {
    try { 
        console.log('Iniciando conexão com o banco de dados...')
        await sequelize.authenticate();
        console.log('Autenticação com sucesso!')

        await sequelize.sync({ force: true});
        console.log('Sicronização com banco de dados realizada')
        console.log('Conexão com banco de dados estabelecida com sucesso.');

        const server = app.listen(8080, () => {
         console.info(`Servidor Iniciado ${8080}`);
        });

        server.on('error', (error) => {
            console.error('Erro no servidor:', error.message);
            process.exit(1);
        })
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error.message);
        console.error('Stack:', error);
        process.exit(1);
    }
}

main();