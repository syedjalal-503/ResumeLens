import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: "fa-solid fa-chart-line",
    title: "ATS Compatibility Score",
    desc: "Check how well your resume matches modern applicant tracking systems.",
    color: "#0891b2",
  },
  {
    icon: "fa-solid fa-lightbulb",
    title: "Smart Content Suggestions",
    desc: "Improve weak bullets, keywords, and phrasing using practical AI recommendations.",
    color: "#7c3aed",
  },
  {
    icon: "fa-solid fa-bullseye",
    title: "Role-Focused Optimization",
    desc: "Tailor your resume for specific job descriptions and increase interview chances.",
    color: "#0f766e",
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const uploadInputRef = useRef(null);
  const uploadSectionRef = useRef(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadedFile, setUploadedFile] = useState();
  const [targetRole, setTargetRole] = useState("");
  const [experience, setExperience] = useState("");

  const handleUploadClick = () => uploadInputRef.current?.click();

  const handleAnalyzeClick = () =>
    uploadSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

  return (
    <div className="w-[min(1280px,92%)] mx-auto py-9 pb-14 max-[680px]:w-[min(1280px,96%)] max-[680px]:py-6 max-[480px]:w-full max-[480px]:py-4 max-[480px]:px-3">
      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 mb-6 max-[680px]:p-5 max-[480px]:rounded-xl max-[480px]:p-4">
        <div className="flex flex-col gap-4">
          <span className="w-fit inline-flex items-center gap-2 rounded-full border border-cyan-700/50 bg-cyan-900/40 px-4 py-1.5 text-sm font-semibold text-cyan-400">
            <i className="fa-regular fa-circle-check" aria-hidden="true"></i>
            AI-Powered Resume Analysis
          </span>

          <h1 className="text-white text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.07] font-extrabold max-[680px]:text-[clamp(1.8rem,8vw,2.6rem)]">
            Transform Your Resume with{" "}
            <span className="text-cyan-400">AI Intelligence</span>
          </h1>

          <p className="max-w-[60ch] text-gray-300 text-[clamp(0.95rem,1.4vw,1.05rem)] leading-[1.7] max-[680px]:max-w-none">
            Get instant insights into your resume with Resume Analyzer, and
            increase your chances of landing your dream job.
          </p>

          <div className="flex flex-wrap gap-3 max-[680px]:w-full">
            <button
              type="button"
              className="rounded-xl px-5 py-2.5 text-sm font-bold bg-linear-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-900/40 transition hover:-translate-y-0.5 max-[680px]:flex-[1_1_100%]"
              onClick={handleAnalyzeClick}
            >
              Analyze Resume
            </button>
            <button
              type="button"
              className="rounded-xl px-5 py-2.5 text-sm font-bold border border-white/20 text-white bg-white/5 transition hover:-translate-y-0.5 hover:bg-white/10 max-[680px]:flex-[1_1_100%]"
              onClick={() => navigate("/resume")}
            >
              Create Resume
            </button>
          </div>
        </div>

        <div className="flex justify-center items-center max-lg:-order-1">
          <img
            src="resume_home.jpg"
            alt="Resume Analysis Illustration"
            className="w-[min(100%,470px)] rounded-xl object-cover border border-white/10 shadow-[0_14px_25px_rgba(0,0,0,0.35)]"
          />
        </div>
      </section>

      {/* Feature cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {features.map((f) => (
          <article
            key={f.title}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 transition hover:-translate-y-1 hover:border-white/20 max-[480px]:rounded-xl"
          >
            <div
              className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl text-base"
              style={{ background: f.color + "33", color: f.color }}
            >
              <i className={f.icon}></i>
            </div>
            <h3 className="mb-2 text-sm font-bold text-white">{f.title}</h3>
            <p className="text-xs leading-relaxed text-gray-400">{f.desc}</p>
          </article>
        ))}
      </section>

      {/* Upload + ATS form */}
      <section
        className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-4 items-stretch"
        ref={uploadSectionRef}
      >
        {/* Drop zone */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Upload resume file"
          className="grid place-items-center min-h-72 p-4 border-2 rounded-2xl border-dashed border-cyan-700/40 bg-white/5 backdrop-blur-sm transition hover:-translate-y-0.5  focus-visible:outline-2 focus-visible:outline-cyan-500 max-[680px]:min-h-52 max-[480px]:rounded-xl"
        >
          {!uploadedFile ? (
            <>
              <div
                onClick={handleUploadClick}
                className="cursor-pointer border-dashed border-2  hover:bg-white/10 border-cyan-700/40 rounded-xl p-6 flex flex-col items-center gap-3 hover:border-cyan-500/60"
              >
                <i className="fa-solid fa-cloud-arrow-up text-cyan-400 text-3xl"></i>
                <p className="text-sm font-semibold text-white">
                  Click or drag to upload resume
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX supported
                </p>
              </div>
              {/* <img
                src="upload.jpg"
                onClick={handleUploadClick}
                alt="upload PDF"
                className="block w-full max-w-70 h-auto rounded-xl cursor-pointer max-[680px]:max-w-52"
              /> */}
              <input
                ref={uploadInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                aria-hidden="true"
                tabIndex={-1}
                onChange={(e) => {
                  if (e.target.files[0]) setUploadedFile(e.target.files[0]);
                }}
              />
            </>
          ) : (
            <>
              <i className="fa-regular fa-circle-check text-green-400 text-3xl"></i>
              <p className="text-sm font-semibold text-green-400">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-gray-500">Click to change file</p>
            </>
          )}
        </div>

        {/* ATS panel */}
        <div className="flex items-center justify-center min-h-72 gap-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 max-lg:flex-col max-[680px]:min-h-52 max-[480px]:rounded-xl">
          {isUploaded ? (
            <>
              <div className="flex-1 min-w-0 p-4 rounded-xl bg-linear-to-b from-green-500/90 to-green-700/90 w-full">
                <p className="font-semibold text-white text-sm mb-3">
                  Requirements Found
                </p>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {[
                    "Contact information present",
                    "Professional summary included",
                    "Work experience listed",
                    "Education section found",
                    "Skills section detected",
                    "Action verbs used",
                    "Clean formatting structure",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-white text-xs"
                    >
                      <i className="fa-regular fa-circle-check"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 min-w-0 p-4 rounded-xl bg-linear-to-b from-red-400/90 to-red-600/90 w-full">
                <p className="font-semibold text-white text-sm mb-3">
                  Suggestions
                </p>
                <ul className="flex flex-col gap-2 list-none p-0 m-0">
                  {[
                    `Add metrics for ${targetRole || "your role"}`,
                    "Include LinkedIn profile URL",
                    "Add missing industry keywords",
                    "Quantify your achievements",
                    "Expand the skills section",
                    "Tailor summary to job description",
                    "Add relevant certifications",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-white text-xs"
                    >
                      <i className="fa-regular fa-circle-check"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <div className="ats-score-div">
              <h2 className="text-center">Get Your ATS Score</h2>
              <label className="flex flex-col gap-4 mt-2">
                <h6>
                  Target Role <span className="text-red-400">*</span>
                </h6>
                <input
                  type="text"
                  name="resume"
                  placeholder="Target role which you are looking for?"
                  required
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
                <h6>
                  Experience <span className="text-red-400">*</span>
                </h6>
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Years of experience?"
                  required
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
                <button
                  className="rounded-xl px-5 mt-2 py-2.5 text-sm font-bold bg-linear-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-900/40 transition hover:-translate-y-0.5"
                  onClick={() => setIsUploaded(true)}
                  type="button"
                >
                  Submit
                </button>
              </label>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
