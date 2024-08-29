import { NextRequest, NextResponse } from "next/server";
import multer from "multer";
import { startProcessing } from "../../../../process"; // Adjust this import based on your project structure
import { promisify } from "util";
import * as fs from "fs";
import path from "path";

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Promisify the multer handling to use async/await
const uploadMiddleware = promisify(upload.array("files"));

export async function POST(request: NextRequest) {
    // Create a FormData object from the request body
    const formData = await request.formData();

    // Extract the files from the FormData object
    const files = formData.getAll("files") as File[];

    // Check if files are provided
    if (!files || files.length === 0) {
        return NextResponse.json(
            { error: "No files provided" },
            { status: 400 },
        );
    }

    // Save files to the server
    const uploadPromises = files.map(async (file) => {
        const buffer = Buffer.from(await file.arrayBuffer());
        const filePath = path.join("uploads", file.name);
        await fs.promises.writeFile(filePath, buffer);
        return filePath;
    });

    // Wait for all files to be uploaded
    const uploadedFiles = await Promise.all(uploadPromises);

    // Process the uploaded files
    try {
        const pdfInputDir = path.join(process.cwd(), "uploads"); // Directory where files are uploaded
        const csvOutputDir = path.join(process.cwd(), "output"); // Directory to save CSV files

        // Ensure the output directory exists
        if (!fs.existsSync(csvOutputDir)) {
            fs.mkdirSync(csvOutputDir, { recursive: true });
        }

        await startProcessing(csvOutputDir, pdfInputDir);

        // Example response data
        const result = {
            csvFilePath: `${csvOutputDir}/your_generated_csv.csv`, // Adjust as needed
            summaryObject: {}, // Your summary data here
        };

        return NextResponse.json(result);
    } catch (error) {
        if (error instanceof Error) {
            console.error("Processing failed:", error.message);
            return NextResponse.json(
                { error: "Processing failed", details: error.message },
                { status: 500 },
            );
        } else {
            console.error("Unknown error occurred");
            return NextResponse.json(
                { error: "Processing failed due to an unknown error" },
                { status: 500 },
            );
        }
    }
}
