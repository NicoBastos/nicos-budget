import React, { useState } from "react";

const FileUploader: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFiles(event.target.files);
    };

    const handleFileUpload = async () => {
        if (selectedFiles) {
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("files", selectedFiles[i]);
            }

            try {
                const response = await fetch("/api/process-pdfs", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error("File upload failed");
                }

                const result = await response.json();
                console.log("CSV generated:", result.csvFilePath);
                console.log("Summary object:", result.summaryObject);
            } catch (error) {
                console.error("Error uploading files:", error);
            }
        }
    };

    return (
        <div>
            <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={handleFileSelect}
            />
            <button onClick={handleFileUpload}>Upload and Process Files</button>
        </div>
    );
};

export default FileUploader;
