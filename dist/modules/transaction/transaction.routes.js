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
const general_1 = require("../../middlewares/general");
const express = require("express");
const transaction_controller_1 = require("./transaction.controller");
const validator_1 = require(process.cwd()+"/dist/helpers/validator");
const routers = express.Router();
/**
 * Cria uma nova transação
 */
routers.post('/api/v1/transaction', general_1.checkSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camps = yield validator_1.default.campsValidator(req.body, {
            date: 'required|string',
            income: 'required|integer',
            outflow: 'required|integer',
            description: 'required|string',
        }, req.headers['lang']);
        if (camps.status === false)
            return res.status(200).json(camps);
        req.body = camps;
        return new transaction_controller_1.default(req, res).create();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
}));
/**
 * Atualiza uma transação
 */
routers.put('/api/v1/transaction/:transactionId', general_1.checkSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camps = yield validator_1.default.campsValidator(req.body, {
            date: 'required|string',
            income: 'required|integer',
            outflow: 'required|integer',
            description: 'required|string',
        }, req.headers['lang']);
        if (camps.status === false)
            return res.status(200).json(camps);
        req.body = camps;
        return new transaction_controller_1.default(req, res).update();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
}));
/**
 * Transações do usuário
 */
routers.get('/api/v1/transaction', general_1.checkSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camps = yield validator_1.default.campsValidator(req.query, {
            page: 'integer',
            limit: 'integer'
        }, req.headers['lang']);
        if (camps.status === false)
            return res.status(200).json(camps);
        return new transaction_controller_1.default(req, res).getUserTransactions();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
}));
/**
 * Transação
 */
routers.get('/api/v1/transaction/:transactionId', general_1.checkSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return new transaction_controller_1.default(req, res).getTransaction();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
}));
/**
 * Apagar transação
 */
routers.delete('/api/v1/transaction/:transactionId', general_1.checkSession, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return new transaction_controller_1.default(req, res).delete();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
}));
module.exports = routers;
//# sourceMappingURL=transaction.routes.js.map