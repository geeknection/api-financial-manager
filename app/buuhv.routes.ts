import * as express from "express";
const cors = require("cors");
const bodyParser = require("body-parser");

class BuuhVRoutes {
    app: any;
    corsOptions: {};
    constructor(app: any) {
        this.app = app;
        this.setCorsOptions();
        this.initiStaticFolders();
        this.mountRoutes();
        this.corsOptions = {};
    }
    /**
     * Mount application routes
     * @todo Do not delete START-MOUNTROUTES and END-MOUNTROUTES
     * @returns void
     */
    mountRoutes = () => {
        /**START-MOUNTROUTES**/
        this.app.use(require('./modules/user/user.routes'));
        this.app.use(require('./modules/auth/auth.routes'));
        this.app.use(require('./modules/transaction/transaction.routes'));
        /**END-MOUNTROUTES**/
    };
    /**
     * Cors settings
     * @returns void
     */
    setCorsOptions = () => {
        const whitelist = [
            /(.*)localhost(\:)?(.*)?/,
            /undefined/
        ];
        this.corsOptions = {
            origin: function (origin: string, callback: Function) {
                if (
                    whitelist.some(function (item) {
                        return new RegExp(item).test(origin);
                    })
                ) {
                    callback(null, true);
                } else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
        };
    };
    /**
     * Setting folders routes
     * @returns void
     */
    initiStaticFolders = () => {
        this.app.use(cors(this.corsOptions));
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(
            bodyParser.urlencoded({
                extended: false,
                limit: "50mb",
            })
        );
        this.app.use("/public", express.static("./public"));
    };
}

export default BuuhVRoutes;
