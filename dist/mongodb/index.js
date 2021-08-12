"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_1 = require("./schemas/transaction");
const user_1 = require("./schemas/user");
var Schema;
(function (Schema) {
    Schema.Users = user_1.default;
    Schema.Transactions = transaction_1.default;
})(Schema || (Schema = {}));
exports.default = Schema;
//# sourceMappingURL=index.js.map