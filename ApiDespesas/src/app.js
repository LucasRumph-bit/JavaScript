const express = require('express');
const Usercontroller = require('../src/controller/controller')
const app = express();

app.use(express.json());

app.post('/api/expenses', Usercontroller.create)

app.get('/api/expenses', Usercontroller.getAll)

app.get('/api/expenses/:id', Usercontroller.getById)

app.put('/api/expenses/:id', Usercontroller.update)

app.delete('/api/expenses/:id', Usercontroller.delete)

app.get('/api/expenses/summarytotal', Usercontroller.summaryTotal)

app.listen(8080, () => {
    console.info(`Servidor Iniciado ${8080}`)
})