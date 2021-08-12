import JWT from "app/services/jwt-js";
import { Request } from "express";

const JWTHelper = (): JWT => {
    const jwt = new JWT(process.env.SECRET_KEY, process.env.ISS);
    return jwt;
}
export const JWTData = (req: Request): any => {
    const { status, data, message } = JWTHelper().data(req);
    if (!status) throw new Error(message);
    
    return data;
}
export default JWTHelper;