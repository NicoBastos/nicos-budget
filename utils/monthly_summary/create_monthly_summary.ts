// @ts-ignore
import * as fs from "fs";
// @ts-ignore
import * as path from "path";
// @ts-ignore
import * as pdfParse from "pdf-parse";

interface MonthlySummary {
    month: string;
    beginningBalance: number;
    endingBalance: number;
    totalDeposits: number;
    totalWithdrawals: number;
    totalFees: number;
    averageBalance: number;
}

function extractBalanceSummary(text: string): {
    beginningBalance: number;
    endingBalance: number;
    totalDeposits: number;
    totalWithdrawals: number;
    totalFees: number;
    averageBalance: number;
} {
    const balanceSummaryPattern =
        /Beginning balance\s+(\d+\.\d+)\s+Deposits and other additions\s+(\d+\.\d+)\s+Checks and other deductions\s+(\d+\.\d+)\s+Ending balance\s+(\d+\.\d+)\s+Average monthly balance\s+(\d+\.\d+)/;
    const match = balanceSummaryPattern.exec(text);
    if (match) {
        const [
            _,
            beginningBalance,
            totalDeposits,
            totalWithdrawals,
            endingBalance,
            averageBalance,
        ] = match;
        return {
            beginningBalance: parseFloat(beginningBalance),
            endingBalance: parseFloat(endingBalance),
            totalDeposits: parseFloat(totalDeposits),
            totalWithdrawals: parseFloat(totalWithdrawals),
            totalFees: 0, // Assuming no specific match for total fees
            averageBalance: parseFloat(averageBalance),
        };
    }
    throw new Error("Unable to parse balance summary");
}

async function parsePdfForSummary(pdfPath: string): Promise<MonthlySummary> {
    const fileName = path.basename(pdfPath, path.extname(pdfPath));
    const month = fileName.replace("Statement_", "").replace(/_/g, " ");

    const dataBuffer = fs.readFileSync(pdfPath);
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;

    const balanceSummary = extractBalanceSummary(text);

    return {
        month: month,
        beginningBalance: balanceSummary.beginningBalance,
        endingBalance: balanceSummary.endingBalance,
        totalDeposits: balanceSummary.totalDeposits,
        totalWithdrawals: balanceSummary.totalWithdrawals,
        totalFees: balanceSummary.totalFees,
        averageBalance: balanceSummary.averageBalance,
    };
}

export async function processAllStatementsInFolder(
    folderPath: string,
): Promise<MonthlySummary[]> {
    const files = fs.readdirSync(folderPath);
    const summaries: MonthlySummary[] = [];

    for (const file of files) {
        const filePath = path.join(folderPath, file);
        if (path.extname(file) === ".pdf") {
            try {
                const summary = await parsePdfForSummary(filePath);
                summaries.push(summary);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(
                        `Error processing file ${file}:`,
                        error.message,
                    );
                } else {
                    console.error(`Unknown error processing file ${file}`);
                }
            }
        }
    }

    return summaries;
}
