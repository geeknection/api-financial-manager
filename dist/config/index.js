"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { PORT } = process.env;
const config = {
    app: {
        PORT: PORT || 3000,
        SECRET_KEY: process.env.SECRET_KEY,
        url: process.env.API_URL,
        lang: 'pt-br',
        DEVMODE: process.env.DEVMODE || 'disable'
    },
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS,
        dbName: process.env.DB_NAME,
        authSource: process.env.DB_AUTHSOURCE
    }
};
exports.default = config;
//# sourceMappingURL=index.js.map