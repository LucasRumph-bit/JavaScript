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

    return res.status(201).json([expenses,{ links: [
        {rel: "GetALL", href: "/api/v1/expenses", method: "GET"},
        {rel: "GetById", href: "/api/v1/expenses/id", method: "GET"},
        {rel: "Update", href: "/api/v1/expenses/id", method: "PUT"},
        {rel: "Delete", href: "/api/v1/expenses/id", method: "DELETE"},
    ]}]);
    }
 
    getAll(req, res) {
    
        const expenses = Expenses.getAll(); 

    return res.status(200).json([expenses,{ links: [
        {rel: "somaTotalDespesas", href: "/api/v1/expenses/summary/total", method: "GET"},
    ]}]);
    }
 
    getById(req,res) {
        const id = Number(req.params.id)

        if (!id) {
            return res.status(400).json({erro: "Nenhum usuario com o ID solicitado."})
        }

        const expenses = Expenses.getById(id);
        
    return res.status(200).json([expenses,{ links: [
        {rel: "somaTotalDespesas", href: "/api/v1/expenses/summary/total", method: "GET"},
    ]}]);
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
    
    return res.status(200).json([expenses,{ links: [
        {rel: "GetALL", href: "/api/v1/expenses", method: "GET"},
        {rel: "GetById", href: "/api/v1/expenses/id", method: "GET"},
        {rel: "Create", href: "/api/v1/expenses", method: "POST"},
        {rel: "Delete", href: "/api/v1/expenses/id", method: "DELETE"},
    ]}]);
    }
 
    delete (req, res) {
        
        const {id} = req.params;
        Expenses.delete(Number(id));
    
    return res.status(204).json({ links: [
        {rel: "GetALL", href: "/api/v1/expenses", method: "GET"},
        {rel: "GetById", href: "/api/v1/expenses/id", method: "GET"},
    ]});
    }

    summaryTotal (req,res) {
        
        const expenses = Expenses.getAll();

        let totalAmount = 0;
        
        for (let index=0; index<expenses.length; index++) {
            totalAmount += expenses[index].amount;
        } 
        
    return res.status(200).json({ total: totalAmount , links: [
        {rel: "GetALL", href: "/api/v1/expenses", method: "GET"},
    ]})
    }
 
}

module.exports = new User();