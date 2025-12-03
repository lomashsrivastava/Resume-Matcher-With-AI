import React from 'react';

const ResumeTemplate = ({ data, ref }) => {
    if (!data) return null;

    return (
        <div className="bg-white p-8 max-w-[210mm] mx-auto shadow-sm text-gray-900 font-serif leading-relaxed" id="resume-template">
            {/* Header / Contact */}
            <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">Your Name</h1>
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{data.contact}</p>
            </div>

            {/* Summary */}
            <div className="mb-6">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 text-gray-800">Professional Summary</h2>
                <p className="text-sm text-justify">{data.summary}</p>
            </div>

            {/* Skills */}
            <div className="mb-6">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 text-gray-800">Skills</h2>
                <p className="text-sm">{data.skills}</p>
            </div>

            {/* Experience */}
            <div className="mb-6">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 text-gray-800">Experience</h2>
                <div className="text-sm whitespace-pre-wrap">{data.experience}</div>
            </div>

            {/* Education */}
            <div className="mb-6">
                <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 text-gray-800">Education</h2>
                <div className="text-sm whitespace-pre-wrap">{data.education}</div>
            </div>

            {/* Projects */}
            {data.projects && (
                <div className="mb-6">
                    <h2 className="text-lg font-bold uppercase border-b border-gray-300 mb-2 text-gray-800">Projects</h2>
                    <div className="text-sm whitespace-pre-wrap">{data.projects}</div>
                </div>
            )}
        </div>
    );
};

export default ResumeTemplate;
