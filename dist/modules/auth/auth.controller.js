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
const CryptoJS = require("crypto-js");
const translate_1 = require(process.cwd()+"/dist/translate");
const jwt_1 = require(process.cwd()+"/dist/helpers/jwt");
const mongodb_1 = require(process.cwd()+"/dist/services/mongodb");
class AuthController {
    constructor(req, res) {
        this.login = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const getUser = yield mongodb_1.default.Users.findOne({
                    $or: [{
                            login: this.req.body.login,
                            password: CryptoJS.MD5(this.req.body.password).toString()
                        }, {
                            email: this.req.body.login,
                            password: CryptoJS.MD5(this.req.body.password).toString()
                        }]
                }, ['_id']);
                if (!(getUser === null || getUser === void 0 ? void 0 : getUser._id)) {
                    return this.res.status(200).json({
                        status: false,
                        message: translate_1.default('auth.userNotFoundInvalidCredentials', this.lang)
                    });
                }
                return this.res.status(200).json({
                    status: true,
                    values: jwt_1.default().register({
                        userId: getUser._id
                    })
                });
            }
            catch (error) {
                return this.res.status(422).json({
                    status: false,
                    message: error.message
                });
            }
        });
        this.getUserData = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = jwt_1.JWTData(this.req);
                const getUser = yield mongodb_1.default.Users.findById(userId, ['name']);
                return this.res.status(200).json({
                    status: true,
                    values: {
                        userId,
                        name: getUser.name
                    }
                });
            }
            catch (error) {
                return this.res.status(422).json({
                    status: false,
                    message: error.message
                });
            }
        });
        this.req = req;
        this.res = res;
        this.lang = (this.req.headers['lang'] || "pt-BR").toString().toLowerCase();
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map