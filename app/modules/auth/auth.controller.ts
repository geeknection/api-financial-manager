import {
    APIReturn,
    RequestParsedQs,
    Response
} from "app/config/interfaces";
import { Request } from "express";
import CryptoJS = require("crypto-js");
import translate from "app/translate";
import JWTHelper, { JWTData } from "app/helpers/jwt";
import Schema from "app/services/mongodb";

class AuthController {
    req: Request<{}, any, any, RequestParsedQs, Record<string, any>>;
    res: Response;
    lang: string;
    constructor(req: any, res: any) {
        this.req = req;
        this.res = res;
        this.lang = (this.req.headers['lang'] || "pt-BR").toString().toLowerCase();
    }

    public login = async (): Promise<APIReturn> => {
        try {
            const getUser = await Schema.Users.findOne({
                $or: [{
                    login: this.req.body.login,
                    password: CryptoJS.MD5(this.req.body.password).toString()
                }, {
                    email: this.req.body.login,
                    password: CryptoJS.MD5(this.req.body.password).toString()
                }]
            }, ['_id']);
            if (!getUser?._id) {
                return this.res.status(200).json({
                    status: false,
                    message: translate('auth.userNotFoundInvalidCredentials', this.lang)
                });
            }

            return this.res.status(200).json({
                status: true,
                values: JWTHelper().register({
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
    }
    public getUserData = async (): Promise<APIReturn> => {
        try {
            const { userId } = JWTData(this.req);
            const getUser = await Schema.Users.findById(userId, ['name']);

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
    }
}

export default AuthController;