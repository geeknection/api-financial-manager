import {
    RequestParsedQs,
    Response,
    APIReturn
} from 'app/config/interfaces';
import { Request } from 'express';
import CreateUser from './classes/create-user';

class UserController {
    req: Request<{}, any, any, RequestParsedQs, Record<string, any>>;
    res: Response;
    lang: string;
    constructor(req: any, res: any) {
        this.req = req;
        this.res = res;
        this.lang = (this.req.headers['lang'] || "pt-BR").toString().toLowerCase();
    }
    public createUser = async (): Promise<APIReturn> => {
        try {
            const createUser = new CreateUser(this.req.body, this.lang);
            const response = await createUser.init();
            return this.res.status(200).json(response);
        }
        catch (error) {
            return this.res.status(422).json({
                status: false,
                message: error.message
            });
        }
    }
}

export default UserController;