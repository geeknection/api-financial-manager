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
const translate_1 = require(process.cwd()+"/dist/translate");
const mongoose = require("mongoose");
class CreateTransaction {
    constructor(body, userId, lang) {
        this.body = body;
        this.userId = userId;
        this.lang = lang;
        this.validFields = () => {
            const { description, income, outflow } = this.body;
            if (description.trim().length < 1) {
                return {
                    status: false,
                    message: translate_1.default('validator.invalidDescription', this.lang)
                };
            }
            if (income < 0 || outflow < 0) {
                return {
                    status: false,
                    message: translate_1.default(`validator.invalid${income < 0 ? 'Income' : 'Outflow'}`, this.lang)
                };
            }
            return {
                status: true
            };
        };
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            const isValid = this.validFields();
            if (!isValid.status)
                return isValid;
            const response = yield mongodb_1.default.Transactions.create(Object.assign(Object.assign({}, this.body), { userId: mongoose.Types.ObjectId(this.userId), date: new Date(this.body.date) }));
            return {
                status: true,
                values: response.id
            };
        });
    }
    ;
}
exports.default = CreateTransaction;
//# sourceMappingURL=create-transaction.js.map