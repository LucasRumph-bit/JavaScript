const { sequelize } = require('./db')
const { DataTypes } = require('sequelize')

const Categoria = sequelize.define('categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            models: 'usuario',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
    
    async getCategoriaByUsuarioId(userid) {
        return await Categoria.findAll({ where: { userId }});
    }

    async createCategoria(userId, title, description) {
        return await Categoria.create({ userId, title, description });
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