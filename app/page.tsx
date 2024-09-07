"use client";

import MainContent from "@/src/views/MainContent/MainContent";
import Sidebar from "@/src/views/SideBar/Sidebar";
import { StatementsProvider } from "@/src/context/statementsContext";
import Card from "@/src/legos/Card/Card";

const Page = () => {
    return (
        <StatementsProvider>
            <div className="w-full h-screen p-4 md:p-8 bg-champagne">
                <Card isVertical={false}>
                    <Sidebar />
                    <MainContent />
                </Card>
            </div>
        </StatementsProvider>
    );
};

export default Page;
