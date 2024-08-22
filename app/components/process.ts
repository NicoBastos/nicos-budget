import { parseAllPdfsInFolder } from "./create_csv/create_csv";
import { processAllStatementsInFolder } from "./monthly_summary/create_monthly_summary";

export async function startProcessing(
  csvOutputDir: string,
  pdfInputDir: string
): Promise<void> {
  try {
    // CSV Processing
    await parseAllPdfsInFolder(pdfInputDir);

    // Generating and returning stats
    const summaries = await processAllStatementsInFolder(csvOutputDir);
    console.log("Monthly Summaries:", summaries);
  } catch (error) {
    console.error(error);
  }
}
