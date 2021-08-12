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
const InputValidator = require("node-input-validator");
const translate_1 = require("../translate");
var Validator;
(function (Validator) {
    Validator.password = (value, lang = 'pt-br') => {
        if (!(/(.*)?[A-Z](.*)?$/.test(value))) {
            return {
                status: false,
                message: translate_1.default('validator.password.requireUpperCase', lang)
            };
        }
        else if (!(/(.*)?[a-z](.*)?$/.test(value))) {
            return {
                status: false,
                message: translate_1.default('validator.password.requireLowerCase', lang)
            };
        }
        else if (!(/(.*)?[0-9](.*)?$/.test(value))) {
            return {
                status: false,
                message: translate_1.default('validator.password.requireANumber', lang)
            };
        }
        else if (!(/(?=.*[@!#$%^&*()/\\])[@!#$%^&*()]$/.test(value))) {
            return {
                status: false,
                message: translate_1.default('validator.password.requireSpecialChar', lang)
            };
        }
        return {
            status: true
        };
    };
    Validator.email = (value, lang = 'pt-br') => {
        if (/^[a-z0-9](\.)?[a-z0-9]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/.test(value)) {
            return {
                status: true
            };
        }
        else {
            return {
                status: false,
                message: translate_1.default('validator.email.invalid', lang)
            };
        }
    };
    Validator.campsValidator = (context = {}, constraints = {}, lang = 'en-us') => __awaiter(this, void 0, void 0, function* () {
        try {
            if (!lang)
                lang = 'pt-br';
            const validator = new InputValidator.Validator(context, constraints);
            const doValidation = yield validator.check();
            if (!doValidation) {
                return {
                    status: false,
                    message: translate_1.default('invalid_fields', lang.toLowerCase())
                };
            }
            let newContext = {};
            for (let key in constraints) {
                if (key.indexOf('.') > 0)
                    key = key.substr(0, key.indexOf('.'));
                if (key in newContext)
                    continue;
                newContext[key] = context[key];
            }
            return JSON.parse(JSON.stringify(newContext));
        }
        catch (error) {
            return {
                status: false,
                message: error.message
            };
        }
    });
})(Validator || (Validator = {}));
exports.default = Validator;
//# sourceMappingURL=validator.js.map