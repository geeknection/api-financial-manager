"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require(process.cwd()+"/dist/config");
const Mongoose = require("mongoose");
let options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};
if (config_1.default.database.user && config_1.default.database.pass) {
    options = Object.assign(Object.assign({}, options), { auth: {
            user: config_1.default.database.user,
            password: config_1.default.database.pass
        } });
    if (config_1.default.database.authSource) {
        options.authSource = config_1.default.database.authSource;
    }
}
Mongoose.connect(`mongodb://${config_1.default.database.host}/${config_1.default.database.dbName}`, options);
const MongoConnection = Mongoose;
exports.default = MongoConnection;
//# sourceMappingURL=connection.js.map