"use client";
import { FilePond } from "react-filepond";
import type { FilePondFile } from "react-filepond/types";
import "filepond/dist/filepond.min.css";
import { useState } from "react";
// import xml2js from "xml2js"; // Import the XML parser (if you plan to use it)

// Define the type for the server response (before parsing)
type ServerResponse = string | null;

// Define the type for the parsed XML response (if applicable)
interface ParsedResponse {
    files: {
        file: Array<{
            fileName: string[];
            parsedText: string[];
        }>;
    };
}

// // Define custom types if needed
// interface FilePondFile {
//     serverId: string | null; // The ID returned by the server
//     file: File; // The actual file object
//     status: string; // Status of the file in the upload process
//     progress: {
//         // Progress information
//         percentage: number;
//         bytesUploaded: number;
//         totalBytes: number;
//     };
//     origin: string; // The source of the file (local, remote, etc.)
//     metadata: Record<string, any>; // Any additional metadata
// }

interface FilePondError {
    main: string; // A primary error message or code
    sub?: string; // A detailed error message (optional)
    code?: string; // An error code (optional)
    file?: FilePondFile; // The file associated with the error (optional)
    status?: number; // HTTP status code if applicable (optional)
}

export default function FileUpload() {
    const [serverResponse, setServerResponse] = useState<ServerResponse>(null);
    const [parsedResponse, setParsedResponse] = useState<ParsedResponse | null>(
        null,
    );

    const handleProcessFile = (
        error: FilePondError | null,
        file: FilePondFile,
    ) => {
        if (error) {
            console.error("Error uploading file:", error);
            return;
        }

        // Assuming the server response is XML and stored in serverId
        const response: string = file.serverId as string;

        // Here is where you would parse the XML response into a JavaScript object
        // Example (using xml2js or similar):
        // const parser = new xml2js.Parser();
        // parser.parseString(response, (err: Error, result: ParsedResponse) => {
        //     if (err) {
        //         console.error("Error parsing XML:", err);
        //         return;
        //     }
        //     setParsedResponse(result); // Update state with the parsed object
        // });

        // For now, we just store the raw XML string in state
        setServerResponse(response);
        console.log("Server Response:", response);
    };

    return (
        <div>
            <FilePond
                allowMultiple={true} // Enable multiple file uploads
                server={{
                    process: {
                        url: "/api/upload",
                        method: "POST",
                        withCredentials: false,
                        headers: {},
                        timeout: 7000,
                        onload: (response: string) => {
                            // Return the response as it is (XML string)
                            return response;
                        },
                        onerror: (response: any) => {
                            console.error("Error Response:", response);
                        },
                    },
                    fetch: null,
                    revert: null,
                }}
                onprocessfile={(error, file) =>
                    handleProcessFile(
                        error as FilePondError | null,
                        file as FilePondFile,
                    )
                } // Handle the server response
            />

            {/* {serverResponse && (
                <div>
                    <h3>Server Response:</h3>
                    <pre>{serverResponse}</pre>
                </div>
            )} */}

            {parsedResponse && (
                <div>
                    <h3>Parsed Response:</h3>
                    <pre>{JSON.stringify(parsedResponse, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
