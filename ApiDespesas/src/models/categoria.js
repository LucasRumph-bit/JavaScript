const { sequelize } = require('./db')
const { DataTypes } = require('sequelize')

const Categoria = sequelize.define('categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

class CategoriaModel {
    constructor() {}

    async getAllCategoria() {
        return await Categoria.findAll();
    }

    async getCategoriaById(id) {
        return await Categoria.findByPk(id);
    }

    async createCategoria(id, title, description) {
        return await Categoria.create({ id, title, description });
    }

    async updateCategoria(id, title, description) {
        const categoria = await this.getCategoriaById(id);

        if(!categoria) {
            return null
        }

        categoria.id = id;
        categoria.title = title
        categoria.description = description

        await categoria.save()
        return categoria
    }

    async deleteCategoria(id) {
        const categoria = await this.getCategoriaById(id)

        if (!categoria) {
            return false
        }

        await categoria.destroy()
            return true
    }
}

const categoriaModel = new CategoriaModel();
CategoriaModel.Categoria = Categoria;

module.exports = categoriaModel;