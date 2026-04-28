import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "fa-solid fa-chart-line",
    title: "ATS Compatibility Score",
    desc: "Know exactly how well your resume performs against applicant tracking systems used by top companies.",
    color: "#0891b2",
  },
  {
    icon: "fa-solid fa-lightbulb",
    title: "Smart Suggestions",
    desc: "Get AI-powered recommendations to strengthen your bullets, add missing keywords, and improve clarity.",
    color: "#7c3aed",
  },
  {
    icon: "fa-solid fa-file-pen",
    title: "Resume Builder",
    desc: "Create a professional resume from scratch using 8 beautiful templates with a real-time live preview.",
    color: "#0f766e",
  },
  {
    icon: "fa-solid fa-bullseye",
    title: "Role-Based Optimization",
    desc: "Tailor your resume to specific job descriptions and increase your chances of landing interviews.",
    color: "#dc2626",
  },
];

const steps = [
  { step: "01", title: "Upload Your Resume", desc: "Drop your PDF or Word resume file." },
  { step: "02", title: "Enter Target Role", desc: "Tell us what job you are applying for." },
  { step: "03", title: "Get Your ATS Score", desc: "Instant analysis with detailed feedback." },
  { step: "04", title: "Improve & Apply", desc: "Apply the suggestions and land more interviews." },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-700/50 bg-cyan-900/40 px-4 py-1.5 text-sm font-semibold text-cyan-400">
          <i className="fa-solid fa-bolt"></i>
          AI-Powered Resume Analysis
        </span>
        <h1 className="mb-5 max-w-3xl text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-tight">
          Land Your Dream Job with a{" "}
          <span className="text-cyan-400">Perfect Resume</span>
        </h1>
        <p className="mb-9 max-w-xl text-[clamp(0.95rem,1.5vw,1.1rem)] leading-relaxed text-gray-300">
          Upload your resume, get an instant ATS compatibility score, and receive
          actionable suggestions to stand out from hundreds of applicants.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/signup")}
            className="rounded-xl bg-linear-to-r from-cyan-600 to-cyan-500 px-8 py-3 text-base font-bold shadow-lg shadow-cyan-900/40 transition hover:-translate-y-0.5"
          >
            Get Started Free
          </button>
          <button
            onClick={() => navigate("/signin")}
            className="rounded-xl border border-gray-600 bg-gray-800 px-8 py-3 text-base font-bold transition hover:-translate-y-0.5 hover:bg-gray-700"
          >
            Sign In
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-[min(1200px,90%)] pb-20">
        <h2 className="mb-10 text-center text-2xl font-bold">
          Everything you need to get hired
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-white/20"
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg"
                style={{ background: f.color + "33", color: f.color }}
              >
                <i className={f.icon}></i>
              </div>
              <h3 className="mb-2 text-sm font-bold text-white">{f.title}</h3>
              <p className="text-xs leading-relaxed text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto w-[min(1200px,90%)] pb-24">
        <h2 className="mb-10 text-center text-2xl font-bold">How it works</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.step} className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-cyan-600 text-xl font-extrabold text-cyan-400">
                {s.step}
              </div>
              <h3 className="mb-1.5 text-sm font-bold text-white">{s.title}</h3>
              <p className="text-xs text-gray-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom */}
      <section className="mx-auto w-[min(860px,90%)] mb-20 rounded-3xl border border-cyan-800/40 bg-linear-to-br from-cyan-900/40 to-gray-800 p-12 text-center shadow-xl">
        <h2 className="mb-3 text-2xl font-extrabold">Ready to get started?</h2>
        <p className="mb-7 text-sm text-gray-300">
          Join thousands of job seekers who improved their resumes and landed more interviews.
        </p>
        <button
          onClick={() => navigate("/signup")}
          className="rounded-xl bg-linear-to-r from-cyan-600 to-cyan-500 px-9 py-3 text-base font-bold shadow-lg transition hover:-translate-y-0.5"
        >
          Create Free Account
        </button>
      </section>
    </div>
  );
};

export default LandingPage;
