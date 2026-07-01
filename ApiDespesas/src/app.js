const express = require('express');
const { sequelize } = require('./models/db');
require('./models/categoria');
require('./models/usuario');
require('./models/expense');
require('./models/associations'); // precisa vir depois dos models, pra registrar os relacionamentos

const router = require('./router/user.js')

const app = express();
app.use(express.json());

console.log('Carregando middlewares e rotas...')

app.use(router)

//categoria adicionar pra frente

app.use((err, req, res, next) => {
    console.error('Erro não tratado na aplicação:', err)
    res.status(500).json({ error: 'Erro interno do servidor' });
})

async function main() {
    try {
        console.log('Iniciando conexão com o banco de dados...')
        await sequelize.authenticate();
        console.log('Autenticação com sucesso!')

        await sequelize.sync({ force: true });
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
