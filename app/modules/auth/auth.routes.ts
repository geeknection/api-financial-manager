import * as express from 'express';
import AuthController from './auth.controller';
import Validator from '../../helpers/validator';
import { checkSession } from 'app/middlewares/general';

const routers = express.Router();

/**
 * Realiza o login
 */
routers.post('/api/v1/auth', async (req, res) => {
    try {

        const camps = await Validator.campsValidator(req.body, {
            login: 'required|string',
            password: 'required|string',
        });
        if (camps.status === false) return res.status(200).json(camps);
        req.body = camps;

        return new AuthController(req, res).login();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
});
/**
 * Dados do usuário
 */
routers.get('/api/v1/auth', checkSession, async (req, res) => {
    try {
        return new AuthController(req, res).getUserData();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
});
module.exports = routers;