"use client";
import React, { useState } from "react";
import TransactionList from "../TransactionList/TransactionList";
import { useStatements } from "@/src/context/statementsContext";

const TabbedStatements: React.FC = () => {
    const { statements, setStatements } = useStatements();
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleTabClick = (index: number): void => {
        setActiveTab(index);
    };

    const setTransactionsForStatement = (
        index: number,
        updatedTransactions: React.SetStateAction<Transaction[]>, // Update type to match
    ) => {
        setStatements((prevStatements) =>
            prevStatements.map((statement, i) =>
                i === index
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
        <div className="tabbed-statements">
            {/* Render statement tabs */}
            <div className="tabs">
                {statements.map((statement, index) => (
                    <button
                        key={index}
                        className={`tab-button ${activeTab === index ? "active" : ""}`}
                        onClick={() => handleTabClick(index)}
                    >
                        {statement.fileName}
                    </button>
                ))}
            </div>

            {/* Render transactions for the active tab */}
            <div className="transactions">
                {statements.length > 0 && (
                    <TransactionList
                        transactions={statements[activeTab].transactions}
                        setTransactions={(
                            updatedTransactions: React.SetStateAction<
                                Transaction[]
                            >,
                        ) =>
                            setTransactionsForStatement(
                                activeTab,
                                updatedTransactions,
                            )
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default TabbedStatements;
