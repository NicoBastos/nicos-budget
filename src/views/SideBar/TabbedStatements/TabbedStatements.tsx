// TabbedStatements.tsx
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
        updatedTransactions: React.SetStateAction<Transaction[]>,
    ): void => {
        setStatements((prevStatements) =>
            prevStatements.map((statement, i) =>
                i === activeTab
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
        <div className="flex flex-col h-full">
            <div className="flex flex-wrap border-b border-silver">
                {statements.map((statement, index) => (
                    <button
                        key={index}
                        className={`flex-grow md:flex-1 p-2 text-xs md:text-sm lg:text-base font-medium text-center rounded-t-lg cursor-pointer
                                    ${activeTab === index ? "bg-charcoalGray text-cream" : "bg-cream text-bistre"}
                                    hover:bg-champagne transition-colors duration-300 whitespace-nowrap`}
                        onClick={() => handleTabClick(index)}
                    >
                        {statement.fileName}
                    </button>
                ))}
            </div>
            <div className="flex-grow p-4 bg-cream overflow-y-auto">
                {statements.length > 0 && (
                    <TransactionList
                        transactions={statements[activeTab].transactions}
                        setTransactions={setTransactionsForStatement}
                    />
                )}
            </div>
        </div>
    );
};

export default TabbedStatements;
