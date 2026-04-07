import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const uploadInputRef = useRef(null);
  const uploadSectionRef = useRef(null);

  const handleUploadClick = () => {
    uploadInputRef.current?.click();
  };

  const handleAnalyzeClick = () => {
    uploadSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="w-[min(1280px,94%)] min-h-[100%] mx-auto py-[2.25rem] pb-[3.5rem] bg-[radial-gradient(circle_at_8%_5%,rgba(14,165,233,0.12),transparent_30%),radial-gradient(circle_at_87%_85%,rgba(234,179,8,0.16),transparent_34%),#ffffff] max-[680px]:w-[min(1280px,96%)] max-[680px]:py-[1.5rem] max-[680px]:pb-[2.5rem] max-[480px]:w-full max-[480px]:py-[1rem] max-[480px]:px-0">
      <section className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[clamp(1.25rem,2vw,2.25rem)] items-center border border-[rgba(148,163,184,0.14)] rounded-[1.35rem] p-[clamp(1.2rem,2vw,2rem)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,250,252,0.96))] shadow-[0_14px_34px_rgba(15,23,42,0.08)] max-[680px]:rounded-[1rem] max-[680px]:p-[1rem] max-[480px]:rounded-[0.9rem]">
        <div className="flex flex-col gap-[0.95rem]">
          <p className="m-0 w-fit inline-flex items-center gap-[0.5rem] px-[0.8rem] py-[0.35rem] rounded-full bg-[rgba(224,242,254,0.9)] text-[#075985] text-[0.88rem] font-bold tracking-[0.02em] max-[480px]:text-[0.8rem]">
            <i className="fa-regular fa-circle-check" aria-hidden="true"></i>
            AI-Powered Resume Analysis
          </p>

          <h1 className="mt-[0.25rem] mb-0 text-[#0f172a] text-[clamp(2rem,4.4vw,3.65rem)] leading-[1.07] font-extrabold max-[680px]:text-[clamp(1.8rem,8vw,2.6rem)]">
            Transform Your Resume with <br />
            <span className="text-[#0891b2]"> AI Intelligence</span>
          </h1>

          <p className="mt-[0.35rem] mb-0 max-w-[60ch] text-[#334155] text-[clamp(1rem,1.4vw,1.08rem)] leading-[1.7] max-[680px]:max-w-none">
            Get instant insights into your resume with Resume Analyzer, and
            increase your chances of landing your dream job.
          </p>

          <div className="mt-[0.4rem] flex flex-wrap gap-[0.8rem] max-[680px]:w-full">
            <button
              type="button"
              className="rounded-[0.75rem] px-[1.05rem] py-[0.7rem] text-[0.95rem] font-bold border border-transparent cursor-pointer transition-all duration-[160ms] ease hover:-translate-y-[2px] bg-[linear-gradient(135deg,#0891b2,#0ea5e9)] text-white shadow-[0_8px_18px_rgba(8,145,178,0.22)] hover:bg-[linear-gradient(135deg,#0f766e,#0284c7)] max-[680px]:flex-[1_1_100%] max-[480px]:w-full"
              onClick={handleAnalyzeClick}
            >
              Analyze Resume
            </button>
            <button
              type="button"
              className="rounded-[0.75rem] px-[1.05rem] py-[0.7rem] text-[0.95rem] font-bold border border-[#cbd5e1] cursor-pointer transition-all duration-[160ms] ease hover:-translate-y-[2px] bg-[rgba(255,255,255,0.88)] text-[#0f172a] hover:bg-[#f8fafc] max-[680px]:flex-[1_1_100%] max-[480px]:w-full"
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
            className="w-[min(100%,470px)] rounded-[1.1rem] object-cover border border-[rgba(226,232,240,0.9)] shadow-[0_14px_25px_rgba(15,23,42,0.1)]"
          />
        </div>
      </section>

      <section className="mt-[1.4rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[0.9rem]" ref={uploadSectionRef}>
        <article className="border border-[#e2e8f0] rounded-[1rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] p-[1rem_1rem_1.15rem] shadow-[0_10px_18px_rgba(15,23,42,0.06)] transition-all duration-[180ms] ease hover:-translate-y-[3px] hover:border-[rgba(8,145,178,0.22)] hover:shadow-[0_14px_24px_rgba(15,23,42,0.1)] max-[480px]:rounded-[0.9rem]">
          <h3 className="m-0 text-[#0f172a] text-[1rem]">ATS Compatibility Score</h3>
          <p className="mt-[0.55rem] mb-0 text-[#475569] text-[0.93rem] leading-[1.5]">
            Check how well your resume matches modern applicant tracking systems.
          </p>
        </article>
        <article className="border border-[#e2e8f0] rounded-[1rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] p-[1rem_1rem_1.15rem] shadow-[0_10px_18px_rgba(15,23,42,0.06)] transition-all duration-[180ms] ease hover:-translate-y-[3px] hover:border-[rgba(8,145,178,0.22)] hover:shadow-[0_14px_24px_rgba(15,23,42,0.1)] max-[480px]:rounded-[0.9rem]">
          <h3 className="m-0 text-[#0f172a] text-[1rem]">Smart Content Suggestions</h3>
          <p className="mt-[0.55rem] mb-0 text-[#475569] text-[0.93rem] leading-[1.5]">
            Improve weak bullets, keywords, and phrasing using practical AI recommendations.
          </p>
        </article>
        <article className="border border-[#e2e8f0] rounded-[1rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,250,252,0.96))] p-[1rem_1rem_1.15rem] shadow-[0_10px_18px_rgba(15,23,42,0.06)] transition-all duration-[180ms] ease hover:-translate-y-[3px] hover:border-[rgba(8,145,178,0.22)] hover:shadow-[0_14px_24px_rgba(15,23,42,0.1)] max-[480px]:rounded-[0.9rem]">
          <h3 className="m-0 text-[#0f172a] text-[1rem]">Role-Focused Optimization</h3>
          <p className="mt-[0.55rem] mb-0 text-[#475569] text-[0.93rem] leading-[1.5]">
            Tailor your resume for specific job descriptions and increase interview chances.
          </p>
        </article>
      </section>

      <section className="mt-[1.4rem] grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-[1rem] items-stretch">
        <div
          role="button"
          tabIndex={0}
          onClick={handleUploadClick}
          aria-label="Upload resume file"
          className="grid place-items-center min-h-[320px] p-[1rem] border-[8px] border-dashed border-[rgba(19,87,182,0.22)] rounded-[1rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.72),rgba(224,242,254,0.38))] shadow-[0_12px_24px_rgba(15,23,42,0.06)] cursor-pointer transition-all duration-[160ms] ease hover:-translate-y-[2px] hover:border-[rgba(8,145,178,0.3)] hover:shadow-[0_16px_30px_rgba(15,23,42,0.1)] focus-visible:-translate-y-[2px] focus-visible:border-[rgba(8,145,178,0.3)] focus-visible:shadow-[0_16px_30px_rgba(15,23,42,0.1)] focus-visible:outline-[3px] focus-visible:outline-[rgba(8,145,178,0.35)] focus-visible:outline-offset-[3px] max-[680px]:min-h-[240px] max-[680px]:p-[0.85rem] max-[480px]:min-h-[auto] max-[480px]:rounded-[0.9rem]"
        >
          <img
            src="upload.jpg"
            alt="upload PDF"
            className="block w-full max-w-[320px] h-[auto] border-none rounded-[0.9rem] bg-transparent shadow-none mix-blend-multiply max-[680px]:max-w-[260px]"
          />
          <input
            ref={uploadInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>

        <div className="flex items-center justify-center min-h-[320px] gap-[1rem] rounded-[1rem] p-[1.2rem] text-[#0f172a] bg-[rgba(255,255,255,0.72)] border border-[rgba(148,163,184,0.18)] shadow-[0_12px_24px_rgba(15,23,42,0.06)] max-lg:flex-col max-[680px]:min-h-[240px] max-[480px]:min-h-[auto] max-[480px]:rounded-[0.9rem]">
          <div className="flex-[1_1_0] min-w-0 p-[1rem] rounded-[0.95rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] bg-[linear-gradient(180deg,rgba(34,197,94,0.92),rgba(22,163,74,0.96))] text-black w-[100%]">
            Requirements needed
            <ul className="mt-[0.85rem] p-0 flex flex-col gap-5 list-none">
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
            </ul>
          </div>
          <div className="flex-[1_1_0] min-w-0 p-[1rem] rounded-[0.95rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] bg-[linear-gradient(180deg,rgba(248,113,113,0.92),rgba(220,38,38,0.96))] text-white w-[100%]">
            suggestions
            <ul className="mt-[0.85rem] p-0 flex flex-col gap-5 list-none">
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
              <li className="leading-[1.35]"><i className="fa-regular fa-circle-check text-[#fff]"></i></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
