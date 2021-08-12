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
const express = require("express");
const validator_1 = require("../../helpers/validator");
const user_controller_1 = require("./user.controller");
const routers = express.Router();
/**
 * Cadastro de um usuário
 */
routers.post('/api/v1/user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camps = yield validator_1.default.campsValidator(req.body, {
            login: 'required|string',
            email: 'required|string',
            password: 'required|string|minLength:8',
            name: 'required|string',
            birthDate: 'required|string'
        }, req.headers['lang']);
        if (camps.status === false)
            return res.status(200).json(camps);
        req.body = camps;
        return new user_controller_1.default(req, res).createUser();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
}));
module.exports = routers;
//# sourceMappingURL=user.routes.js.map