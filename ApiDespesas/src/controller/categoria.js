const Usermodel = require('../models/usuario')
const CategoriaModel = require('../models/categoria');
const { getById } = require('./controller');

class Categoria {
    constructor() {}

    async getAll() {
        return await CategoriaModel.getAllCategoria();
    }

    async getById(id) {
        return await CategoriaModel.getCategoriaById();
    }

    async getByUsuarioId(userId) {
        return await CategoriaModel.getCategoriaByUsuarioId(userId);
    }

    async create(userId, title, description) {
        const user = await Usermodel.getByUsuarioId(userId)

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        if(!title || !description) {
            throw new Error('Todos os campos são obrigatorios')
        }

        return await CategoriaModel.createCategoria(userId, title, description)
    }

    async update(id, title, description) {
        if(!title || !description)  {
            throw new Error('Todos os campos são obrigatorios')
        }

        return await CategoriaModel.updateCategoria(id, title, description)
    }

    async delete(id){
        return await CategoriaModel.deleteCategoria(id)
    }
}

module.exports = new Categoria();