import { APIReturn } from "app/config/interfaces";
import Schema from "app/services/mongodb";
import { SchemaTransactionData } from "app/services/mongodb/schemas/transaction";
import translate from "app/translate";

class UpdateTransaction {
    constructor(
        private id: string,
        private body: SchemaTransactionData,
        private userId: string,
        private lang: string
    ) { };

    private query = async () => await Schema.Transactions.updateOne({
        _id: this.id,
        userId: this.userId
    }, {
        ...this.body,
        userId: this.userId,
        date: new Date(this.body.date),
    });
    
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

        const response = await this.query();

        if (!response.ok) {
            return {
                status: false,
                message: translate('validator.cannotUpdate', this.lang),
                values: response
            }
        }

        return {
            status: true,
            values: this.id
        }
    }
}
export default UpdateTransaction;