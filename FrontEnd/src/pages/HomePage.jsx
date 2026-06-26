
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Lightbulb,
  Target,
  TrendingUp,
  UploadCloud,
  Loader2,
} from "lucide-react";
import API_URL from "../utils/api";


// Add animation styles
const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(6, 182, 212, 0.4);
    }
    50% {
      box-shadow: 0 0 30px rgba(6, 182, 212, 0.8);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes gradientShift {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .animate-fadeInUp {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animate-fadeInScale {
    animation: fadeInScale 0.5s ease-out forwards;
  }

  .animate-slideInRight {
    animation: slideInRight 0.6s ease-out forwards;
  }

  .animate-slideInLeft {
    animation: slideInLeft 0.6s ease-out forwards;
  }

  .animate-glow {
    animation: glow 3s ease-in-out infinite;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .group:hover .group-hover\\:animate-glow {
    animation: glow 3s ease-in-out infinite;
  }

  .stagger-delay-1 { animation-delay: 0.1s; }
  .stagger-delay-2 { animation-delay: 0.2s; }
  .stagger-delay-3 { animation-delay: 0.3s; }
  .stagger-delay-4 { animation-delay: 0.4s; }
  .stagger-delay-5 { animation-delay: 0.5s; }
`;

const features = [
  {
    icon: TrendingUp,
    title: "ATS Compatibility Score",
    desc: "Check how well your resume matches modern applicant tracking systems.",
    color: "#0891b2",
  },
  {
    icon: Lightbulb,
    title: "Smart Content Suggestions",
    desc: "Improve weak bullets, keywords, and phrasing using practical AI recommendations.",
    color: "#7c3aed",
  },
  {
    icon: Target,
    title: "Role-Focused Optimization",
    desc: "Tailor your resume for specific job descriptions and increase interview chances.",
    color: "#0f766e",
  },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{animationStyles}</style>
      <div className="mx-auto w-[min(1280px,92%)] py-9 pb-14 max-[680px]:w-[min(1280px,96%)] max-[680px]:py-6 max-[480px]:w-full max-[480px]:px-3 max-[480px]:py-4">
        <section className="mb-6 grid grid-cols-1 items-center gap-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm lg:grid-cols-[1.1fr_0.9fr] max-[680px]:p-5 max-[480px]:rounded-xl max-[480px]:p-4 overflow-hidden">
          <div className="flex flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-700/50 bg-cyan-900/40 px-4 py-1.5 text-sm font-semibold text-cyan-400 animate-fadeInScale stagger-delay-1">
              <CheckCircle2 className="h-4 w-4 animate-pulse" />
              AI-Resume Analyzer
            </span>

            <h1 className="text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.07] text-white max-[680px]:text-[clamp(1.8rem,8vw,2.6rem)] animate-fadeInUp stagger-delay-2">
              Transform Your Resume with{" "}
              <span className=" bg-linear-to-r from-cyan-400 via-cyan-300 to-cyan-400 bg-clip-text text-transparent animate-pulse">AI Intelligence</span>
            </h1>

            <p className="max-w-[60ch] text-[clamp(0.95rem,1.4vw,1.05rem)] leading-[1.7] text-gray-300 max-[680px]:max-w-none animate-fadeInUp stagger-delay-3">
              Get instant insights into your resume with Resume Analyzer, and
              increase your chances of landing your dream job.
            </p>

            <div className="flex flex-wrap gap-3 max-[680px]:w-full">
              <button
                type="button"
                className="rounded-xl bg-linear-to-r from-cyan-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-900/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/50 max-[680px]:flex-[1_1_100%] animate-fadeInUp stagger-delay-4 active:scale-95"
                onClick={() => navigate("/analysis")}
                
              >
                Analyze Resume
              </button>
              <button
                type="button"
                className="rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:border-cyan-400/50 max-[680px]:flex-[1_1_100%] animate-fadeInUp stagger-delay-5 active:scale-95"
                onClick={() => navigate("/resume")}
              >
                Build from Scratch
              </button>
            </div>
          </div>

<div className="w-[400px] h-[400px] flex items-center justify-center overflow-hidden rounded-full border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-105 hover:shadow-cyan-500/30">
  <img
    src="/logo.jpg"
    alt="Resume Analysis Illustration"
    className="w-[320px] h-[320px] object-cover rounded-full"
  />
</div>
            </section>
        {/* Popular Roles */}
<section className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm overflow-hidden">
  <h2 className="text-2xl font-bold text-white text-center mb-5">
    Analyze Your Resume For Any Role
  </h2>

  <div className="flex flex-wrap justify-center gap-3">
    {[
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Analyst",
      "Data Scientist",
      "UI/UX Designer",
      "DevOps Engineer",
      "Cloud Engineer",
      "Software Engineer",
      "Product Manager",
      "Cybersecurity Analyst",
      "AI Engineer",
    ].map((role) => (
      <span
        key={role}
        className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 transition-all duration-300 hover:scale-105 hover:bg-cyan-500/20"
      >
        {role}
      </span>
    ))}
  </div>
</section>
        <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className={`rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-900/30 max-[480px]:rounded-xl animate-fadeInScale cursor-pointer group stagger-delay-${index + 1}`}
                style={{
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: `${feature.color}33`, 
                    color: feature.color,
                  }}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mb-2 text-sm font-bold text-white transition-colors duration-300 group-hover:text-cyan-400">{feature.title}</h3>
                <p className="text-xs leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-300">{feature.desc}</p>
                
                {/* Animated accent line */}
                <div className="mt-3 h-0.5 w-0 bg-linear-to-r from-cyan-400 to-transparent transition-all duration-300 group-hover:w-full"></div>
              </article>
            );
          })}
        </section>

        <section className="mb-6 grid  grid-cols-1 gap-4 lg:grid-cols-2 animate-fadeInUp stagger-delay-5">
          {/* Resume Upload Area */}
          <div className="rounded-2xl border-2 border-dashed  border-cyan-700/40 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-cyan-500 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-900/30 max-[480px]:rounded-xl cursor-pointer group"
           onClick={()=> navigate("/analysis")}  >
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-linear-to-br from-cyan-900 to-cyan-900/60 transition-all duration-300 group-hover:scale-110 group-hover:bg-linear-to-br ">
                <UploadCloud className="h-8 w-8 text-cyan-400 animate-float" />
              </div>
              <div className="animate-fadeInUp stagger-delay-1">
                <h3 className="mb-1 text-sm font-bold text-white">Upload Resume</h3>
                <p className="text-xs text-gray-400">PDF, DOC, DOCX </p>
              </div>
              <div className="h-0.5 w-0 bg-linear-to-r from-cyan-400 to-transparent transition-all duration-300 group-hover:w-full"></div>
            </div>
          </div>

          {/* Analysis Results Preview */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm max-[480px]:rounded-xl">
            <div className="space-y-4">
              <div className="animate-fadeInScale stagger-delay-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white">ATS Score</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-900/30 px-2 py-1 text-xs font-semibold text-green-400 animate-pulse">
                    <CheckCircle2 className="h-3 w-3" /> LOADING
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full w-[85%] rounded-full bg-linear-to-r from-cyan-500 to-cyan-400 animate-fadeInScale transition-all duration-1000"></div>
                </div>
              </div>

              <div className="space-y-2 animate-fadeInScale stagger-delay-2">
                <p className="text-xs font-semibold text-white">Keywords Matched:</p>
                <div className="flex flex-wrap gap-1">
                  {['React', 'JavaScript', 'Node.js', 'MongoDB'].map((skill, idx) => (
                    <span
                      key={skill}
                      className="inline-block rounded-full bg-green-900/40 px-2.5 py-1 text-xs font-semibold text-green-400 animate-fadeInScale transition-all duration-300 hover:scale-105"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 animate-fadeInScale stagger-delay-3">
                <p className="text-xs font-semibold text-white">Suggestions:</p>
                <ul className="space-y-1">
                  {['Add more metrics', 'Include certifications', 'Enhance skills'].map((suggestion, idx) => (
                    <li
                      key={suggestion}
                      className="flex items-center gap-2 text-xs text-gray-300 animate-fadeInUp transition-all duration-300 hover:text-cyan-400 hover:translate-x-1"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse"></div>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Analysis Animation Section */}
        <section className="rounded-2xl border border-white/10 bg-linear-to-br from-white/10 to-white/5 p-8 backdrop-blur-sm animate-fadeInUp stagger-delay-4 max-[480px]:rounded-xl max-[480px]:p-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="mb-6 text-center text-2xl font-bold text-white animate-fadeInUp">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Upload', desc: 'Upload your resume in PDF or Word format' },
                { step: '2', title: 'Analyze', desc: 'AI analyzes content and formatting instantly' },
                { step: '3', title: 'Improve', desc: 'Get actionable suggestions to boost your score' }
              ].map((item, idx) => (
                <div
                  key={item.step}
                  className="text-center animate-fadeInScale transition-all duration-500 hover:translate-y-1"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-cyan-600 to-cyan-500 text-white font-bold shadow-lg shadow-cyan-900/40 group hover:shadow-cyan-500/50">
                    {item.step}
                  </div>
                  <h3 className="mb-1 font-semibold text-white transition-colors duration-300">{item.title}</h3>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </div>
    </>
  );
};

export default HomePage;
      

    