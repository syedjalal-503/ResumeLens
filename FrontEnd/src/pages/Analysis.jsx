import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  CheckCircle2, UploadCloud, Check, X, ArrowLeft, Loader2,
  Lightbulb, TrendingUp, AlertCircle, BookOpen, Target,
  Award, ChevronRight, Zap, BarChart2
} from "lucide-react";
import API_URL from "../utils/api";
import { GraduationCap, FileText } from "lucide-react";
import { Briefcase } from "lucide-react";

function ScoreRing({ score }) {
  const r = 48;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="9" />
      <circle
        cx="60" cy="60" r={r} fill="none"
        stroke={color} strokeWidth="9"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 60 60)"
        style={{ transition: "stroke-dashoffset 1.2s ease" }}
      />
      <text x="60" y="57" textAnchor="middle" dominantBaseline="middle" fontSize="24" fontWeight="700" fill={color}>{score}</text>
      <text x="60" y="74" textAnchor="middle" fontSize="10" fill="#475569">out of 100</text>
    </svg>
  );
}

const TABS = [
  { id: "overview",     label: "Overview",   Icon: BarChart2   },
  { id: "keywords",     label: "Keywords",   Icon: Target      },
  { id: "suggestions",  label: "Suggestions",Icon: Lightbulb   },
  { id: "strengths",    label: "Strengths",  Icon: TrendingUp  },
  { id: "weaknesses",   label: "Weaknesses", Icon: AlertCircle },
  { id: "roadmap",      label: "Roadmap",    Icon: BookOpen    },
];

const Analysis = () => {
  const location = useLocation();
  const [file, setFile]         = useState(null);
  const [role, setRole]         = useState("");
  const [experience, setExperience] = useState("");
  const [result, setResult]     = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const fileRef = useRef(null);

  useEffect(() => {
    if (location.state?.result) {
      setResult(location.state.result);
      if (location.state.role) setRole(location.state.role);
      if (location.state.experience) setExperience(location.state.experience);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

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
    if (!file)       { setError("Please upload your resume first."); return; }
    if (!role.trim()) { setError("Please enter a target role.");      return; }
    setError(""); setLoading(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("role", role);
      formData.append("experience", experience);
      const res = await fetch(`${API_URL}/analysis`, { method: "POST", body: formData });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Analysis failed");
      }
      const data = await res.json();
      setResult({
        score: data.score, matched: data.matched, missing: data.missing,
        suggestions: data.suggestions, strengths: data.strengths,
        weaknesses: data.weaknesses, overallFeedback: data.overallFeedback,
      });
      setActiveTab("overview");
    } catch (err) {
      setError(err.message || "Failed to analyze resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setResult(null); setFile(null); setRole(""); setExperience(""); setActiveTab("overview"); };

  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition";

  /* ── UPLOAD FORM ─────────────────────────────────────────────── */
  if (!result) return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 mb-4">
            <Zap className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 tracking-wide uppercase">AI-Powered</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
          <div
            role="button" tabIndex={0}
            onClick={() => fileRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
            onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
            className={`mb-6 flex flex-col items-center justify-center gap-2.5 min-h-40 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
              file
                ? "border-green-500/50 bg-green-900/10"
                : "border-white/10 bg-white/3 hover:border-cyan-500/50 hover:bg-cyan-900/10"
            }`}
          >
            {file ? (
              <>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-900/30 border border-green-500/30">
                  <CheckCircle2 className="text-green-400 h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-green-400">{file.name}</p>
                <p className="text-xs text-gray-500">Click to replace</p>
              </>
            ) : (
              <>
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-900/30 border border-cyan-500/20">
                  <UploadCloud className="text-cyan-400 h-5 w-5" />
                </div>
                <p className="text-sm font-semibold text-white">Drop your resume here</p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX </p>
              </>
            )}
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFile} />
          </div>

          <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Target Role <span className="text-red-400">*</span>
              </label>
              <input type="text" placeholder="e.g. Frontend Developer, Data Analyst"
                value={role} onChange={(e) => setRole(e.target.value)} className={inputCls} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Years of Experience
              </label>
              <input type="number" placeholder="e.g. 2" min="0"
                value={experience} onChange={(e) => setExperience(e.target.value)} className={inputCls} />
            </div>
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-red-900/20 border border-red-500/20 px-4 py-3">
                <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            <button type="submit" disabled={loading}
              className="w-full rounded-xl bg-linear-to-r from-cyan-600 to-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-900/30 transition hover:-translate-y-0.5 hover:shadow-cyan-900/50 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing Resume…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Zap className="h-4 w-4" /> Analyze Resume
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  /* ── RESULT VIEW ─────────────────────────────────────────────── */
  const scoreColor = result.score >= 75 ? "#22c55e" : result.score >= 50 ? "#f59e0b" : "#ef4444";
  const scoreLabel = result.score >= 75 ? "ATS Friendly" : result.score >= 50 ? "Needs Optimization" : "High Risk";
  const scoreBadgeCls = result.score >= 75
    ? "bg-green-900/30 text-green-400 border-green-500/30"
    : result.score >= 50
    ? "bg-yellow-900/30 text-yellow-400 border-yellow-500/30"
    : "bg-red-900/30 text-red-400 border-red-500/30";

  const grade =
    result.score >= 90 ? "A+" : result.score >= 80 ? "A"
    : result.score >= 70 ? "B"  : result.score >= 60 ? "C" : "D";

  return (
    <div className="w-[min(1200px,94%)] mx-auto py-10 pb-16 max-[480px]:w-full max-[480px]:py-5 max-[480px]:px-3">
      <div className="flex flex-col gap-6 max-w-5xl mx-auto">

        {/* ── HERO HEADER ── */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-7 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-blue-900/10 pointer-events-none" />
          <div className="relative flex items-start justify-between gap-6 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">Resume Analysis</span>
                <ChevronRight className="h-3 w-3 text-gray-600" />
                <span className="text-xs font-semibold text-cyan-400">{role || "Report"}</span>
              </div>
              <h1 className="text-2xl font-extrabold text-white truncate">{role || "Resume Evaluation"}</h1>
              <p className="text-gray-400 text-sm mt-1">
                {experience ? `${experience} year${experience !== "1" ? "s" : ""} of experience · ` : ""}
                AI-powered ATS compatibility report
              </p>
              <div className="flex flex-wrap gap-2 mt-5">
                {[
                  { label: "Matched", value: result.matched?.length ?? 0, color: "text-green-400 bg-green-900/30 border-green-500/20" },
                  { label: "Missing", value: result.missing?.length ?? 0,  color: "text-red-400 bg-red-900/30 border-red-500/20"   },
                  { label: "Tips",    value: result.suggestions?.length ?? 0, color: "text-cyan-400 bg-cyan-900/30 border-cyan-500/20" },
                ].map(({ label, value, color }) => (
                  <div key={label} className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${color}`}>
                    <span className="text-sm font-bold">{value}</span> {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 shrink-0">
              <ScoreRing score={result.score} />
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${scoreBadgeCls}`}>{scoreLabel}</span>
            </div>
          </div>

          <div className="relative mt-6 rounded-xl bg-white/5 border border-white/8 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400">Resume Grade</span>
              <span className="text-sm font-bold" style={{ color: scoreColor }}>{grade}</span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500 transition-all duration-1000"
                style={{ width: `${result.score}%` }} />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-gray-600">
              <span>Poor (0–49)</span><span>Average (50–74)</span><span>Excellent (75+)</span>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-1.5 flex-wrap rounded-xl bg-white/5 border border-white/8 p-1.5">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === id
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white hover:bg-white/8"
              }`}>
              <Icon className="h-3.5 w-3.5" />
              {label}
              {id === "suggestions" && result.suggestions?.length
                ? <span className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${activeTab === id ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"}`}>{result.suggestions.length}</span>
                : null}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-4 w-4 text-cyan-400" />
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Overall Feedback</p>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{result.overallFeedback}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Score Breakdown</p>
              {[
                { label: "Keyword Match",   pct: Math.round((result.matched?.length / Math.max((result.matched?.length ?? 0) + (result.missing?.length ?? 0), 1)) * 100), color: "#22c55e" },
                { label: "ATS Score",       pct: result.score,  color: "#06b6d4" },
                { label: "Gap Coverage",    pct: Math.max(0, 100 - Math.round(((result.missing?.length ?? 0) / Math.max((result.matched?.length ?? 0) + (result.missing?.length ?? 0), 1)) * 100)), color: "#f59e0b" },
              ].map(({ label, pct, color }) => (
                <div key={label} className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-gray-400">{label}</span>
                    <span className="font-bold text-white">{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── KEYWORDS TAB ── */}
        {activeTab === "keywords" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 animate-in fade-in duration-300">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">Keyword Analysis</p>

            <div className="mb-6 p-4 rounded-xl bg-green-900/10 border border-green-500/15">
              <div className="flex items-center gap-2 mb-3">
                <Check className="h-4 w-4 text-green-400" />
                <p className="text-xs font-bold text-green-400">Matched Keywords — {result.matched?.length ?? 0} found</p>
              </div>
              {result.matched?.length ? (
                <div className="flex flex-wrap gap-2">
                  {result.matched.map((k) => (
                    <span key={k} className="flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-900/25 px-3 py-1 text-xs font-medium text-green-400">
                      <Check className="h-3 w-3" /> {k}
                    </span>
                  ))}
                </div>
              ) : <p className="text-xs text-gray-500">No matched keywords found.</p>}
            </div>

            <div className="p-4 rounded-xl bg-red-900/10 border border-red-500/15">
              <div className="flex items-center gap-2 mb-3">
                <X className="h-4 w-4 text-red-400" />
                <p className="text-xs font-bold text-red-400">Missing Keywords — {result.missing?.length ?? 0} gaps</p>
              </div>
              {result.missing?.length ? (
                <div className="flex flex-wrap gap-2">
                  {result.missing.map((k) => (
                    <span key={k} className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-900/25 px-3 py-1 text-xs font-medium text-red-400">
                      <X className="h-3 w-3" /> {k}
                    </span>
                  ))}
                </div>
              ) : <p className="text-xs text-gray-500">No missing keywords — great coverage!</p>}
            </div>
          </div>
        )}

        {/* ── SUGGESTIONS TAB ── */}
        {activeTab === "suggestions" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-5">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Improvement Suggestions
              </p>
            </div>
            <ul className="flex flex-col gap-3">
              {result.suggestions?.map((s, i) => (
                <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 transition">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-900/50 border border-cyan-500/20 text-cyan-400 text-[11px] font-bold">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-300 leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── STRENGTHS TAB ── */}
        {activeTab === "strengths" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Resume Strengths</p>
            </div>
            <ul className="flex flex-col gap-2.5">
              {result.strengths?.map((s, i) => (
                <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-green-900/15 border border-green-500/15 hover:bg-green-900/20 transition">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-500/20">
                    <Check className="h-3 w-3 text-green-400" />
                  </div>
                  <span className="text-sm text-green-300 leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── WEAKNESSES TAB ── */}
        {activeTab === "weaknesses" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-5">
              <AlertCircle className="h-4 w-4 text-orange-400" />
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Areas for Improvement</p>
            </div>
            <ul className="flex flex-col gap-2.5">
              {result.weaknesses?.map((w, i) => (
                <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-orange-900/15 border border-orange-500/15 hover:bg-orange-900/20 transition">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange-500/20">
                    <AlertCircle className="h-3 w-3 text-orange-400" />
                  </div>
                  <span className="text-sm text-orange-300 leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── ROADMAP TAB ── */}
        {activeTab === "roadmap" && (
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-4 w-4 text-cyan-400" />
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Learning Roadmap</p>
                </div>
                <p className="text-sm text-gray-500">Recommended skills to close your ATS gaps</p>
              </div>
              <div className="rounded-xl border border-green-500/20 bg-green-900/15 px-4 py-2 text-center">
                <p className="text-xs text-gray-400 mb-0.5">Potential Score</p>
                <p className="text-xl font-bold text-green-400">
                  {Math.min(100, result.score + ((result.roadmap?.length || result.missing?.length || 0) * 5))}%
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {(result.roadmap?.length
                ? result.roadmap
                : result.missing?.map((skill, i) => ({
                    skill,
                    duration: i === 0 ? "1–2 Weeks" : i <= 2 ? "2–4 Weeks" : "1–2 Months",
                    reason: "Recommended skill based on ATS analysis and industry demand.",
                  }))
              )?.map((item, index) => {
                const priority = index === 0
                  ? { label: "High Priority", cls: "bg-red-500/10 text-red-400 border-red-500/20" }
                  : index <= 2
                  ? { label: "Recommended",   cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" }
                  :   { label: "Optional",     cls: "bg-green-500/10 text-green-400 border-green-500/20" };
                const projectedScore = Math.min(100, result.score + (index + 1) * 5);

                return (
                  <div key={index}
                    className="rounded-xl border border-white/10 bg-white/5 p-5 hover:border-cyan-500/30 hover:bg-white/8 transition-all">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-white">{item.skill}</h4>
                          <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${priority.cls}`}>
                            {priority.label}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Estimated: {item.duration}</p>
                      </div>
               <div className="flex items-center gap-3">
  <button
    onClick={() =>
      window.open(
        `https://www.udemy.com/courses/search/?q=${encodeURIComponent(item.skill)}`,
        "_blank"
      )
    }
    className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-all duration-200 hover:border-cyan-400/40 hover:bg-cyan-500/20 hover:text-cyan-200"
  >
    <GraduationCap className="h-4 w-4" />
    <span>Courses</span>
  </button>

<button
  onClick={() =>
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(
        `${item.skill} interview questions geeksforgeeks`
      )}`,
      "_blank"
    )
  }
  className="inline-flex items-center gap-2 rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-300 transition-all duration-200 hover:bg-orange-500/20"
>
  <Target className="h-4 w-4" />
  <span>Interview Questions</span>
</button>
</div>
                    </div>

                    <p className="text-xs text-gray-400 leading-relaxed mb-4">{item.reason}</p>

                    <div>
                      <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
                        <span>Current ATS: {result.score}%</span>
                        <span className="text-green-400 font-semibold">Projected: {projectedScore}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-700"
                          style={{ width: `${projectedScore}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── ACTION BAR ── */}
        <div className="flex items-center gap-3 flex-wrap pt-1">
          <button onClick={reset}
            className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition">
            <ArrowLeft className="h-4 w-4" /> New Analysis
          </button>
       <button
  onClick={() =>
    window.open(
      `https://internshala.com/internships/keywords-${encodeURIComponent(
        role
      )}/`,
      "_blank"
    )
  }
  className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-500 transition"
>
  <span>Find Internships</span>
</button>
          <button
            onClick={() => window.open(`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role)}&f_TPR=r3600&sortBy=DD`, "_blank")}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition">
            View Matching Jobs →
          </button>
        </div>

      </div>
    </div>
  );
};

export default Analysis;