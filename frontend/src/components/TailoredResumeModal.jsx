import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, Edit2, Save } from 'lucide-react';
import GoogleDocsTemplate from './GoogleDocsTemplate';

const TailoredResumeModal = ({ isOpen, onClose, content, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localContent, setLocalContent] = useState(content);

    useEffect(() => {
        setLocalContent(content);
    }, [content]);

    const handleSave = () => {
        setIsEditing(false);
        if (onUpdate) {
            onUpdate(localContent);
        }
    };

    const handlePrint = () => {
        const printContent = document.getElementById('resume-preview');
        const windowUrl = 'about:blank';
        const uniqueName = new Date();
        const windowName = 'Print' + uniqueName.getTime();
        const printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');

        printWindow.document.write(`
      <html>
        <head>
          <title>LMatcher Resume</title>
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            @page { margin: 0; }
            body { margin: 0; -webkit-print-color-adjust: exact; }
          </style>
        </head>
        <body class="bg-white">
          ${printContent.innerHTML}
        </body>
      </html>
    `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 500);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-gray-900">LMatcher Document Preview</h2>
                            {isEditing ? (
                                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full flex items-center gap-1">
                                    <Edit2 size={12} /> Editing Mode
                                </span>
                            ) : (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                    Read Only
                                </span>
                            )}
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={20} className="text-gray-500" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-8 bg-gray-100">
                        <div id="resume-preview" className="shadow-2xl mx-auto max-w-[8.5in]">
                            <GoogleDocsTemplate
                                data={localContent}
                                editable={isEditing}
                                onUpdate={setLocalContent}
                            />
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-white sticky bottom-0 z-10">
                        <div className="text-sm text-gray-500">
                            {isEditing ? "Click fields to edit content" : "Review your tailored resume"}
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors shadow-sm font-medium ${isEditing
                                        ? "bg-green-600 hover:bg-green-700 text-white"
                                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
                                {isEditing ? "Save Changes" : "Edit Resume"}
                            </button>

                            <button
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg transition-all shadow-md hover:shadow-lg"
                            >
                                <Printer size={18} />
                                Download PDF
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default TailoredResumeModal;
