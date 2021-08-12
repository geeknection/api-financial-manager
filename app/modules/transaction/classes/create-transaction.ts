import { APIReturn } from "app/config/interfaces";
import Schema from "app/services/mongodb";
import { SchemaTransactionData } from "app/services/mongodb/schemas/transaction";
import translate from "app/translate";
import mongoose = require('mongoose');

class CreateTransaction {
    constructor(
        private body: SchemaTransactionData,
        private userId: string,
        private lang: string
    ) {};
    
    private validFields = (): APIReturn => {
        const { description, income, outflow } = this.body;
        if (description.trim().length < 1) {
            return {
                status: false,
                message: translate('validator.invalidDescription', this.lang)
            }
        }
        if (income < 0 || outflow < 0) {
            return {
                status: false,
                message: translate(`validator.invalid${income < 0 ? 'Income' : 'Outflow'}`, this.lang)
            }
        }
        return {
            status: true
        }
    }
    public init = async (): Promise<APIReturn> => {
        const isValid = this.validFields();
        if (!isValid.status) return isValid;

        const response = await Schema.Transactions.create({
            ...this.body,
            userId: mongoose.Types.ObjectId(this.userId),
            date: new Date(this.body.date),
        });

        return {
            status: true,
            values: response.id
        }
    }
}
export default CreateTransaction;