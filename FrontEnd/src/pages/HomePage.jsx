import React from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

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
    <div className="home-page w-8/10  h-100%">
      <section className="home-hero">
        <div className="home-hero__content">
          <p className="home-hero__tagline">
            
            <i className="fa-regular fa-circle-check" aria-hidden="true"></i>
            AI-Powered Resume Analysis
          </p>

          <h1 className="home-hero__title">
            Transform Your Resume with <br />
            <span> AI Intelligence</span>
          </h1>

          <p className="home-hero__description">
            Get instant insights into your resume with Resume Analyzer, and
            increase your chances of landing your dream job.
          </p>

          <div className="home-hero__actions">
            <button
              type="button"
              className="home-hero__btn home-hero__btn--primary"
              onClick={handleAnalyzeClick}
            >
              Analyze Resume
            </button>
            <button
              type="button"
              className="home-hero__btn home-hero__btn--ghost "
              onClick={() => navigate("/resume")}
            >
              Create Resume
            </button>
          </div>
        </div>

        <div className="home-hero__image">
          <img
            src="resume_home.jpg"
            alt="Resume Analysis Illustration"
            className="home-hero__img"
          />
        </div>
      </section>
      <section className="home-features " ref={uploadSectionRef}>
        <article className="home-feature-card">
          <h3>ATS Compatibility Score</h3>
          <p>
            Check how well your resume matches modern applicant tracking
            systems.
          </p>
        </article>
        <article className="home-feature-card">
          <h3>Smart Content Suggestions</h3>
          <p>
            Improve weak bullets, keywords, and phrasing using practical AI
            recommendations.
          </p>
        </article>
        <article className="home-feature-card">
          <h3>Role-Focused Optimization</h3>
          <p>
            Tailor your resume for specific job descriptions and increase
            interview chances.
          </p>
        </article>
      </section>
      <section className="home-hero-1">
        <div
          className="home-upload__content w-3/4 border rounded-lg p-6   "
          role="button"
          tabIndex={0}
          onClick={handleUploadClick}
          aria-label="Upload resume file"
        >
          <img src="upload.jpg" alt="upload PDF" className="" />
          <input
            ref={uploadInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
          />
        </div>
        <div className="info_content mr-12 flex gap-4">
          <div className="bg-green-600 h-full w-1/2 pl-3 text-black">
            Requirements needed
            <ul className="list-disc gap-5 mt-3 list-inside flex flex-col">
              <li className="fa-regular fa-circle-check"></li>
              <li className="fa-regular fa-circle-check"></li>
              <li className="fa-regular fa-circle-check"></li>
              <li className="fa-regular fa-circle-check"></li>
              <li className="fa-regular fa-circle-check"></li>
              <li className="fa-regular fa-circle-check"></li>
              <li className="fa-regular fa-circle-check"></li>
            </ul>
          </div>
          <div className="bg-red-300 h-full w-1/2 text-white pl-3">
            suggestions
            <ul className="list-disc gap-5 mt-3 list-inside flex flex-col">
              <li className="fa-regular fa-circle-check"></li>
              <li className="fa-regular fa-circle-check"></li>
              <li className="fa-regular fa-circle-check"></li>
              <li className="fa-regular fa-circle-check"></li>
              <li className="fa-regular fa-circle-check"></li>
              <li className="fa-regular fa-circle-check"></li>
              <li className="fa-regular fa-circle-check"></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
