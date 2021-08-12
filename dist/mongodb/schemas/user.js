"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
const Users = new connection_1.default.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    }
}, {
    collection: 'Users'
});
const UsersSchema = connection_1.default.model('Users', Users, 'Users');
exports.default = UsersSchema;
//# sourceMappingURL=user.js.map