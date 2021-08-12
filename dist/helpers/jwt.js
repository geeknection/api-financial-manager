"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTData = void 0;
const jwt_js_1 = require(process.cwd()+"/dist/services/jwt-js");
const JWTHelper = () => {
    const jwt = new jwt_js_1.default(process.env.SECRET_KEY, process.env.ISS);
    return jwt;
};
const JWTData = (req) => {
    const { status, data, message } = JWTHelper().data(req);
    if (!status)
        throw new Error(message);
    return data;
};
exports.JWTData = JWTData;
exports.default = JWTHelper;
//# sourceMappingURL=jwt.js.map