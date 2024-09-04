"use client";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useState } from "react";
import type { FilePondFile, FilePondErrorDescription } from "filepond";

// Define the type for the server response
interface Transaction {
    date: string;
    amount: number;
    description: string;
}

interface Statement {
    fileName: string;
    transactions: Transaction[];
}

export default function FileUpload() {
    const [statements, setStatements] = useState<Statement[]>([]);

    const handleProcessFile = (
        error: FilePondErrorDescription | null,
        file: FilePondFile,
    ) => {
        if (error) {
            console.error("Error uploading file:", error);
            return;
        }

        try {
            // Assuming the server response is JSON and stored in serverId
            const response: Statement = JSON.parse(file.serverId as string);

            // Update state with the new statement
            setStatements((prevStatements) => [...prevStatements, response]);

            console.log("Server Response:", response);
        } catch (e) {
            console.error("Failed to parse server response:", e);
        }
    };

    return (
        <div>
            <FilePond
                allowMultiple={true}
                server={{
                    process: {
                        url: "/api/upload",
                        method: "POST",
                        withCredentials: false,
                        // Remove the "Content-Type" header, let the browser set it to multipart/form-data
                        timeout: 7000,
                        onload: (response: string) => response,
                        onerror: (response: any) => {
                            console.error("Error Response:", response);
                        },
                    },
                    fetch: null,
                    revert: null,
                }}
                onprocessfile={handleProcessFile}
            />
            <div>
                <h2>Uploaded Statements</h2>
                {/* {statements.map((statement, index) => (
                    <div key={index}>
                        <h3>{statement.fileName}</h3>
                        <ul>
                            {statement.transactions.map((transaction, idx) => (
                                <li key={idx}>
                                    {transaction.date}:{" "}
                                    {transaction.description} - $
                                    {transaction.amount.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))} */}
            </div>
        </div>
    );
}
