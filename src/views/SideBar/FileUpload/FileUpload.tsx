// FileUpload.tsx
import React from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useStatements } from "@/src/context/statementsContext";
import type { FilePondFile, FilePondErrorDescription } from "filepond";

const FileUpload: React.FC = () => {
    const { setStatements } = useStatements();

    const handleProcessFile = (
        error: FilePondErrorDescription | null,
        file: FilePondFile,
    ) => {
        if (error) {
            console.error("Error uploading file:", error);
            return;
        }

        try {
            const response = JSON.parse(file.serverId as string);
            console.log("Response: ", response[0].transactions);
            setStatements((prevStatements) => [...prevStatements, response[0]]);
        } catch (err) {
            console.error("Error parsing server response:", err);
        }
    };

    return (
        <FilePond
            allowMultiple={true}
            server={{
                process: {
                    url: "/api/upload",
                    method: "POST",
                    withCredentials: false,
                    timeout: 7000,
                    onload: (response) => response,
                    onerror: (response) =>
                        console.error("Error Response:", response),
                },
                fetch: null,
                revert: null,
            }}
            onprocessfile={handleProcessFile}
            
        />
    );
};

export default FileUpload;
