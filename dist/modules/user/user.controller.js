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
const create_user_1 = require("./classes/create-user");
class UserController {
    constructor(req, res) {
        this.createUser = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const createUser = new create_user_1.default(this.req.body, this.lang);
                const response = yield createUser.init();
                return this.res.status(200).json(response);
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
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map