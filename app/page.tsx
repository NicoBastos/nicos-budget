import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="parent grid grid-cols-4 grid-rows-2 gap-4 p-4 md:p-8 bg-gray-100">
      <div className="div2 col-span-2 md:col-span-1 row-span-1 bg-red-500 rounded-lg shadow-md p-4">
        2
      </div>
      <div className="div3 col-span-2 md:col-span-1 row-span-1 md:row-start-2 bg-green-500 rounded-lg shadow-md p-4">
        3
      </div>
      <div className="div1 col-span-4 md:col-start-2 md:col-span-3 row-span-1 md:row-span-2 bg-blue-500 rounded-lg shadow-md p-4">
        1
      </div>
    </div>
  );
};

export default Home;
