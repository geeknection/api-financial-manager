import MongoConnection from "../connection";
import mongoose = require('mongoose');

export interface SchemaTransactionData {
    date: Date;
    income: number;
    outflow: number;
    description: string;
    userId: string;
}

const Transaction = new MongoConnection.Schema<SchemaTransactionData>({
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

const TransactionsSchema = MongoConnection.model<SchemaTransactionData>('Transactions', Transaction, 'Transactions');

export default TransactionsSchema;