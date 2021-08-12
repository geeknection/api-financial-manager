import JWTHelper from 'app/helpers/jwt';
import translate from '../translate';

interface APIReturn {
    status: boolean,
    message: string
}

/**
 * Verifica se a sessão é válida
 * @param req 
 * @param res 
 * @returns void|object
 */
export const checkSession = (req: any, res: any, next: Function): APIReturn|void => {

    const lang = (req.params.lang || 'pt-BR').toLowerCase();

    const response = JWTHelper().checkJWT(req);
    if (!response.status) {
        return res.status(200).json({
            status: false,
            message: translate('invalid_session', lang)
        });
    }

    next();

}