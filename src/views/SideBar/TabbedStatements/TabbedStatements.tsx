import React, { useState } from "react";
import TransactionList from "../TransactionList/TransactionList";
import { useStatements } from "@/src/context/statementsContext";
import Card from "@/src/legos/Card/Card";

const TabbedStatements: React.FC = () => {
    const { statements, setStatements } = useStatements();
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    // Directly handle clicks to set the focusedIndex without clearing it unnecessarily
    const handleFocusChange = (index: number) => {
        setFocusedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    const setTransactionsForStatement = (
        updatedTransactions: React.SetStateAction<Transaction[]>,
    ): void => {
        setStatements((prevStatements) =>
            prevStatements.map((statement, i) =>
                i === focusedIndex
                    ? {
                          ...statement,
                          transactions:
                              typeof updatedTransactions === "function"
                                  ? updatedTransactions(statement.transactions)
                                  : updatedTransactions,
                      }
                    : statement,
            ),
        );
    };

    return (
        <Card isVertical={true} childContainerClassName="m-0.5">
            {statements.map((statement, index) => (
                <div
                    key={index}
                    className="h-full p-4 bg-cream overflow-y-scroll no-scrollbar"
                >
                    {focusedIndex !== index && (
                        <div
                            className="text-center p-2 bg-charcoalGray text-cream rounded-t-lg cursor-pointer"
                            onClick={() => handleFocusChange(index)} // Handle focus manually without toggling twice
                        >
                            {statement.fileName}
                        </div>
                    )}
                    {focusedIndex === index && (
                        <TransactionList
                            transactions={statement.transactions}
                            setTransactions={setTransactionsForStatement}
                        />
                    )}
                </div>
            ))}
        </Card>
    );
};

export default TabbedStatements;
