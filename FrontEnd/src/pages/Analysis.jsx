import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle2, UploadCloud, Check, X, ArrowLeft, Loader2, Lightbulb, TrendingUp, AlertCircle } from "lucide-react";
import API_URL from "../utils/api";
import CountUp from "react-countup";

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




const Analysis = () => {
  const location = useLocation();
  const [file, setFile] = useState(null);
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("keywords");
const [scrollProgress, setScrollProgress] = useState(0);
  const fileRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.result) {
      setResult(location.state.result);
      if (location.state.role) setRole(location.state.role);
      if (location.state.experience) setExperience(location.state.experience);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;

    const docHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress = (scrollTop / docHeight) * 100;

    setScrollProgress(progress);
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) { setFile(f); setError(""); }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) { setFile(f); setError(""); }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) { setError("Please upload your resume first."); return; }
    if (!role.trim()) { setError("Please enter a target role."); return; }
    setError("");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("role", role);
      formData.append("experience", experience);

      const res = await fetch(`${API_URL}/analysis`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json();
        console.error("Analysis error:", err);
        throw new Error(err.message || "Analysis failed");
      }
      const data = await res.json();
      setResult({
        score: data.score,
        matched: data.matched,
        missing: data.missing,
        suggestions: data.suggestions,
        strengths: data.strengths,
        weaknesses: data.weaknesses,
        overallFeedback: data.overallFeedback,
      });
      setActiveTab("keywords");
    } catch (err) {
      setError(err.message || "Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setResult(null); setFile(null); setRole(""); setExperience(""); setActiveTab("keywords"); };

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition";

  const tabCls = (active) => 
    `px-4 py-2 text-xs font-bold uppercase rounded-lg transition ${
      active 
        ? "bg-cyan-600 text-white" 
        : "bg-white/5 text-gray-400 hover:bg-white/10"
    }`;

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
                <CheckCircle2 className="text-green-400 h-8 w-8" />
                <p className="text-sm font-semibold text-green-400">{file.name}</p>
                <p className="text-xs text-gray-500">Click to change file</p>
              </>
            ) : (
              <>
                <UploadCloud className="text-cyan-400 h-8 w-8" />
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
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                  Analyzing Resume...
                </span>
              ) : "Analyze Resume"}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-5 max-w-4xl mx-auto">
          
  <div className="fixed right-4 top-1/2 -translate-y-1/2 h-64 w-2 bg-white/10 rounded-full z-50">
    <div
      className="w-full rounded-full bg-linear-to-b from-cyan-500 via-blue-500 to-green-500 transition-all duration-150"
      style={{
        height: `${scrollProgress}%`,
      }}
    />
</div>
          <div className="rounded-2xl border border-cyan-500/20 bg-linear-to-r from-cyan-900/20 to-blue-900/20 p-6">
  <div className="flex items-center justify-between flex-wrap gap-4">
    <div>
      <p className="text-cyan-400 text-xs uppercase tracking-[0.2em]">
        Resume Analysis Report
      </p>

      <h1 className="text-3xl font-bold text-white mt-2">
        {role || "Resume Evaluation"}
      </h1>

      <p className="text-slate-400 mt-2">
        AI-powered ATS compatibility assessment
      </p>
    </div>

    <div className="text-right">
      <div className="text-5xl font-black text-white">
        {result.score}
        <span className="text-cyan-400">%</span>
      </div>

      <p className="text-sm text-slate-400">
        ATS Compatibility Score
      </p>
    </div>
  </div>
</div>
          {/* Score + Overall Feedback */}
          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5">
            
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 flex flex-col items-center justify-center gap-2 min-w-45">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400">ATS Score</p>
              <ScoreRing score={result.score} />
              {(() => {
  const grade =
    result.score >= 90 ? "A+" :
    result.score >= 80 ? "A" :
    result.score >= 70 ? "B" :
    result.score >= 60 ? "C" : "D";

  return (
    <div className="w-full mt-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">Resume Grade</span>
        <span className="font-bold text-cyan-400">{grade}</span>
      </div>

      <div className="h-3 rounded-full bg-slate-800 overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-cyan-500 via-blue-500 to-green-500 transition-all duration-1000"
          style={{ width: `${result.score}%` }}
        />
      </div>

      <div className="flex justify-between mt-1 text-[10px] text-gray-500">
        <span>Poor</span>
        <span>Average</span>
        <span>Excellent</span>
      </div>
    </div>
  );
})()}
    
              <p className="text-xs text-center text-gray-500 max-w-37.5">
                Based on keyword matching and formatting
              </p>
              <div className="mt-3">
  <span
    className={`px-3 py-1 rounded-full text-xs font-bold ${
      result.score >= 80
        ? "bg-green-900/30 text-green-400 border border-green-500/30"
        : result.score >= 60
        ? "bg-yellow-900/30 text-yellow-400 border border-yellow-500/30"
        : "bg-red-900/30 text-red-400 border border-red-500/30"
    }`}
  >
    {result.score >= 80
      ? "✓ ATS Friendly"
      : result.score >= 60
      ? "⚠ Needs Optimization"
      : "✗ ATS Risk"}
  </span>
</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Overall Feedback</p>
              <p className="text-sm text-gray-300 leading-relaxed">{result.overallFeedback}</p>
              
              <div className="grid grid-cols-3 gap-3 mt-5">
  <div className="rounded-xl bg-green-900/20 border border-green-500/20 p-3 text-center">
    <div className="text-xl font-bold text-green-400">
      {result.matched?.length || 0}
    </div>
    <div className="text-xs text-gray-400">
      Matched Skills
    </div>
  </div>

  <div className="rounded-xl bg-red-900/20 border border-red-500/20 p-3 text-center">
    <div className="text-xl font-bold text-red-400">
      {result.missing?.length || 0}
    </div>
    <div className="text-xs text-gray-400">
      Missing Skills
    </div>
  </div>

  <div className="rounded-xl bg-cyan-900/20 border border-cyan-500/20 p-3 text-center">
    <div className="text-xl font-bold text-cyan-400">
      {result.suggestions?.length || 0}
    </div>
    <div className="text-xs text-gray-400">
      Suggestions
    </div>
  </div>
</div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex gap-2 flex-wrap rounded-xl bg-white/5 p-2">
            <button onClick={() => setActiveTab("keywords")} className={tabCls(activeTab === "keywords")}>
              Keywords
            </button>
            <button onClick={() => setActiveTab("suggestions")} className={tabCls(activeTab === "suggestions")}>
              Suggestions ({result.suggestions?.length})
            </button>
            <button onClick={() => setActiveTab("strengths")} className={tabCls(activeTab === "strengths")}>
              Strengths
            </button>
            <button
  onClick={() => setActiveTab("roadmap")}
  className={tabCls(activeTab === "roadmap")}
>
  Learning Roadmap
</button>
            <button onClick={() => setActiveTab("weaknesses")} className={tabCls(activeTab === "weaknesses")}>
              Weaknesses
            </button>
            
          </div>

          {/* Keywords Tab */}
          {activeTab === "keywords" && (
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 animate-in fade-in duration-300">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-4">Keyword Analysis</p>
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Check className="h-4 w-4 text-green-400" />
                  <p className="text-xs font-semibold text-green-400">Matched Keywords ({result.matched?.length || 0})</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.matched?.map((k) => (
                    <span key={k} className="flex items-center gap-1 rounded-full border border-green-500/30 bg-green-900/20 px-2.5 py-1 text-xs font-medium text-green-400">
                      <Check className="h-3 w-3" /> {k}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <X className="h-4 w-4 text-red-400" />
                  <p className="text-xs font-semibold text-red-400">Missing Keywords ({result.missing?.length || 0})</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.missing?.map((k) => (
                    <span key={k} className="flex items-center gap-1 rounded-full border border-red-500/30 bg-red-900/20 px-2.5 py-1 text-xs font-medium text-red-400">
                      <X className="h-3 w-3" /> {k}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Suggestions Tab */}
          {activeTab === "suggestions" && (
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-4 w-4 text-yellow-400" />
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Improvement Suggestions ({result.suggestions?.length})</p>
              </div>
              <ul className="flex flex-col gap-3">
                {result.suggestions?.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-900/40 text-cyan-400 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-300 leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Strengths Tab */}
          {activeTab === "strengths" && (
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-green-400" />
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Resume Strengths</p>
              </div>
              <ul className="flex flex-col gap-2">
                {result.strengths?.map((s, i) => (
                  <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-green-900/20 border border-green-500/20">
                    <Check className="h-4 w-4 text-green-400 shrink-0" />
                    <span className="text-sm text-green-300">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Weaknesses Tab */}
          {activeTab === "weaknesses" && (
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="h-4 w-4 text-orange-400" />
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Areas for Improvement</p>
              </div>
              <ul className="flex flex-col gap-2">
                {result.weaknesses?.map((w, i) => (
                  <li key={i} className="flex items-center gap-3 p-3 rounded-lg bg-orange-900/20 border border-orange-500/20">
                    <AlertCircle className="h-4 w-4 text-orange-400 shrink-0" />
                    <span className="text-sm text-orange-300">{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        {activeTab === "roadmap" && (
  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">

    {/* Header */}
    <div>
      <h3 className="text-xl font-bold text-white">
        Professional Development Plan
      </h3>

      <p className="text-sm text-gray-400 mt-1">
        Recommended skills to improve ATS performance and job readiness.
      </p>
    </div>

    {/* Roadmap Items */}
    <div className="space-y-5 mt-6">

      {(result.roadmap?.length
        ? result.roadmap
        : result.missing?.map((skill) => ({
            skill,
            duration: "1-2 Weeks",
            reason:
              "Recommended skill based on ATS analysis and industry demand.",
          }))
      )?.map((item, index) => (

        <div
          key={index}
          className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-cyan-500/40 hover:bg-white/10 transition-all"
        >

          {/* Skill Header */}
          <div className="flex items-center justify-between">

            <div>
              <h4 className="font-semibold text-white">
                {item.skill}
              </h4>

              <span
                className={`mt-2 inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                  index === 0
                    ? "bg-red-500/10 text-red-400"
                    : index <= 2
                    ? "bg-yellow-500/10 text-yellow-400"
                    : "bg-green-500/10 text-green-400"
                }`}
              >
                {index === 0
                  ? "High Priority"
                  : index <= 2
                  ? "Recommended"
                  : "Optional"}
              </span>
            </div>

            <div className="text-right">
              <p className="text-cyan-400 font-semibold">
                {item.duration}
              </p>

              <p className="text-xs text-gray-500">
                Estimated Learning Time
              </p>
            </div>

          </div>

          {/* Reason */}
          <p className="text-sm text-gray-300 mt-4">
            {item.reason}
          </p>

          {/* ATS Projection */}
          <div className="mt-4">

            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>Current ATS</span>
              <span>Projected ATS</span>
            </div>

            <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-green-500"
                style={{
                  width: `${Math.min(
                    100,
                    result.score + (index + 1) * 5
                  )}%`,
                }}
              />
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-sm text-white">
                {result.score}%
              </span>

              <span className="text-sm font-bold text-green-400">
                {Math.min(
                  100,
                  result.score + (index + 1) * 5
                )}%
              </span>
            </div>

          </div>

          {/* Learning Resource */}
          <div className="mt-5 flex items-center justify-between">

            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Learning Resource
              </p>

              <p className="text-white font-medium">
                {item.skill}
              </p>
            </div>

            <button
              onClick={() =>
                window.open(
                  `https://www.udemy.com/courses/search/?q=${encodeURIComponent(
                    item.skill
                  )}`,
                  "_blank"
                )
              }
              className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-400 transition hover:bg-cyan-500/20"
            >
              Explore Courses
            </button>

          </div>

        </div>

      ))}

    </div>

    {/* Final ATS Potential */}
    <div className="mt-8 rounded-xl border border-green-500/20 bg-green-500/10 p-4">

      <div className="flex items-center justify-between">

        <div>
          <p className="font-semibold text-green-400">
            Potential ATS Score
          </p>

          <p className="text-sm text-gray-400">
            After completing all recommended skills
          </p>
        </div>

        <div className="text-3xl font-bold text-green-400">
          {Math.min(
            100,
            result.score +
              ((result.roadmap?.length || result.missing?.length || 0) * 5)
          )}
          %
        </div>

      </div>

    </div>

  </div>
)}
         
          <div className="flex items-center gap-3 flex-wrap">
  <button
    onClick={reset}
    className="flex items-center rounded-xl border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
  >
    <ArrowLeft className="h-4 w-4 mr-2" />
    Analyze Another Resume
  </button>

      <button
        onClick={() =>
          window.open(
            `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
              role
            )}&f_TPR=r3600&sortBy=DD`,
            "_blank"
          )
        }
        className="flex items-center rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
       View Matching Jobs
      </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
