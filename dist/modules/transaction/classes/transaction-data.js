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
const mongodb_1 = require(process.cwd()+"/dist/services/mongodb");
class TransactionData {
    constructor(id) {
        this.id = id;
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield mongodb_1.default.Transactions.findById(this.id, [
                'id', 'date', 'income', 'outflow', 'description', 'userId'
            ]);
            this.data = {
                id: response.id,
                date: new Date(response.date).toISOString(),
                income: response.income,
                outflow: response.outflow,
                description: response.description,
                userId: response.userId
            };
        });
    }
    ;
}
exports.default = TransactionData;
//# sourceMappingURL=transaction-data.js.map