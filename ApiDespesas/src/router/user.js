const express = require('express');
const authMiddleware = require('../middleware/auth')

const router = express.router();
const Expenses = require('../view/view');
const Categoria = require('../view/categoria')


router.post('./users', Expenses.create);
router.get('/expenses/:id', authMiddleware, Expenses.getById)
router.get('/expenses', authMiddleware, Expenses.getAll)
router.put('/expenses/:id', authMiddleware, Expenses.update)
router.delete('./expenses/:id', authMiddleware, Expenses.delete)

router.get('/categoria', Categoria.getAll)
router.get('/categoria/:id', Categoria.getById)
router.post('/categoria', Categoria.create)
router.put('./categoria/:id', Categoria.update)
router.delete('./categoria/:id', Categoria.delete)
router.get('./expenses/:expensesId/categoria', Categoria.getByUserId)

module.exports = router;
