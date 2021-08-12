import { checkSession } from '../../middlewares/general';
import * as express from 'express';
import Validator from '../../helpers/validator';
import UserController from './user.controller';

const routers = express.Router();

/**
 * Cadastro de um usuário
 */
routers.post('/api/v1/user', async (req, res) => {
    try {

        const camps = await Validator.campsValidator(req.body, {
            login: 'required|string',
            email: 'required|string',
            password: 'required|string|minLength:8',
            name: 'required|string',
            birthDate: 'required|string'
        }, req.headers['lang']);
        if (camps.status === false) return res.status(200).json(camps);
        req.body = camps;

        return new UserController(req, res).createUser();
    }
    catch (error) {
        return res.status(503).json({
            status: false,
            message: error.message || error
        });
    }
});
module.exports = routers;