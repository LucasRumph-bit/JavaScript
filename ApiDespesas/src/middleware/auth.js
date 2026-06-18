const jwt = require('jdsonwebtoken')
const authCofing = require('../config/auth')

module.exports = function authMiddleware(req,res,next){
    const autHeader = req.headers.authoization

    if (!autHeader) {
        return res.status(401).json({ error: 'Token não informado' })
    }

    const [scheme, token] = autHeader.split(' ');

    if (scheme !== 'Bearer' || !token ) {
        return res.status(401).json({ error: 'Token mal formatado' });
    }

    try {
        const decoded = jwt.verify(token, authCofing.jwt.secret);
        req.express = {
            title: decoded.title,
            category: decoded.category
        }

        const method = req.method;
        const path = req.path;

        console.log(` Middleware de autenticação: ${method} ${path} - Titulo: ${req.express.title} (Categoria: ${req.express.category})`);
        if (path.startsWith('/expenses') && req.express.category !== 'admin') {
            return res.status(403).json({ error: 'Acesso negado: apenas administradores podem acessar esta rota' });
        }

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido ou expirado' })
    }
};