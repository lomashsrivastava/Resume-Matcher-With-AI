import React from 'react';
import { motion } from 'framer-motion';

const ScoreGauge = ({ score }) => {
    const circumference = 2 * Math.PI * 40; // radius 40
    const strokeDashoffset = circumference - (score / 100) * circumference;

    let color = "text-red-500";
    if (score >= 70) color = "text-yellow-500";
    if (score >= 85) color = "text-green-500";

    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="64"
                    cy="64"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-white/10"
                />
                <motion.circle
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    cx="64"
                    cy="64"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeLinecap="round"
                    className={color}
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className={`text-3xl font-black ${color}`}>{score}%</span>
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Match</span>
            </div>
        </div>
    );
};

export default ScoreGauge;
