"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSession = void 0;
const jwt_1 = require(process.cwd()+"/dist/helpers/jwt");
const translate_1 = require("../translate");
/**
 * Verifica se a sessão é válida
 * @param req
 * @param res
 * @returns void|object
 */
const checkSession = (req, res, next) => {
    const lang = (req.params.lang || 'pt-BR').toLowerCase();
    const response = jwt_1.default().checkJWT(req);
    if (!response.status) {
        return res.status(200).json({
            status: false,
            message: translate_1.default('invalid_session', lang)
        });
    }
    next();
};
exports.checkSession = checkSession;
//# sourceMappingURL=general.js.map