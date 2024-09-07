import React from "react";
import FileUpload from "./FileUpload/FileUpload";
import TabbedStatements from "./TabbedStatements/TabbedStatements";
import Card from "@/src/legos/Card/Card";

const Sidebar: React.FC = () => {
    return (
        <div className="bg-khaki rounded-lg shadow-md p-4 gap-4 h-full">
            <h2 className="text-xl text-bistre mb-4">File Upload</h2>
            <Card isVertical={false} childContainerClassName="m-1">
                <FileUpload />
                <TabbedStatements />
            </Card>
        </div>
    );
};

export default Sidebar;
