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
const auth_controller_1 = require("./auth.controller");
const validator_1 = require("../../helpers/validator");
const general_1 = require(process.cwd()+"/dist/middlewares/general");
const routers = express.Router();
/**
 * Realiza o login
 */
routers.post('/api/v1/auth', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camps = yield validator_1.default.campsValidator(req.body, {
            login: 'required|string',
            password: 'required|string',
        });
        if (camps.status === false)
            return res.status(200).json(camps);
        req.body = camps;
        return new auth_controller_1.default(req, res).login();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
}));
/**
 * Dados do usuário
 */
routers.get('/api/v1/auth', general_1.checkSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return new auth_controller_1.default(req, res).getUserData();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
}));
module.exports = routers;
//# sourceMappingURL=auth.routes.js.map