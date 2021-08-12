import { APIReturn } from "app/config/interfaces";
import Validator from "app/helpers/validator";
import Schema from "app/services/mongodb";
import UsersSchema from "app/services/mongodb/schemas/user";
import translate from "app/translate";
import CryptoJs = require('crypto-js');

interface BodyData {
    login: string,
    email: string,
    password: string,
    name: string,
    birthDate: string
}

class CreateUser {
    constructor(
        private data: BodyData,
        private lang: string
    ) {};
    
    private validFields = (): APIReturn => {
        const { password, email, birthDate, name } = this.data;
        const isValidPass = Validator.password(password, this.lang);
        if (!isValidPass.status) return isValidPass;

        const isValidEmail = Validator.email(email, this.lang);
        if (!isValidEmail.status) return isValidEmail;

        if (name.split(' ').length < 2) {
            return {
                status: false,
                message: translate('validator.incompleteName', this.lang)
            }
        }

        const userYearsOld = new Date().getFullYear() - new Date(birthDate).getFullYear();
        if (userYearsOld < 18) {
            return {
                status: false,
                message: translate('validator.yearsOld', this.lang)
            }
        }
        return {
            status: true
        }
    }
    private userExist = async (): Promise<APIReturn> => {
        const userExist = await Schema.Users.findOne({
            $or: [{
                login: this.data.login
            }, {
                email: this.data.email
            }]
        }, ['_id', 'login', 'email']);

        if (userExist?._id) {
            const message = () => {
                if (userExist.email === this.data.email) {
                    return translate('validator.emailExist', this.lang);
                }
                else {
                    return translate('validator.loginExist', this.lang);
                }
            }
            return {
                status: false,
                message: message()
            }
        }
        return {
            status: true
        }
    }
    public init = async (): Promise<APIReturn> => {
        const isValid = this.validFields();
        if (!isValid.status) return isValid;
        
        const exists = await this.userExist();
        if (!exists.status) return exists;

        const birthDate = (): string => {
            let date = new Date(this.data.birthDate);
            date.setDate(date.getDate() + 1);
            return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        }

        const create = await Schema.Users.create({
            ...this.data,
            password: CryptoJs.MD5(this.data.password),
            birthDate: birthDate()
        });

        if (!create?._id) {
            return {
                status: false,
                message: translate('cannotCreateUser', this.lang),
                values: create
            }
        }
        
        return {
            status: true,
            values: create._id
        }
    }
}
export default CreateUser;