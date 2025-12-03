import React from 'react';
import { Check, X } from 'lucide-react';

const KeywordList = ({ title, keywords, type }) => {
    if (!keywords || keywords.length === 0) return null;

    const isPresent = type === 'present';
    const bgColor = isPresent ? 'bg-green-500/20' : 'bg-red-500/20';
    const textColor = isPresent ? 'text-green-300' : 'text-red-300';
    const borderColor = isPresent ? 'border-green-500/30' : 'border-red-500/30';
    const icon = isPresent ? <Check size={14} /> : <X size={14} />;

    return (
        <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
                {title}
                <span className="text-xs bg-gray-700 px-2 py-0.5 rounded-full text-gray-300">{keywords.length}</span>
            </h4>
            <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                    <span
                        key={index}
                        className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm font-medium border ${bgColor} ${textColor} ${borderColor}`}
                    >
                        {icon}
                        {keyword}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default KeywordList;
