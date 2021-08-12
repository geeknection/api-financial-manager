import Schema from "app/services/mongodb";
import mongoose = require('mongoose');

interface BalanceData {
    _id: null,
    output: number
}
namespace TransactionModel {
    export const getUserBalance = async (userId: number): Promise<BalanceData[]> => {
        return await Schema.Transactions.aggregate(
            [
                {
                    $match: {
                        userId: mongoose.Types.ObjectId(userId)
                    }
                },
                {
                    $group: {
                        _id: null,
                        "income": {
                            $sum: "$income"
                        },
                        "outflow": {
                            $sum: "$outflow"
                        }
                    },
                },
                {
                    $project: {
                        "output": {
                            "$subtract": [
                                {
                                    "$sum": "$income"
                                },
                                {
                                    "$sum": "$outflow"
                                }
                            ]
                        }
                    }
                }
            ]
        )
    }
}
export default TransactionModel;