// Define the type for the server response
interface Transaction {
    date: string;
    amount: string;
    description: string;
}

interface Statement {
    fileName: string;
    transactions: Transaction[];
}
