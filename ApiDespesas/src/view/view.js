const Usermodel = require("../controller/controller")
class User {

    getAll(req, res) {
        const getAll = Usermodel.getAll();
        return res.json(getAll)
    }

    getById(req,res) {
        const id = req.params.id;
        const getById = Usermodel.getById(id);
        return res.json(getById)
    }

    create(req,res) {
        const {title, amount, category, date, description} = req.body
        const create = Usermodel.create(title, amount, category, date, description);
        return res,json(create)
    }

    update(req,res) {
        const {id, title, amount, category, date, description} = req.body
        const update = Usermodel.update(id, title, amount, category, date, description);
        return res.json(update)
    }

    delete(req,res) {
        const id = req.params.id;
        const deletar = Usermodel.delete(id)
        return res.json(deletar)
    }

    summaryTotal(req,res) {
        const expenses = Usermodel.getAll();

        let totalAmount = 0;
        
        for (let index=0; index<expenses.length; index++) {
            totalAmount += expenses[index].amount;
        } 
        
        return res.json({ total: totalAmount });
    } 
}


module.exports = new User();