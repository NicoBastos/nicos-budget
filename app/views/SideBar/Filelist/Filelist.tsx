const FileList = () => {
    return (
        <div className="flex-grow overflow-auto">
            <ul className="list-disc pl-5 mt-2">
                <li className="text-resedaGreen">File1.txt - 150KB</li>
                <li className="text-resedaGreen">File2.jpg - 2MB</li>
            </ul>
            <p className="text-bistre mt-2">
                Metadata and details can be shown here.
            </p>
        </div>
    );
};

export default FileList;
