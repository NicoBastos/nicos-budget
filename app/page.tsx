import Sidebar from "./views/SideBar/sidebar";
import MainContent from "./views/MainContent/mainContent";

const Home = () => {
  return (
    <div className="parent grid grid-cols-4 gap-4 p-4 md:p-8 bg-champagne h-screen">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export default Home;
