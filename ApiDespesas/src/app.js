const express = require('express');
const Expenses = require('./models/expense')
const app = express();

app.use(express.json());

app.post('/expenses', (req, res) => {
    const {title, amount, category, date, description} = req.body

    if (!title) {
        return res.status(400).json({erro:"O campo title é obrigatorio"});
    } 
    if (amount<=0) {
        return res.status(400).json({erro:"O campo amount deve ser maior que 0"});
    }
    if (new Date(date).getTime()>Date.now()) {
        return res.status(400).json({erro:"O campo date não pode ser no futuro"});
    }  

    const expenses = Expenses.create(title, amount, category, date, description);

    res.status(201).json(expenses);
})

app.get('/expenses', (req, res) => {
    const expenses = Expenses.getAll();

    res.status(200).json(expenses);
})

app.get('/expense/:id', (req, res) => {
    const expenses = Expenses.getById(Number(req.params.id));

    res.status(200).json(expenses);
})

app.put('/expense/:id', (req, res) => {
        const {title, amount, category, date, description} = req.body

    if (!title) {
        return res.status(400).json({erro:"O campo title é obrigatorio"});
    } 
    if (amount<=0) {
        return res.status(400).json({erro:"O campo amount deve ser maior que 0"});
    }
    if (new Date(date).getTime()>Date.now()) {
        return res.status(400).json({erro:"O campo date não pode ser no futuro"});
    }  

    const expenses = Expenses.update(Number(req.params.id), title, amount, category, date, description);

    res.status(201).json(expenses);
})

app.delete('/expense/:id', (req, res) => {
    Expenses.delete(Number(req.params.id));

    res.status(204).json();
})

app.get('/expense/summary/total', (req, res) => {
    console.log(Expenses.summaryTotal())
    res.status(200).json({totalAmount: Expenses.summaryTotal()});
})

app.listen(8080, () => {
    console.info(`Servidor Iniciado ${8080}`)
})