const express = require('express');
const { sequelize } = require('./models/db');
require('./models/categoria')
const router = require('./router/user.js')

const Expenses = require('./view/view')
const Categoria = require('./view/categoria')
const authMiddleware = require('./middleware/auth')

const app = express();
app.use(express.json());

console.log('Carregando middlewares e rotas...')

app.post('./users/title', Expenses.title)

app.use(router)

app.use(authMiddleware);

//categoria adicionar pra frente

app.use(router);

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