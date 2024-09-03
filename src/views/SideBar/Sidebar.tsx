import { Button } from "@/src/components/ui/button";
import FileList from "./Filelist/Filelist";
import FileUpload from "./FileUpload/FileUpload";
const Sidebar = () => {
    return (
        <div className="col-span-1 bg-khaki rounded-lg shadow-md p-4 flex flex-col gap-4 h-full">
            <div className="flex flex-col">
                {/* <Button className="w-full bg-blush text-champagne">
                    Select Files
                </Button> */}
            <FileUpload />
            </div>
        </div>
    );
};

export default Sidebar;
