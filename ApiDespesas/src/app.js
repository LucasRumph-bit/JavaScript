const express = require('express');
const Usercontroller = require('../src/controller/controller')
const app = express();

app.use(express.json());

app.post('/expenses', Usercontroller.create)

app.get('/expenses', Usercontroller.getAll)

app.get('/expenses/:id', Usercontroller.getById)

app.put('/expenses/:id', Usercontroller.update)

app.delete('/expenses/:id', Usercontroller.delete)

app.get('/expenses/summary/total', Usercontroller.summaryTotal)

app.listen(8080, () => {
    console.info(`Servidor Iniciado ${8080}`)
})