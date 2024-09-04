"use client";
import React, { Dispatch, SetStateAction } from "react";
import TransactionItem from "./TransactionItem/TransactionItem";

interface TransactionListProps {
    transactions: Transaction[];
    setTransactions: Dispatch<SetStateAction<Transaction[]>>;
}

const TransactionList: React.FC<TransactionListProps> = ({
    transactions,
    setTransactions,
}) => {
    const handleDelete = (transactionToDelete: Transaction): void => {
        setTransactions(
            transactions.filter(
                (transaction) => transaction !== transactionToDelete,
            ),
        );
    };

    const handleEdit = (editedTransaction: Transaction): void => {
        setTransactions(
            transactions.map((transaction) =>
                transaction.date === editedTransaction.date
                    ? editedTransaction
                    : transaction,
            ),
        );
    };

    return (
        <div className="bg-charcoalGray p-4 rounded-lg shadow-lg h-full flex flex-col">
            <h2 className="text-xl text-champagne mb-4">Transactions</h2>
            <div className="overflow-y-auto flex-grow">
                {transactions.map((transaction, index) => (
                    <TransactionItem
                        key={index}
                        transaction={transaction}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </div>
        </div>
    );
};

export default TransactionList;
