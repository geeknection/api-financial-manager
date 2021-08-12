import * as express from "express";
import * as path from "path";
import * as engines from "consolidate";
import BuuhVRoutes from "./buuhv.routes";

class BuuhVApp {
    public app = express();
    constructor() {
        this.init();
    }
    init = () => {
        new BuuhVRoutes(this.app);

        this.app.set("views", path.join(__dirname, "views"));
        this.app.engine("html", engines.mustache);
        this.app.set("view engine", "html");

        this.app.get("/", (req: any, res: any) => {
            res.render("index.html");
        });
    };
}

export default new BuuhVApp();
