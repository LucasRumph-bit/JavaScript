const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

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
            model: 'users',
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
});

class CategoriaModel {

    constructor() {}

    async getAllCategoria() {
        return await Categoria.findAll();
    }

    async getCategoriaById(id) {
        return await Categoria.findByPk(id);
    }

    async getCategoriaByUsuarioId(userId) {
        return await Categoria.findAll({ where: { userId } });
    }

    async createCategoria(userId, title, description) {
        return await Categoria.create({ userId, title, description });
    }

    async updateCategoria(id, title, description) {
        const categoria = await this.getCategoriaById(id);

        if (!categoria) {
            return null;
        }

        categoria.title = title;
        categoria.description = description;

        await categoria.save();
        return categoria;
    }

    async deleteCategoria(id) {
        const categoria = await this.getCategoriaById(id);

        if (!categoria) {
            return null;
        }

        await categoria.destroy();
        return null;
    }
}

const categoriaModel = new CategoriaModel();
categoriaModel.Categoria = Categoria;

module.exports = categoriaModel;