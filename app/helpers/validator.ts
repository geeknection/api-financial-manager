import { APIReturn } from 'app/config/interfaces';
import * as InputValidator from 'node-input-validator';
import translate from '../translate';
namespace Validator {
    export const password = (value: string, lang = 'pt-br'): APIReturn => {
        if (!(/(.*)?[A-Z](.*)?$/.test(value))) {
            return {
                status: false,
                message: translate('validator.password.requireUpperCase', lang)
            }
        }
        else if (!(/(.*)?[a-z](.*)?$/.test(value))) {
            return {
                status: false,
                message: translate('validator.password.requireLowerCase', lang)
            }
        }
        else if (!(/(.*)?[0-9](.*)?$/.test(value))) {
            return {
                status: false,
                message: translate('validator.password.requireANumber', lang)
            }
        }
        else if (!(/(?=.*[@!#$%^&*()/\\])[@!#$%^&*()]$/.test(value))) {
            return {
                status: false,
                message: translate('validator.password.requireSpecialChar', lang)
            }
        }
        return {
            status: true
        };
    }
    export const email = (value: string, lang = 'pt-br') => {
        if (/^[a-z0-9](\.)?[a-z0-9]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/.test(value)) {
            return {
                status: true
            }
        }
        else {
            return {
                status: false,
                message: translate('validator.email.invalid', lang)
            }
        }
    }
    export const campsValidator = async (context: object = {}, constraints: object = {}, lang: any = 'en-us'): Promise<APIReturn> => {
        try {
            if (!lang) lang = 'pt-br';
            const validator = new InputValidator.Validator(context, constraints);
            const doValidation = await validator.check();
            if (!doValidation) {
                return {
                    status: false,
                    message: translate('invalid_fields', lang.toLowerCase())
                }
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
    }
}
export default Validator;