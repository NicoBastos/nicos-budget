import React, { createContext, useState, useContext, ReactNode } from "react";

interface Transaction {
    date: string;
    amount: string;
    description: string;
}

interface Statement {
    fileName: string;
    transactions: Transaction[];
}

interface StatementsContextType {
    statements: Statement[];
    setStatements: React.Dispatch<React.SetStateAction<Statement[]>>;
}

const StatementsContext = createContext<StatementsContextType | undefined>(
    undefined,
);

export const useStatements = () => {
    const context = useContext(StatementsContext);
    if (!context) {
        throw new Error(
            "useStatements must be used within a StatementsProvider",
        );
    }
    return context;
};

export const StatementsProvider = ({ children }: { children: ReactNode }) => {
    const [statements, setStatements] = useState<Statement[]>([]);

    return (
        <StatementsContext.Provider value={{ statements, setStatements }}>
            {children}
        </StatementsContext.Provider>
    );
};
