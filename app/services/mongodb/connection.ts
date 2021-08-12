import config from 'app/config';
import * as Mongoose from 'mongoose';
let options: Mongoose.ConnectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
};
if (config.database.user && config.database.pass) {
    options = {
        ...options,
        auth: {
            user: config.database.user,
            password: config.database.pass
        }
    }
    if (config.database.authSource) {
        options.authSource = config.database.authSource;
    }
}

Mongoose.connect(`mongodb://${config.database.host}/${config.database.dbName}`, options);
const MongoConnection = Mongoose;

export default MongoConnection;