import TransactionModel from "../transaction.model";
import Schema from "app/services/mongodb";
import { getSkipPagination } from "app/helpers/general";
import { SchemaTransactionData } from "app/services/mongodb/schemas/transaction";

interface TransactionsData {
    balance: number,
    records: SchemaTransactionData[],
    recordsTotal: number;
    pageNumber: number;
    pageSize: number;
}

class UserTransactions {
    constructor(
        private filters: {
            userId: number;
            selectedPage: number;
            limit: number;
        }
    ) {};

    public init = async (): Promise<TransactionsData> => {
        const { selectedPage, limit } = this.filters;
        const userId: any = this.filters.userId;
        const recordsTotal = await Schema.Transactions.countDocuments({
            userId
        });
        const records = await Schema.Transactions.find({ userId }, [
            'id', 'date', 'income', 'outflow', 'description', 'userId'
        ]).skip(getSkipPagination(selectedPage, recordsTotal, limit)).limit(limit);

        const balance = await TransactionModel.getUserBalance(userId);

        //@todo - Não entendi se o pageSize e o pageNumber são baseado no padrão 50 do mongoose ou
        // se é baseado em um sistema de paginação que eu deveria criar, então eu criei uma paginação
        const pageSize = Math.ceil(recordsTotal / limit);
        return {
            balance: balance.length ? balance[0].output : 0,
            records: records.map(item => {
                const date: any = new Date(item.date).toISOString();
                item.date = date;
                return item;
            }),
            recordsTotal,
            pageNumber: selectedPage,
            pageSize: pageSize

        }
    }
}
export default UserTransactions;