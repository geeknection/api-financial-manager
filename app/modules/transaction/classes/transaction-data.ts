import Schema from "app/services/mongodb";

interface Data {
    id: string;
    date: string;
    income: number;
    outflow: number;
    description: string;
    userId: string;
}
class TransactionData {
    public data: Data;
    constructor(
        private id: string
    ) {};

    public init = async (): Promise<void> => {
        const response = await Schema.Transactions.findById(this.id, [
            'id', 'date', 'income', 'outflow', 'description', 'userId'
        ]);
        this.data = {
            id: response.id,
            date: new Date(response.date).toISOString(),
            income: response.income,
            outflow: response.outflow,
            description: response.description,
            userId: response.userId
        }
    }
}
export default TransactionData;