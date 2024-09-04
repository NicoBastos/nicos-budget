import { NextRequest, NextResponse } from "next/server";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";
pdfjs.GlobalWorkerOptions.workerSrc =
    "pdfjs-dist/legacy/build/pdf.worker.min.mjs";

interface Transaction {
    date: string;
    amount: string;
    description: string;
}

export async function POST(req: NextRequest) {
    const formData: FormData = await req.formData();
    const uploadedFiles = formData
        .getAll("filepond")
        .filter((item) => item instanceof File) as File[];
    console.log("here??");
    let parsedResults: { fileName: string; transactions: Transaction[] }[] = [];

    if (uploadedFiles && uploadedFiles.length > 0) {
        for (const uploadedFile of uploadedFiles) {
            const fileName = uploadedFile.name;
            const textContent = await getTextFromPDF(uploadedFile);

            const transactions = extractTransactions(textContent);

            parsedResults.push({ fileName, transactions });
        }
    }

    return NextResponse.json(parsedResults, {
        headers: { "Content-Type": "application/json" },
    });
}

async function getTextFromPDF(file: File): Promise<string> {
    const fileArrayBuffer = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument({ data: fileArrayBuffer });
    const doc = await loadingTask.promise;
    let fullText = "";

    for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
        const page = await doc.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
            .filter((item: any) => "str" in item)
            .map((item: any) => item.str)
            .join("\n"); // Maintain line breaks
        fullText += pageText + "\n"; // Maintain page breaks
    }

    console.log("Extracted Text:", fullText); // Log the extracted text for debugging

    return fullText;
}
const transactionPattern =
    /(\d{2}\/\d{2})\s+([\d,]+\.\d{2})\s+(.+?)(?=\n\d{2}\/\d{2}|\n?$)/;

function extractTransactions(text: string): Transaction[] {
    const transactions: Transaction[] = [];

    // Normalize line breaks to just "\n"
    text = text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

    const lines = text.split("\n");

    let currentTransactionLines: string[] = [];
    let skipNext = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (line === "") {
            continue; // Skip empty lines
        }

        // Detect and skip continuation markers
        if (
            line.includes(
                "Banking/Debit Card Withdrawals and Purchases continued on next page",
            ) ||
            line.includes("- continued")
        ) {
            skipNext = true;
            continue;
        }

        if (skipNext) {
            // Skip any header or page info lines following the continuation marker
            if (
                /^Page \d+ of \d+$/.test(line) ||
                line.includes("Virtual Wallet Spend Statement") ||
                line.includes("For the period") ||
                line.includes("Primary account number:")
            ) {
                continue;
            }
            skipNext = false;
        }

        if (/^\d{2}\/\d{2}$/.test(line)) {
            // New date found, process the previous transaction
            if (currentTransactionLines.length > 0) {
                const combinedLine = currentTransactionLines.join(" ");
                const match = combinedLine.match(transactionPattern);
                if (match) {
                    transactions.push({
                        date: match[1],
                        amount: match[2].replace(/,/g, ""), // Remove commas from the amount
                        description: match[3].trim(),
                    });
                }
                currentTransactionLines = []; // Reset for the next transaction
            }
        }
        currentTransactionLines.push(line);
    }

    // Handle the last transaction
    if (currentTransactionLines.length > 0) {
        const combinedLine = currentTransactionLines.join(" ");
        const match = combinedLine.match(transactionPattern);
        if (match) {
            transactions.push({
                date: match[1],
                amount: match[2].replace(/,/g, ""), // Remove commas from the amount
                description: match[3].trim(),
            });
        }
    }

    return transactions;
}