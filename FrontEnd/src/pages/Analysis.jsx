import { useState, useRef } from "react";

function ScoreRing({ score }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";
  const label = score >= 75 ? "Great Match" : score >= 50 ? "Average Match" : "Needs Work";

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="136" height="136" viewBox="0 0 136 136">
        <circle cx="68" cy="68" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <circle
          cx="68" cy="68" r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 68 68)"
          style={{ transition: "stroke-dashoffset 1.2s ease" }}
        />
        <text x="68" y="66" textAnchor="middle" dominantBaseline="middle" fontSize="26" fontWeight="700" fill={color}>{score}</text>
        <text x="68" y="86" textAnchor="middle" fontSize="10" fill="#64748b">/ 100</text>
      </svg>
      <p className="text-sm font-semibold" style={{ color }}>{label}</p>
    </div>
  );
}

const MATCHED = ["Communication", "Problem Solving", "Teamwork", "JavaScript", "React", "Python"];
const MISSING = ["Docker", "CI/CD", "TypeScript", "AWS", "Agile", "Kubernetes"];

function buildSuggestions(role) {
  return [
    `Add quantifiable achievements for ${role} (e.g., "reduced load time by 35%")`,
    "Use strong action verbs: built, led, optimized, shipped, designed",
    "Add a LinkedIn URL in your contact section",
    `Include certifications or courses relevant to ${role}`,
    "Keep resume to 1–2 pages; remove outdated or irrelevant roles",
  ];
}

const Analysis = () => {
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) { setFile(f); setError(""); }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) { setFile(f); setError(""); }
  };

  const handleAnalyze = (e) => {
    e.preventDefault();
    if (!file) { setError("Please upload your resume first."); return; }
    if (!role.trim()) { setError("Please enter a target role."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      const score = Math.floor(55 + Math.random() * 31);
      setResult({ score, matched: MATCHED, missing: MISSING, suggestions: buildSuggestions(role) });
      setLoading(false);
    }, 1800);
  };

  const reset = () => { setResult(null); setFile(null); setRole(""); setExperience(""); };

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition";

  return (
    <div className="w-[min(1280px,94%)] min-h-full mx-auto py-9 pb-14 max-[680px]:w-[min(1280px,96%)] max-[680px]:py-6 max-[480px]:w-full max-[480px]:py-4 max-[480px]:px-3">
      {!result ? (
        <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 max-[480px]:p-5">
          <h1 className="text-2xl font-extrabold text-white mb-1">ATS Resume Analysis</h1>
          <p className="text-gray-400 text-sm mb-6">
            Upload your resume and get an instant ATS score with keyword insights.
          </p>

          {/* Drop zone */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => fileRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`mb-5 flex flex-col items-center justify-center gap-2 min-h-36 rounded-xl border-2 border-dashed cursor-pointer transition ${
              file
                ? "border-green-500/50 bg-green-900/20"
                : "border-cyan-700/40 bg-white/5 hover:border-cyan-500/60 hover:bg-white/10"
            }`}
          >
            {file ? (
              <>
                <i className="fa-regular fa-circle-check text-green-400 text-3xl"></i>
                <p className="text-sm font-semibold text-green-400">{file.name}</p>
                <p className="text-xs text-gray-500">Click to change file</p>
              </>
            ) : (
              <>
                <i className="fa-solid fa-cloud-arrow-up text-cyan-400 text-3xl"></i>
                <p className="text-sm font-semibold text-white">Click or drag to upload resume</p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX supported</p>
              </>
            )}
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
          </div>

          <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5">
                Target Role <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Frontend Developer, Data Analyst"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wide text-gray-400 mb-1.5">
                Years of Experience
              </label>
              <input
                type="number"
                placeholder="e.g. 2"
                min="0"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className={inputCls}
              />
            </div>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-linear-to-r from-cyan-600 to-cyan-500 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-900/40 transition hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Analyzing Resume...
                </span>
              ) : "Analyze Resume"}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-5 max-w-3xl mx-auto">
          {/* Score + Keywords */}
          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 flex flex-col items-center justify-center gap-2 min-w-45">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400">ATS Score</p>
              <ScoreRing score={result.score} />
              <p className="text-xs text-center text-gray-500 max-w-37.5">
                Based on keyword matching and formatting
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-4">Keyword Analysis</p>
              <div className="mb-4">
                <p className="text-xs font-semibold text-green-400 mb-2">Matched Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {result.matched.map((k) => (
                    <span key={k} className="flex items-center gap-1 rounded-full border border-green-500/30 bg-green-900/20 px-2.5 py-1 text-xs font-medium text-green-400">
                      <i className="fa-solid fa-check text-[10px]"></i> {k}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-400 mb-2">Missing Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {result.missing.map((k) => (
                    <span key={k} className="flex items-center gap-1 rounded-full border border-red-500/30 bg-red-900/20 px-2.5 py-1 text-xs font-medium text-red-400">
                      <i className="fa-solid fa-xmark text-[10px]"></i> {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-4">Improvement Suggestions</p>
            <ul className="flex flex-col gap-3">
              {result.suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-900/40 text-cyan-400 text-xs font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-300 leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={reset}
            className="self-start rounded-xl border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            ← Analyze Another Resume
          </button>
        </div>
      )}
    </div>
  );
};

export default Analysis;
