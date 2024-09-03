import { NextRequest, NextResponse } from "next/server"; // To handle the request and response
import { promises as fs } from "fs"; // To save the file temporarily
import os from "os"; // To get the OS temp directory
import path from "path"; // To handle file paths
import PDFParser from "pdf2json"; // To parse the pdf

export async function POST(req: NextRequest) {
    const formData: FormData = await req.formData();
    const uploadedFiles = formData
        .getAll("filepond")
        .filter((item) => item instanceof File);
    let parsedResults: { fileName: string; parsedText: string }[] = [];

    console.log("Files received: ", uploadedFiles);

    if (uploadedFiles && uploadedFiles.length > 0) {
        for (const uploadedFile of uploadedFiles) {
            if (uploadedFile instanceof File) {
                // Use the actual file name from the uploaded file
                const fileName = uploadedFile.name;

                // Get a temporary directory path
                const tempDir = os.tmpdir();

                // Create a temporary file path
                const tempFilePath = path.join(tempDir, fileName);

                // Convert ArrayBuffer to Buffer
                const fileBuffer = Buffer.from(
                    await uploadedFile.arrayBuffer(),
                );

                // Save the buffer as a file
                await fs.writeFile(tempFilePath, fileBuffer);

                // Parse the pdf using pdf2json
                const pdfParser = new (PDFParser as any)(null, 1);

                const parsedText = await new Promise<string>(
                    (resolve, reject) => {
                        pdfParser.on("pdfParser_dataError", (errData: any) => {
                            console.log(errData.parserError);
                            reject(errData.parserError);
                        });

                        pdfParser.on("pdfParser_dataReady", () => {
                            resolve((pdfParser as any).getRawTextContent());
                        });

                        pdfParser.loadPDF(tempFilePath);
                    },
                );

                // Collect the result
                parsedResults.push({ fileName, parsedText });

                // Optionally, delete the temp file after processing
                await fs.unlink(tempFilePath);
            } else {
                console.log("Uploaded file is not in the expected format.");
            }
        }
    } else {
        console.log("No files found.");
    }

    // Convert the parsed results to an XML string
    const xmlResponse = `
    <files>
        ${parsedResults
            .map(
                (result) => `
        <file>
            <fileName>${result.fileName}</fileName>
            <parsedText><![CDATA[${result.parsedText}]]></parsedText>
        </file>
        `,
            )
            .join("")}
    </files>`.trim();

    console.log("XML Response: ", xmlResponse); // Debug: Check the generated XML

    const response = new NextResponse(xmlResponse, {
        headers: { "Content-Type": "application/xml" },
    });
    return response;
}
