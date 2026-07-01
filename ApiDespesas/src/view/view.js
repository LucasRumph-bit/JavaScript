const expressModel = require('../models/expense');

class ExpensesView {

    async getAll(req, res) {
        try {
            const expenses = await expressModel.getAllUsers();
            return res.status(200).json(expenses);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const id = Number(req.params.id);
            const expense = await expressModel.getUserById(id);

            if (!expense) {
                return res.status(404).json({ error: 'Despesa não encontrada' });
            }

            return res.status(200).json(expense);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const { categoriaId, title, amount, date, description } = req.body || {};

            if (!title) {
                return res.status(400).json({ error: 'O campo title é obrigatório' });
            }
            if (!categoriaId) {
                return res.status(400).json({ error: 'O campo categoriaId é obrigatório' });
            }
            if (!amount || amount <= 0) {
                return res.status(400).json({ error: 'O campo amount deve ser maior que 0' });
            }
            if (date && new Date(date).getTime() > Date.now()) {
                return res.status(400).json({ error: 'O campo date não pode ser no futuro' });
            }

            const expense = await expressModel.createUser(categoriaId, title, amount, date, description);
            return res.status(201).json(expense);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const id = Number(req.params.id);
            const { title, amount, date, description } = req.body || {};

            if (!title) {
                return res.status(400).json({ error: 'O campo title é obrigatório' });
            }
            if (!amount || amount <= 0) {
                return res.status(400).json({ error: 'O campo amount deve ser maior que 0' });
            }
            if (date && new Date(date).getTime() > Date.now()) {
                return res.status(400).json({ error: 'O campo date não pode ser no futuro' });
            }

            const expense = await expressModel.updateUser(id, title, amount, date, description);

            if (!expense) {
                return res.status(404).json({ error: 'Despesa não encontrada' });
            }

            return res.status(200).json(expense);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            await expressModel.deleteUser(id);
            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }

    async summaryTotal(req, res) {
        try {
            const total = await expressModel.somaTotalDespesas();
            return res.status(200).json({ total: total || 0 });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ExpensesView();
