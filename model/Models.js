const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const individualSchema = new Schema({
    userId: String,
    username: String,
    mobileNo: String,
    password: String,
    email: String,
    expenses: [{
        category: String,
        product_name: String,
        product_amount: Number,
        description: String,
        date: String,
        created_on: Date,
    }],
    incomes: [{
        source: String,
        amount: Number,
        description: String,
        date: String,
        created_on: Date,
    }],
    groups: [{
        group_id: Number,
        group_name: String,
        transactions: [{
            id: String,
            amount: Number,
            payer: String,
        }],
    }],
});

const Individual = mongoose.model('Individual',individualSchema);

const ManagementShema = new Schema({
    username: String,
    mobileNo: String,
    password: String,
    email: String,
});

const Management = mongoose.model('Management',ManagementShema);

module.exports = {Individual,Management}