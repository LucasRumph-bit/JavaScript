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

    create(title, amount, date, category, description) {
        const newExpense = {
            id: this.idCounter++,
            title,
            amount,
            date,
            category,
            description,
            createAt:Date.now()
        }
        this.expenses.push(newExpense);

        return newExpense;
    }

    update(id, title, amount, date, category, description) {
        const index = this.expenses.findIndex(e => e.id === id);

        if (index === -1) {
            return null
        }

        this.expenses[index] = {
            id: this.expenses[index].id,
            title,
            amount,
            date,
            category,
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
        console.log("Teste")
        let totalAmount = 0;
        for (let index=0; index<this.expenses.length; index++) {
            totalAmount += this.expenses[index].amount;
        } console.log("teste1")
        return totalAmount;
    } 
}

module.exports = new Expenses();