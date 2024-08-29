import { Button } from "@/components/ui/button";
import FileList from "./Filelist/Filelist";
const Sidebar = () => {
    return (
        <div className="col-span-1 bg-khaki rounded-lg shadow-md p-4 flex flex-col gap-4 h-full">
            <div className="flex flex-col">
                <Button className="w-full bg-blush text-champagne">
                    Select Files
                </Button>
            </div>
            <FileList />
        </div>
    );
};

export default Sidebar;
