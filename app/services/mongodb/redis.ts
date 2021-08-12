import * as redis from 'redis';
export const redisClient = redis.createClient();

export const getRedisCache = (name: string): any => {
    return new Promise((resolve, reject) => {
        redisClient.get(name, (err, reply) => {
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
}
export const setRedisCache = (data: {
    name: string,
    data: any,
    expireSeconds: number
}): void => {
    redisClient.set(data.name, JSON.stringify(data.data));
    redisClient.expire(data.name, data.expireSeconds);
}