import React, { useState } from 'react';
import axios from 'axios';
import { FileText, Briefcase, Loader2, Sparkles, CheckCircle, XCircle, Copy, AlertTriangle, Zap, Layout, User } from 'lucide-react';
import FileUpload from './components/FileUpload';
import ScoreGauge from './components/ScoreGauge';
import KeywordList from './components/KeywordList';

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleAnalyze = async () => {
    if (!file || !jobDescription) {
      setError("Please upload a resume and provide a job description.");
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_description', jobDescription);

    try {
      console.log("Sending request...");
      const response = await axios.post('http://localhost:8000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("Response:", response.data);
      setResult(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze. Backend might be down.");
    } finally {
      setLoading(false);
    }
  };

  const loadDemoData = () => {
    console.log("Loading demo data...");
    setResult({
      score: 85,
      section_status: { "Contact Info": true, "Summary": true, "Skills": true, "Experience": true, "Education": true, "Projects": false },
      contact_checks: { "Email": true, "Phone": true, "LinkedIn": false },
      formatting_issues: ["Some paragraphs are too long."],
      action_verbs: ["led", "developed", "created"],
      soft_skills: ["leadership", "communication"],
      missing_keywords: ["Python", "React", "AWS"],
      present_keywords: ["JavaScript", "HTML", "CSS"],
      recommended_summary: "This is a recommended summary for testing purposes.",
      skills_to_add: "Python, React, AWS",
      is_text_empty: false
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-indigo-500 selection:text-white pb-20">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">LMatcher <span className="text-gray-400 font-light">| Ultimate</span></h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left Column: Inputs */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><FileText className="text-indigo-400" /> Resume</h2>
            <FileUpload onFileSelect={setFile} selectedFile={file} />
          </div>

          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Briefcase className="text-purple-400" /> Job Description</h2>
            <textarea
              className="w-full h-40 p-4 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm text-gray-300"
              placeholder="Paste job description..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Run Deep Analysis"}
          </button>

          <button onClick={loadDemoData} className="text-sm text-gray-400 underline hover:text-white text-center">
            Force Load Demo Data
          </button>

          {error && <div className="p-4 bg-red-900/50 text-red-200 rounded-xl border border-red-500/50 text-sm">{error}</div>}
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-8">
          {!result ? (
            <div className="h-full flex flex-col items-center justify-center bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-700 min-h-[400px]">
              <Sparkles className="w-12 h-12 text-gray-600 mb-4" />
              <p className="text-gray-500">Ready to analyze</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Score */}
              <div className="col-span-1 md:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col items-center">
                <h3 className="text-gray-400 uppercase tracking-wider font-bold mb-4">Match Score</h3>
                <ScoreGauge score={result.score} />
              </div>

              {/* Structure */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Layout className="text-green-400" /> Structure</h3>
                <div className="space-y-2">
                  {Object.entries(result.section_status || {}).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-400">{key}</span>
                      {val ? <CheckCircle size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-500" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Essentials */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="font-bold mb-4 flex items-center gap-2"><User className="text-blue-400" /> Essentials</h3>
                <div className="space-y-2">
                  {Object.entries(result.contact_checks || {}).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-400">{key}</span>
                      <span className={val ? "text-green-400" : "text-red-400"}>{val ? "Found" : "Missing"}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Keywords */}
              <div className="col-span-1 md:col-span-2 bg-gray-800 p-6 rounded-xl border border-gray-700">
                <KeywordList title="Missing Keywords" keywords={result.missing_keywords} type="missing" />
                <KeywordList title="Matching Keywords" keywords={result.present_keywords} type="present" />
              </div>

              {/* Suggestions */}
              <div className="col-span-1 md:col-span-2 bg-indigo-900/20 p-6 rounded-xl border border-indigo-500/30">
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-indigo-300">Recommended Summary</h3>
                  <button onClick={() => copyToClipboard(result.recommended_summary)}><Copy size={16} className="text-indigo-400" /></button>
                </div>
                <p className="text-sm text-indigo-200 font-mono">{result.recommended_summary}</p>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
