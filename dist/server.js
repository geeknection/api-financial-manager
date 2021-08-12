"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config();
const buuhv_app_1 = require("./buuhv.app");
const config_1 = require("./config");
const chalk = require("chalk");
const console_1 = require("console");
const figlet = require("figlet");
/**
 *
 */
class BuuhVFramework {
    constructor() {
        this.cCPUs = require("os").cpus().length;
        this.cluster = require("cluster");
        /**
         * Easter egg
         * @returns angry
         */
        this.youBreakMyEgg = () => {
            console_1.clear();
            console.log(chalk.yellow(figlet.textSync("Back-end Test", { horizontalLayout: "full" })));
        };
        this.createClusters = () => {
            if (config_1.default.app.DEVMODE !== "enable" && this.cluster.isMaster) {
                for (var i = 0; i < this.cCPUs; i++) {
                    this.cluster.fork();
                }
                this.cluster.on("online", function (worker) {
                    console.log("Worker " + worker.process.pid + " is online.");
                });
                this.cluster.on("exit", function (worker, code, signal) {
                    console.log("worker " + worker.process.pid + " died.");
                });
            }
        };
        this.init = () => {
            this.createClusters();
            buuhv_app_1.default.app.listen(config_1.default.app.PORT, () => {
                this.youBreakMyEgg();
                console.log(`[${new Date().toLocaleTimeString()}] API running on port ${config_1.default.app.PORT} `);
                console.log(chalk.yellow("BuuhV Framework Initialized"));
            });
        };
        this.init();
    }
}
new BuuhVFramework();
//# sourceMappingURL=server.js.map