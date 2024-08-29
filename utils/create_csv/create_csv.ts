// @ts-ignore
import * as fs from "fs";
// @ts-ignore
import * as path from "path";
// @ts-ignore
import * as pdfParse from "pdf-parse";

interface Transaction {
    date: string;
    amount: string;
    description: string;
}

function parseTransactions(text: string, sectionName: string): Transaction[] {
    const transactions: Transaction[] = [];
    const sectionStart = text.indexOf(sectionName);

    if (sectionStart === -1) {
        return transactions;
    }

    const sectionEnd = text.indexOf("Date", sectionStart + sectionName.length);
    const sectionText = text.substring(sectionStart, sectionEnd);

    const pattern = /(\d{2}\/\d{2})\s+([\d.]+)\s+(.+)/g;
    let match;

    while ((match = pattern.exec(sectionText)) !== null) {
        const [_, date, amount, description] = match;
        transactions.push({ date, amount, description });
    }

    return transactions;
}

function saveToCsv(transactions: Transaction[], filename: string): void {
    const csvHeaders = "Date,Amount,Description\n";
    const csvRows = transactions
        .map((t) => `${t.date},${t.amount},${t.description}`)
        .join("\n");
    const csvContent = csvHeaders + csvRows;

    fs.writeFileSync(filename, csvContent, "utf-8");
    console.log(`Transactions have been saved to ${filename}`);
}

async function parsePdfFile(pdfPath: string): Promise<void> {
    const outputCsv = path.basename(pdfPath, path.extname(pdfPath)) + ".csv";

    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    const sections = [
        "Banking/Debit Card Withdrawals and Purchases",
        "Online and Electronic Banking Deductions",
        "Other Deductions",
    ];

    let allTransactions: Transaction[] = [];

    for (const section of sections) {
        const transactions = parseTransactions(text, section);
        allTransactions = allTransactions.concat(transactions);
    }

    saveToCsv(allTransactions, outputCsv);
}

export async function parseAllPdfsInFolder(folderPath: string): Promise<void> {
    const files = fs.readdirSync(folderPath);

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        if (path.extname(file) === ".pdf") {
            await parsePdfFile(filePath);
        }
    }
}
