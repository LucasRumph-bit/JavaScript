const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const Express = sequelize.define('expenses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'categoria',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
})


class ExpressModel {

    constructor() {}

    async getAllUsers() {
        return await Express.findAll();
    }

    async createUser(categoriaId, title, amount, date, description) {
        return await Express.create({ categoriaId, title, amount, date, description });
    }

    async getUserById(id) {
        return await Express.findByPk(id);
    }

    async updateUser(id, title, amount, date, description) {
        const express = await this.getUserById(id);

        if (!express) {
            return null
        }

        express.title = title;
        express.amount = amount;
        express.date = date;
        express.description = description;

        await express.save()
        return express;

    }

    async deleteUser(id) {
        const express = await this.getUserById(id);

        if (!express) {
            return null
        }

        await express.destroy();
        return null;
    }

    async somaTotalDespesas() {
        const total = await Express.sum('amount');

        return total;
    }

}

const expressModel = new ExpressModel();
expressModel.Express = Express;

module.exports = expressModel;
