"use client";
import React, { useState } from "react";
import TransactionItem from "./TransactionItem/TransactionItem";



const TransactionList: React.FC = () => {
    const initialTransactions: Transaction[] = [
        {
            date: "10/10",
            amount: "8.52",
            description: "Withdrawal: 1062 Debit Card Purchase 7-Eleven 38342",
        },
        // Add more sample transactions if you want to test scrolling behavior
        {
            date: "10/11",
            amount: "15.00",
            description: "Withdrawal: 1062 Debit Card Purchase Grocery Store",
        },
        {
            date: "10/12",
            amount: "20.00",
            description: "ATM Withdrawal",
        },
        {
            date: "10/13",
            amount: "5.25",
            description: "Coffee Shop Purchase",
        },
        // Add more as needed...
    ];

    const [transactions, setTransactions] =
        useState<Transaction[]>(initialTransactions);

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
