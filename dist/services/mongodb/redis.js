"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRedisCache = exports.getRedisCache = exports.redisClient = void 0;
const redis = require("redis");
exports.redisClient = redis.createClient();
const getRedisCache = (name) => {
    return new Promise((resolve, reject) => {
        exports.redisClient.get(name, (err, reply) => {
            if (err) {
                reject(err);
            }
            else {
                if (reply) {
                    resolve(JSON.parse(reply));
                }
                else {
                    resolve(null);
                }
            }
        });
    });
};
exports.getRedisCache = getRedisCache;
const setRedisCache = (data) => {
    exports.redisClient.set(data.name, JSON.stringify(data.data));
    exports.redisClient.expire(data.name, data.expireSeconds);
};
exports.setRedisCache = setRedisCache;
//# sourceMappingURL=redis.js.map