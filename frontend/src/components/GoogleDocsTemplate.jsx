import React from 'react';

const GoogleDocsTemplate = ({ data, editable, onUpdate }) => {
    if (!data) return null;

    const handleChange = (section, value) => {
        if (onUpdate) {
            onUpdate({ ...data, [section]: value });
        }
    };

    return (
        <div className="bg-white p-[1in] max-w-[8.5in] min-h-[11in] mx-auto shadow-sm text-black font-serif leading-normal" id="resume-template">
            {/* Header / Contact */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-bold mb-2 uppercase tracking-wide">Your Name</h1>
                {editable ? (
                    <textarea
                        className="w-full text-center text-[11pt] border-none focus:ring-1 focus:ring-blue-200 resize-none overflow-hidden bg-transparent"
                        value={data.contact}
                        onChange={(e) => handleChange('contact', e.target.value)}
                        rows={2}
                    />
                ) : (
                    <p className="text-[11pt]">{data.contact}</p>
                )}
            </div>

            {/* Summary */}
            <div className="mb-6">
                <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-2">Professional Summary</h2>
                {editable ? (
                    <textarea
                        className="w-full text-[11pt] border-none focus:ring-1 focus:ring-blue-200 resize-none overflow-hidden bg-transparent text-justify"
                        value={data.summary}
                        onChange={(e) => handleChange('summary', e.target.value)}
                        rows={4}
                    />
                ) : (
                    <p className="text-[11pt] text-justify">{data.summary}</p>
                )}
            </div>

            {/* Skills */}
            <div className="mb-6">
                <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-2">Skills</h2>
                {editable ? (
                    <textarea
                        className="w-full text-[11pt] border-none focus:ring-1 focus:ring-blue-200 resize-none overflow-hidden bg-transparent"
                        value={data.skills}
                        onChange={(e) => handleChange('skills', e.target.value)}
                        rows={3}
                    />
                ) : (
                    <p className="text-[11pt]">{data.skills}</p>
                )}
            </div>

            {/* Experience */}
            <div className="mb-6">
                <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-2">Experience</h2>
                {editable ? (
                    <textarea
                        className="w-full text-[11pt] border-none focus:ring-1 focus:ring-blue-200 resize-none overflow-hidden bg-transparent whitespace-pre-wrap"
                        value={data.experience}
                        onChange={(e) => handleChange('experience', e.target.value)}
                        rows={10}
                    />
                ) : (
                    <div className="text-[11pt] whitespace-pre-wrap">{data.experience}</div>
                )}
            </div>

            {/* Education */}
            <div className="mb-6">
                <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-2">Education</h2>
                {editable ? (
                    <textarea
                        className="w-full text-[11pt] border-none focus:ring-1 focus:ring-blue-200 resize-none overflow-hidden bg-transparent whitespace-pre-wrap"
                        value={data.education}
                        onChange={(e) => handleChange('education', e.target.value)}
                        rows={4}
                    />
                ) : (
                    <div className="text-[11pt] whitespace-pre-wrap">{data.education}</div>
                )}
            </div>

            {/* Projects */}
            {(data.projects || editable) && (
                <div className="mb-6">
                    <h2 className="text-[12pt] font-bold uppercase border-b border-black mb-2">Projects</h2>
                    {editable ? (
                        <textarea
                            className="w-full text-[11pt] border-none focus:ring-1 focus:ring-blue-200 resize-none overflow-hidden bg-transparent whitespace-pre-wrap"
                            value={data.projects}
                            onChange={(e) => handleChange('projects', e.target.value)}
                            rows={4}
                        />
                    ) : (
                        <div className="text-[11pt] whitespace-pre-wrap">{data.projects}</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default GoogleDocsTemplate;
