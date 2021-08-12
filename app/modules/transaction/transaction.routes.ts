import { checkSession } from '../../middlewares/general';
import * as express from 'express';
import TransactionController from './transaction.controller';
import Validator from 'app/helpers/validator';

const routers = express.Router();

/**
 * Cria uma nova transação
 */
routers.post('/api/v1/transaction', checkSession, async (req, res) => {
    try {

        const camps = await Validator.campsValidator(req.body, {
            date: 'required|string',
            income: 'required|integer',
            outflow: 'required|integer',
            description: 'required|string',
        }, req.headers['lang']);
        if (camps.status === false) return res.status(200).json(camps);
        req.body = camps;

        return new TransactionController(req, res).create();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
});
/**
 * Atualiza uma transação
 */
routers.put('/api/v1/transaction/:transactionId', checkSession, async (req, res) => {
    try {

        const camps = await Validator.campsValidator(req.body, {
            date: 'required|string',
            income: 'required|integer',
            outflow: 'required|integer',
            description: 'required|string',
        }, req.headers['lang']);
        if (camps.status === false) return res.status(200).json(camps);
        req.body = camps;

        return new TransactionController(req, res).update();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
});
/**
 * Transações do usuário
 */
routers.get('/api/v1/transaction', checkSession, async (req, res) => {
    try {
        const camps = await Validator.campsValidator(req.query, {
            page: 'integer',
            limit: 'integer'
        }, req.headers['lang']);
        if (camps.status === false) return res.status(200).json(camps);

        return new TransactionController(req, res).getUserTransactions();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
});
/**
 * Transação
 */
routers.get('/api/v1/transaction/:transactionId', checkSession, async (req, res) => {
    try {
        return new TransactionController(req, res).getTransaction();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
});
/**
 * Apagar transação
 */
routers.delete('/api/v1/transaction/:transactionId', checkSession, async (req, res) => {
    try {
        return new TransactionController(req, res).delete();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
});
module.exports = routers;