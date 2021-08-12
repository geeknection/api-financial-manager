import * as dotenv from "dotenv";
dotenv.config();

import BuuhVApp from "./buuhv.app";
import config from "./config";
import { ClusterData } from "./config/interfaces";
import * as chalk from 'chalk';
import { clear } from 'console';
import * as figlet from 'figlet';

/**
 *
 */
class BuuhVFramework {
    private cCPUs: number = require("os").cpus().length;
    private cluster: ClusterData = require("cluster");
    constructor() {
        this.init();
    }
    /**
     * Easter egg
     * @returns angry
     */
    youBreakMyEgg = (): void => {
        clear();
        console.log(
            chalk.yellow(
                figlet.textSync("Back-end Test", { horizontalLayout: "full" })
            )
        );
    };
    createClusters = (): void => {
        if (config.app.DEVMODE !== "enable" && this.cluster.isMaster) {
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
    init = (): void => {
        this.createClusters();
        BuuhVApp.app.listen(config.app.PORT, () => {
            this.youBreakMyEgg();
            console.log(
                `[${new Date().toLocaleTimeString()}] API running on port ${
                    config.app.PORT
                } `
            );
            console.log(chalk.yellow("BuuhV Framework Initialized"));
        });
    };
}
new BuuhVFramework();