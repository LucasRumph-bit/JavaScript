const express = require('express');
const authMiddleware = require('../middleware/auth')

const router = express.Router();
const Expenses = require('../view/view');
const Categoria = require('../view/categoria')
const Usuario = require('../view/usuario')

// rotas públicas — não passam por authMiddleware, pois é aqui que o token é obtido
router.post('/register', Usuario.register);
router.post('/login', Usuario.login);

router.post('/expenses', authMiddleware, Expenses.create);
router.get('/expenses', authMiddleware, Expenses.getAll)
router.get('/expenses/summary/total', authMiddleware, Expenses.summaryTotal)
router.get('/expenses/:id', authMiddleware, Expenses.getById)
router.put('/expenses/:id', authMiddleware, Expenses.update)
router.delete('/expenses/:id', authMiddleware, Expenses.delete)

router.get('/categoria', authMiddleware, Categoria.getAll)
router.get('/categoria/:id', authMiddleware, Categoria.getById)
router.post('/categoria', authMiddleware, Categoria.create)
router.put('/categoria/:id', authMiddleware, Categoria.update)
router.delete('/categoria/:id', authMiddleware, Categoria.delete)

module.exports = router;
