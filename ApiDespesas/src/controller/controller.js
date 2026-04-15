const Expenses = require('../models/expense')
class User {
 
    create(req,res) {
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
 
    return res.json(expenses);
    }
 
    getAll(req, res) {
    const expenses = Expenses.getAll();
    return res.json(expenses);
    }
 
    getById(req,res) {
    const expenses = Expenses.getById(Number(req.params.id));
 
    return res.json(expenses);
    }
 
    update (req, res) {
        const {id, title, amount, category, date, description} = req.body
 
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
 
    return res.json(expenses);
    }
 
    delete (req, res) {
        const {id} = req.params;
        Expenses.delete(Number(id));
        return res.json()
    }

    summaryTotal (req,res) {
        const expenses = Expenses.getAll();

        let totalAmount = 0;
        
        for (let index=0; index<expenses.length; index++) {
            totalAmount += expenses[index].amount;
        } 
        
        return res.json({ total: totalAmount });
    }
 
}

module.exports = new User();