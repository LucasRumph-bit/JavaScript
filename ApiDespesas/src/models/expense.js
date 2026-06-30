const { summaryTotal } = require('../controller/controller');
const { sequelize } = require('./db');
const { DataTypes } = require('sequelize');

const Express = sequelize.define('expenses', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type : DataTypes.FLOAT,
        allowNull: false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }, 
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    summaryTotal: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
})


class ExpressModel {
    
    constructor() {}

    async getAllUsers() {
        return await Express.findAll();
    }

    async createUser(title, amount, category, date, description) {
        return await Express.create({title, amount, category, date, description});
    }

    async getUserById(id) {
        return await Express.findByPk(id);
    }

    async updateUser(id, title, amount, category, date, description) {
        const express = await getUserById(id);

        if (!express) {
            return null
        }

        express.title = title;
        express.amount = amount;
        express.category = category;
        express.date = date;
        express.description = description;

        await express.save()
        return express;

    }

    async deleteUser(id) {
        const express = await getUserById(id);

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