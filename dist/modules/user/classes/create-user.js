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
const validator_1 = require(process.cwd()+"/dist/helpers/validator");
const mongodb_1 = require(process.cwd()+"/dist/services/mongodb");
const translate_1 = require(process.cwd()+"/dist/translate");
const CryptoJs = require("crypto-js");
class CreateUser {
    constructor(data, lang) {
        this.data = data;
        this.lang = lang;
        this.validFields = () => {
            const { password, email, birthDate, name } = this.data;
            const isValidPass = validator_1.default.password(password, this.lang);
            if (!isValidPass.status)
                return isValidPass;
            const isValidEmail = validator_1.default.email(email, this.lang);
            if (!isValidEmail.status)
                return isValidEmail;
            if (name.split(' ').length < 2) {
                return {
                    status: false,
                    message: translate_1.default('validator.incompleteName', this.lang)
                };
            }
            const userYearsOld = new Date().getFullYear() - new Date(birthDate).getFullYear();
            if (userYearsOld < 18) {
                return {
                    status: false,
                    message: translate_1.default('validator.yearsOld', this.lang)
                };
            }
            return {
                status: true
            };
        };
        this.userExist = () => __awaiter(this, void 0, void 0, function* () {
            const userExist = yield mongodb_1.default.Users.findOne({
                $or: [{
                        login: this.data.login
                    }, {
                        email: this.data.email
                    }]
            }, ['_id', 'login', 'email']);
            if (userExist === null || userExist === void 0 ? void 0 : userExist._id) {
                const message = () => {
                    if (userExist.email === this.data.email) {
                        return translate_1.default('validator.emailExist', this.lang);
                    }
                    else {
                        return translate_1.default('validator.loginExist', this.lang);
                    }
                };
                return {
                    status: false,
                    message: message()
                };
            }
            return {
                status: true
            };
        });
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            const isValid = this.validFields();
            if (!isValid.status)
                return isValid;
            const exists = yield this.userExist();
            if (!exists.status)
                return exists;
            const birthDate = () => {
                let date = new Date(this.data.birthDate);
                date.setDate(date.getDate() + 1);
                return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
            };
            const create = yield mongodb_1.default.Users.create(Object.assign(Object.assign({}, this.data), { password: CryptoJs.MD5(this.data.password), birthDate: birthDate() }));
            if (!(create === null || create === void 0 ? void 0 : create._id)) {
                return {
                    status: false,
                    message: translate_1.default('cannotCreateUser', this.lang),
                    values: create
                };
            }
            return {
                status: true,
                values: create._id
            };
        });
    }
    ;
}
exports.default = CreateUser;
//# sourceMappingURL=create-user.js.map