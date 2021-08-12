"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require(process.cwd()+"/dist/helpers/jwt");
const mongodb_1 = require(process.cwd()+"/dist/services/mongodb");
const create_transaction_1 = require("./classes/create-transaction");
const transaction_data_1 = require("./classes/transaction-data");
const update_transaction_1 = require("./classes/update-transaction");
const user_transactions_1 = require("./classes/user-transactions");
const mongoose = require("mongoose");
const redis_1 = require(process.cwd()+"/dist/services/mongodb/redis");
class TransactionController {
    constructor(req, res) {
        this.create = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = jwt_1.JWTData(this.req);
                const create = new create_transaction_1.default(this.req.body, userId, this.lang);
                const response = yield create.init();
                if (!response.status) {
                    return this.res.status(200).json({
                        status: false,
                        message: response.message
                    });
                }
                const transaction = new transaction_data_1.default(response.values);
                yield transaction.init();
                return this.res.status(200).json({
                    status: true,
                    values: transaction.data
                });
            }
            catch (error) {
                return this.res.status(422).json({
                    status: false,
                    message: error.message
                });
            }
        });
        this.update = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = jwt_1.JWTData(this.req);
                const create = new update_transaction_1.default(this.req.params.transactionId, this.req.body, userId, this.lang);
                const response = yield create.init();
                if (!response.status) {
                    return this.res.status(200).json({
                        status: false,
                        message: response.message
                    });
                }
                const transaction = new transaction_data_1.default(response.values);
                yield transaction.init();
                return this.res.status(200).json({
                    status: true,
                    values: transaction.data
                });
            }
            catch (error) {
                return this.res.status(422).json({
                    status: false,
                    message: error.message
                });
            }
        });
        this.getUserTransactions = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = jwt_1.JWTData(this.req);
                const { page } = this.req.query;
                const selectedPage = page ? parseInt(page.toString()) : 0;
                const limit = this.req.query.limit ? parseInt(this.req.query.limit.toString()) : 20;
                const cached = yield redis_1.getRedisCache('getUserTransactions');
                const isSameRequest = () => {
                    return cached.page === page && cached.limit === limit;
                };
                if (cached && isSameRequest()) {
                    return this.res.status(200).json({
                        status: true,
                        values: cached.data,
                        message: 'Data Cached'
                    });
                }
                const transactions = new user_transactions_1.default({
                    userId,
                    selectedPage,
                    limit
                });
                const response = yield transactions.init();
                redis_1.setRedisCache({
                    data: {
                        data: response,
                        page,
                        limit
                    },
                    expireSeconds: 20,
                    name: 'getUserTransactions'
                });
                return this.res.status(200).json({
                    status: true,
                    values: response
                });
            }
            catch (error) {
                return this.res.status(422).json({
                    status: false,
                    message: error.message
                });
            }
        });
        this.getTransaction = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { transactionId } = this.req.params;
                const transaction = new transaction_data_1.default(transactionId);
                yield transaction.init();
                return this.res.status(200).json({
                    status: true,
                    values: transaction.data
                });
            }
            catch (error) {
                return this.res.status(422).json({
                    status: false,
                    message: error.message
                });
            }
        });
        this.delete = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = jwt_1.JWTData(this.req);
                const { transactionId } = this.req.params;
                const response = yield mongodb_1.default.Transactions.deleteOne({
                    _id: mongoose.Types.ObjectId(transactionId),
                    userId: userId
                });
                return this.res.status(200).json({
                    status: response ? !!response.deletedCount : false
                });
            }
            catch (error) {
                return this.res.status(422).json({
                    status: false,
                    message: error.message
                });
            }
        });
        this.req = req;
        this.res = res;
        this.lang = (this.req.headers['lang'] || "pt-BR").toString().toLowerCase();
    }
}
exports.default = TransactionController;
//# sourceMappingURL=transaction.controller.js.map