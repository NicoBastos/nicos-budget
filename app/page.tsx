"use client";

import MainContent from "@/src/views/MainContent/MainContent";
import Sidebar from "@/src/views/SideBar/Sidebar";
import { StatementsProvider } from "@/src/context/statementsContext";

const Home = () => {
    return (
        <StatementsProvider>
            <div className="parent grid grid-cols-4 gap-4 p-4 md:p-8 bg-champagne h-screen">
                <Sidebar />
                <MainContent />
            </div>
        </StatementsProvider>
    );
};

export default Home;
