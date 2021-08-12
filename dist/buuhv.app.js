"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const engines = require("consolidate");
const buuhv_routes_1 = require("./buuhv.routes");
class BuuhVApp {
    constructor() {
        this.app = express();
        this.init = () => {
            new buuhv_routes_1.default(this.app);
            this.app.set("views", path.join(__dirname, "views"));
            this.app.engine("html", engines.mustache);
            this.app.set("view engine", "html");
            this.app.get("/", (req, res) => {
                res.render("index.html");
            });
        };
        this.init();
    }
}
exports.default = new BuuhVApp();
//# sourceMappingURL=buuhv.app.js.map