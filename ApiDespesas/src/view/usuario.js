const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/usuario');
const authConfig = require('../config/auth');

class UsuarioView {
    constructor() {}

    async register(req, res) {
        try {
            const { email, password, name } = req.body || {};

            if (!email || !password || !name) {
                return res.status(400).json({ error: 'Os campos email, password e name são obrigatórios' });
            }

            const existing = await userModel.getUserByEmail(email);

            if (existing) {
                return res.status(409).json({ error: 'Já existe um usuário com esse email' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userModel.createUser(email, hashedPassword, name);

            return res.status(201).json({
                id: user.id,
                email: user.email,
                name: user.name
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body || {};

            if (!email || !password) {
                return res.status(400).json({ error: 'Os campos email e password são obrigatórios' });
            }

            const user = await userModel.getUserByEmail(email);

            if (!user) {
                return res.status(401).json({ error: 'Email ou senha inválidos' });
            }

            const passwordMatches = await bcrypt.compare(password, user.password);

            if (!passwordMatches) {
                return res.status(401).json({ error: 'Email ou senha inválidos' });
            }

            const token = jwt.sign(
                { id: user.id, email: user.email },
                authConfig.jwt.secret,
                { expiresIn: authConfig.jwt.expiresIn }
            );

            return res.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UsuarioView();
