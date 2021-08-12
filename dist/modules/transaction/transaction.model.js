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
const mongoose = require("mongoose");
var TransactionModel;
(function (TransactionModel) {
    TransactionModel.getUserBalance = (userId) => __awaiter(this, void 0, void 0, function* () {
        return yield mongodb_1.default.Transactions.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId)
                }
            },
            {
                $group: {
                    _id: null,
                    "income": {
                        $sum: "$income"
                    },
                    "outflow": {
                        $sum: "$outflow"
                    }
                },
            },
            {
                $project: {
                    "output": {
                        "$subtract": [
                            {
                                "$sum": "$income"
                            },
                            {
                                "$sum": "$outflow"
                            }
                        ]
                    }
                }
            }
        ]);
    });
})(TransactionModel || (TransactionModel = {}));
exports.default = TransactionModel;
//# sourceMappingURL=transaction.model.js.map