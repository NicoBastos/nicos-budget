import React, { useState } from "react";

// Define the props for the component, including functions for delete and edit
interface TransactionItemProps {
    transaction: Transaction;
    onDelete: (transaction: Transaction) => void;
    onEdit: (transaction: Transaction) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
    transaction,
    onDelete,
    onEdit,
}) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTransaction, setEditedTransaction] = useState<Transaction>({
        ...transaction,
    });

    const handleEditToggle = (): void => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setEditedTransaction((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = (): void => {
        onEdit(editedTransaction);
        setIsEditing(false);
    };

    return (
        <div className="border border-bistre p-4 mb-4 bg-silver rounded-lg">
            {isEditing ? (
                <div className="space-y-2">
                    <input
                        type="text"
                        name="date"
                        value={editedTransaction.date}
                        onChange={handleChange}
                        placeholder="Date"
                        className="p-2 bg-cream border border-bistre rounded-md w-full"
                    />
                    <input
                        type="text"
                        name="amount"
                        value={editedTransaction.amount}
                        onChange={handleChange}
                        placeholder="Amount"
                        className="p-2 bg-cream border border-bistre rounded-md w-full"
                    />
                    <input
                        type="text"
                        name="description"
                        value={editedTransaction.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="p-2 bg-cream border border-bistre rounded-md w-full"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleSave}
                            className="p-2 bg-teal text-champagne rounded-md"
                        >
                            Save
                        </button>
                        <button
                            onClick={handleEditToggle}
                            className="p-2 bg-blush text-champagne rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <p>
                        <strong>Date:</strong> {transaction.date}
                    </p>
                    <p>
                        <strong>Amount:</strong> {transaction.amount}
                    </p>
                    <p>
                        <strong>Description:</strong> {transaction.description}
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={handleEditToggle}
                            className="p-2 bg-teal text-champagne rounded-md"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete(transaction)}
                            className="p-2 bg-burntSienna text-champagne rounded-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionItem;
