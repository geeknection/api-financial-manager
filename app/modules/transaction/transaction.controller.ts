import { APIReturn, RequestParsedQs, Response } from "app/config/interfaces";
import { JWTData } from "app/helpers/jwt";
import Schema from "app/services/mongodb";
import { Request } from "express";
import CreateTransaction from "./classes/create-transaction";
import TransactionData from "./classes/transaction-data";
import UpdateTransaction from "./classes/update-transaction";
import UserTransactions from "./classes/user-transactions";
import mongoose = require('mongoose');
import { getRedisCache, setRedisCache } from "app/services/mongodb/redis";

class TransactionController {
    req: Request<any, any, any, RequestParsedQs, Record<string, any>>;
    res: Response;
    lang: string;
    constructor(req: any, res: any) {
        this.req = req;
        this.res = res;
        this.lang = (this.req.headers['lang'] || "pt-BR").toString().toLowerCase();
    }

    public create = async (): Promise<APIReturn> => {
        try {
            const { userId } = JWTData(this.req);
            const create = new CreateTransaction(this.req.body, userId, this.lang);
            const response = await create.init();
            if (!response.status) {
                return this.res.status(200).json({
                    status: false,
                    message: response.message
                });
            }

            const transaction = new TransactionData(response.values);
            await transaction.init();

            return this.res.status(200).json({
                status: true,
                values: transaction.data
            });
        }
        catch (error) {
            return this.res.status(422).json({
                status: false,
                message: error.message
            });
        }
    }
    public update = async (): Promise<APIReturn> => {
        try {
            const { userId } = JWTData(this.req);
            const create = new UpdateTransaction(this.req.params.transactionId, this.req.body, userId, this.lang);
            const response = await create.init();
            if (!response.status) {
                return this.res.status(200).json({
                    status: false,
                    message: response.message
                });
            }

            const transaction = new TransactionData(response.values);
            await transaction.init();

            return this.res.status(200).json({
                status: true,
                values: transaction.data
            });
        }
        catch (error) {
            return this.res.status(422).json({
                status: false,
                message: error.message
            });
        }
    }
    public getUserTransactions = async (): Promise<APIReturn> => {
        try {
            const { userId } = JWTData(this.req);
            const { page } = this.req.query;
            const selectedPage = page ? parseInt(page.toString()) : 0;
            const limit = this.req.query.limit ? parseInt(this.req.query.limit.toString()) : 20;

            const cached = await getRedisCache('getUserTransactions');
            const isSameRequest = (): boolean => {
                return cached.page === page && cached.limit === limit;
            }
            if (cached && isSameRequest()) {
                return this.res.status(200).json({
                    status: true,
                    values: cached.data,
                    message: 'Data Cached'
                });
            }

            const transactions = new UserTransactions({
                userId,
                selectedPage,
                limit
            });
            const response = await transactions.init();

            setRedisCache({
                data: {
                    data: response,
                    page,
                    limit
                },
                expireSeconds: 20,
                name: 'getUserTransactions'
            });

            return this.res.status(200).json({
                status: true,
                values: response
            });
        }
        catch (error) {
            return this.res.status(422).json({
                status: false,
                message: error.message
            });
        }
    }
    public getTransaction = async (): Promise<APIReturn> => {
        try {
            const { transactionId } = this.req.params;

            const transaction = new TransactionData(transactionId);
            await transaction.init();

            return this.res.status(200).json({
                status: true,
                values: transaction.data
            });
        }
        catch (error) {
            return this.res.status(422).json({
                status: false,
                message: error.message
            });
        }
    }
    public delete = async (): Promise<APIReturn> => {
        try {
            const { userId } = JWTData(this.req);
            const { transactionId } = this.req.params;

            const response = await Schema.Transactions.deleteOne({
                _id: mongoose.Types.ObjectId(transactionId),
                userId: userId
            });

            return this.res.status(200).json({
                status: response ? !!response.deletedCount : false
            });
        }
        catch (error) {
            return this.res.status(422).json({
                status: false,
                message: error.message
            });
        }
    }
}

export default TransactionController;