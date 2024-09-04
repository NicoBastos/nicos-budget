// Sidebar.tsx
import React, { useState } from "react";
import { useStatements } from "@/src/context/statementsContext";
import FileUpload from "./FileUpload/FileUpload";
import TabbedStatements from "./TabbedStatements/TabbedStatements";

const Sidebar: React.FC = () => {
    const [focusedComponent, setFocusedComponent] = useState<
        "fileUpload" | "tabbedStatements" | null
    >(null);

    return (
        <div className="col-span-1 bg-khaki rounded-lg shadow-md p-4 flex flex-col gap-4 h-full">
            <h2 className="text-xl text-bistre mb-4">File Upload</h2>
            <div
                className={
                    focusedComponent === "tabbedStatements"
                        ? "h-10 overflow-hidden transition-height duration-300 ease-in-out"
                        : "flex-grow transition-height duration-300 ease-in-out"
                }
                tabIndex={0}
                onFocus={() => setFocusedComponent("fileUpload")}
                onBlur={() => setFocusedComponent(null)}
            >
                <FileUpload />
            </div>
            <div
                className={
                    focusedComponent === "fileUpload"
                        ? "h-10 overflow-hidden transition-height duration-300 ease-in-out"
                        : "flex-grow transition-height duration-300 ease-in-out"
                }
                tabIndex={0}
                onFocus={() => setFocusedComponent("tabbedStatements")}
                onBlur={() => setFocusedComponent(null)}
            >
                <TabbedStatements />
            </div>
        </div>
    );
};

export default Sidebar;
