import React from "react";
import TransactionItem from "./TransactionItem/TransactionItem";

interface Props {
    transactions: Transaction[];
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const TransactionList: React.FC<Props> = ({
    transactions,
    setTransactions,
}) => {
    return (
        <div className="shadow rounded-lg m-[-16px]">
            <table className="w-full">
                <thead className="bg-charcoalGray text-cream">
                    <tr>
                        <th className="p-3">Date</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Description</th>
                    </tr>
                </thead>
                <tbody className="bg-cream">
                    {transactions.map((transaction, index) => (
                        <TransactionItem
                            key={index}
                            transaction={transaction}
                            setTransactions={setTransactions}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;
