/*class Expenses {
    constructor() {
        this.expenses = [];
        this.idCounter = 1;
    }

    getAll() {
        return this.expenses;
    }

    getById(id) {
        return this.expenses.find(e => e.id === id);
    }

    create(title, amount, category, date, description) {
        const newExpense = {
            id: this.idCounter++,
            title,
            amount,
            category,
            date,
            description,
            createAt:Date.now()
        }
        this.expenses.push(newExpense);

        return newExpense;
    }

    update(id, title, amount, category, date, description) {
        const index = this.expenses.findIndex(e => e.id === id);

        if (index === -1) {
            return null
        }

        this.expenses[index] = {
            id: this.expenses[index].id,
            title,
            amount,
            category,
            date,
            description,
            createAt: this.expenses[index].createAt
        }

        return this.expenses[index];
    }

    delete(id) {
        const index = this.expenses.findIndex(e => e.id === id);

        if (index === -1) {
            return null
        }   

        this.expenses.splice(index, 1);

        return null;
    }

    summaryTotal() {
        let totalAmount = 0;
        for (let index=0; index<this.expenses.length; index++) {
            totalAmount += this.expenses[index].amount;
        }
        return totalAmount;
    } 
}*/

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