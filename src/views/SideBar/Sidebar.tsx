import React from "react";
import FileUpload from "./FileUpload/FileUpload";
import TransactionList from "./TransactionList/TransactionList";

const Sidebar: React.FC = () => {
    return (
        <div className="col-span-1 bg-khaki rounded-lg shadow-md p-4 flex flex-col gap-4 h-full">
            <h2 className="text-xl text-bistre mb-4">File Upload</h2>
            <FileUpload />
            <TransactionList />
        </div>
    );
};

export default Sidebar;
