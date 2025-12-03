import React, { useCallback } from 'react';
import { Upload, FileText } from 'lucide-react';

const FileUpload = ({ onFileSelect, selectedFile }) => {
    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file && file.type === 'application/pdf') {
            onFileSelect(file);
        }
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            onFileSelect(file);
        }
    };

    return (
        <div
            className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-indigo-500 hover:bg-white/5 transition-all cursor-pointer bg-transparent group"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput').click()}
        >
            <input
                type="file"
                id="fileInput"
                className="hidden"
                accept=".pdf"
                onChange={handleChange}
            />
            <div className="flex flex-col items-center gap-4">
                <div className="p-4 bg-indigo-500/20 rounded-full group-hover:scale-110 transition-transform duration-300">
                    {selectedFile ? <FileText className="w-8 h-8 text-indigo-400" /> : <Upload className="w-8 h-8 text-indigo-400" />}
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-white">
                        {selectedFile ? selectedFile.name : "Upload your Resume"}
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                        {selectedFile ? "Click to change" : "Drag & drop or click to browse (PDF only)"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FileUpload;
