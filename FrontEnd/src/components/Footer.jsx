import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-gray-800 text-gray-200 border-t border-gray-700 px-6 py-10 sm:px-8 md:px-12">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:gap-12">
        <div className="flex w-full flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex w-full flex-col gap-4 md:w-2/5">
          <p>Logo</p>
          <p className="text-sm leading-6 md:max-w-sm">
            ResumeLens is a platform that evaluates resumes with an ATS score
            and helps you to create optimized and job-ready resumes.
          </p>
        </div>
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:w-3/5 lg:grid-cols-3">
            <div >
            <span className="text-lg font-semibold text-white tracking-wider">
              Company
            </span>
            <ul className="mt-10">
              <li className="mt-3 cursor-pointer hover:text-white" onClick={() => navigate("/home")}>
                Home
              </li>
              <li className="mt-3 cursor-pointer hover:text-white" onClick={() => navigate("/resume")}>
                Create Resume
              </li>
              <li className="mt-3 cursor-pointer hover:text-white" onClick={() => navigate("/about")}>
                About
              </li>
            </ul>
          </div>
          <div>
            <span className="text-lg font-semibold text-white word tracking-wider">
              Social
            </span>
            <ul className="mt-10 ">
              <li className="mt-3">Twitter</li>
              <li className="mt-4"></li>
              <li className="mt-3">Instagram</li>
              <li className="mt-3">LinkedIn</li>
            </ul>
          </div>
          <div>
            <span className="text-lg font-semibold text-white word tracking-wider">
              Legal
            </span>
            <ul className="mt-10">
              <li className="mt-3 cursor-pointer hover:text-white" onClick={() => navigate("/terms")}>
                Terms & Conditions
              </li>
              <li className="mt-3 cursor-pointer hover:text-white" onClick={() => navigate("/terms")}>
                Privacy Policy
              </li>
              <li className="mt-3 cursor-pointer hover:text-white" onClick={() => navigate("/contact")}>
                Contact
              </li>
            </ul>
          </div>
        </div>
      </div>
        <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-gray-700 pt-6 text-center text-sm text-gray-400 md:flex-row md:text-left">
          <p>
          © Copyright 2026 all rights reserved to{" "}
          <a href="/home" className="text-blue-400 hover:text-blue-300 hover:underline">
            ResumeLens
          </a>
        </p>
          <p>
          Made with <i className="fas fa-heart text-red-500"></i> by {""}
          <a href="/home" className="text-blue-400 hover:text-blue-300 hover:underline">
            ResumeLens
          </a>{" "}
          Team
        </p>
          <p className="flex items-center gap-4 text-base">
            <span className="fa-brands fa-github cursor-pointer hover:text-white"></span>
            <span className="fa-brands fa-linkedin cursor-pointer hover:text-white"></span>
            <span className="fa-brands fa-twitter cursor-pointer hover:text-white"></span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
