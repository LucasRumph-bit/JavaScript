class Expenses {
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
}

module.exports = new Expenses();