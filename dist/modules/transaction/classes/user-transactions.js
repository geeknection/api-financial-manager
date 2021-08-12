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
const transaction_model_1 = require("../transaction.model");
const mongodb_1 = require(process.cwd()+"/dist/services/mongodb");
const general_1 = require(process.cwd()+"/dist/helpers/general");
class UserTransactions {
    constructor(filters) {
        this.filters = filters;
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            const { selectedPage, limit } = this.filters;
            const userId = this.filters.userId;
            const recordsTotal = yield mongodb_1.default.Transactions.countDocuments({
                userId
            });
            const records = yield mongodb_1.default.Transactions.find({ userId }, [
                'id', 'date', 'income', 'outflow', 'description', 'userId'
            ]).skip(general_1.getSkipPagination(selectedPage, recordsTotal, limit)).limit(limit);
            const balance = yield transaction_model_1.default.getUserBalance(userId);
            //@todo - Não entendi se o pageSize e o pageNumber são baseado no padrão 50 do mongoose ou
            // se é baseado em um sistema de paginação que eu deveria criar, então eu criei uma paginação
            const pageSize = Math.ceil(recordsTotal / limit);
            return {
                balance: balance.length ? balance[0].output : 0,
                records: records.map(item => {
                    const date = new Date(item.date).toISOString();
                    item.date = date;
                    return item;
                }),
                recordsTotal,
                pageNumber: selectedPage,
                pageSize: pageSize
            };
        });
    }
    ;
}
exports.default = UserTransactions;
//# sourceMappingURL=user-transactions.js.map