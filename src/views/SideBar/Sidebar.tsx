import React from "react";
import { useStatements } from "@/src/context/statementsContext";
import FileUpload from "./FileUpload/FileUpload";
import TabbedStatements from "./TabbedStatements/TabbedStatements";

const Sidebar: React.FC = () => {
    const { statements, setStatements } = useStatements();

    return (
        <div className="col-span-1 bg-khaki rounded-lg shadow-md p-4 flex flex-col gap-4 h-full">
            <h2 className="text-xl text-bistre mb-4">File Upload</h2>
            <FileUpload />
            <TabbedStatements />
        </div>
    );
};

export default Sidebar;
