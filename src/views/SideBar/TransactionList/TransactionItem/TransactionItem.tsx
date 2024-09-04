import React, { useState } from "react";

interface Props {
    transaction: Transaction;
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

const TransactionItem: React.FC<Props> = ({ transaction, setTransactions }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTransaction, setEditedTransaction] =
        useState<Transaction>(transaction);

    const handleInputChange = (field: keyof Transaction, value: string) => {
        setEditedTransaction({ ...editedTransaction, [field]: value });
    };

    const handleSave = () => {
        // Implement save logic here to update the transaction
        setIsEditing(false);
    };

    const handleEditToggle = () => setIsEditing(!isEditing);

    return (
        <tr className="border-2">
            <td className={`p-1 ${isEditing ? "bg-cream" : ""}`}>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTransaction.date}
                        onChange={(e) =>
                            handleInputChange("date", e.target.value)
                        }
                        className="w-full p-2 bg-blush rounded"
                    />
                ) : (
                    transaction.date
                )}
            </td>
            <td className={`p-1 ${isEditing ? "bg-cream" : ""}`}>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTransaction.amount}
                        onChange={(e) =>
                            handleInputChange("amount", e.target.value)
                        }
                        className="w-full p-2 bg-blush rounded"
                    />
                ) : (
                    transaction.amount
                )}
            </td>
            <td className={`p-1 ${isEditing ? "bg-cream" : ""}`}>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedTransaction.description}
                        onChange={(e) =>
                            handleInputChange("description", e.target.value)
                        }
                        className="w-full p-2 bg-blush rounded"
                    />
                ) : (
                    transaction.description
                )}
            </td>
            <td className="p-1 text-right">
                {isEditing ? (
                    <button
                        className="bg-teal text-cream px-4 py-2 rounded"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                ) : (
                    <button
                        className="bg-teal text-cream px-4 py-2 rounded"
                        onClick={handleEditToggle}
                    >
                        Edit
                    </button>
                )}
            </td>
        </tr>
    );
};

export default TransactionItem;
