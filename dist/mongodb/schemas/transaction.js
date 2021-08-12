"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
const mongoose = require("mongoose");
const Transaction = new connection_1.default.Schema({
    date: {
        type: Date,
        required: true
    },
    income: {
        type: Number,
        required: true,
        default: 0
    },
    outflow: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {
    collection: 'Transactions'
});
const TransactionsSchema = connection_1.default.model('Transactions', Transaction, 'Transactions');
exports.default = TransactionsSchema;
//# sourceMappingURL=transaction.js.map