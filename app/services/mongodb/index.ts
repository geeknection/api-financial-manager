import TransactionsSchema from "./schemas/transaction";
import UsersSchema from "./schemas/user";

namespace Schema {
    export const Users = UsersSchema;
    export const Transactions = TransactionsSchema;
}
export default Schema;