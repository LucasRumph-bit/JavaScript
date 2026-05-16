const express = require('express');
const Usercontroller = require('../src/controller/controller')
const { sequelize } = require('./models/db');
const app = express();

app.use(express.json());

app.post('/v1/api/expenses', Usercontroller.create)

app.get('/v1/api/expenses', Usercontroller.getAll)

app.get('/v1/api/expenses/:id', Usercontroller.getById)

app.put('/v1/api/expenses/:id', Usercontroller.update)

app.delete('/v1/api/expenses/:id', Usercontroller.delete)

app.get('/v1/api/expenses/summarytotal', Usercontroller.summaryTotal)

async function main() {
    try { 
        await sequelize.authenticate();
        await sequelize.sync({ alter: true});
        console.log('Conexão com banco de dados estabelecida com sucesso.');
        app.listen(8080, () => {
         console.info(`Servidor Iniciado ${8080}`);
        });
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }

}

main();