import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-[min(1280px,94%)] rounded-lg mx-auto  bg-gray-800/80 backdrop-blur-sm px-4 py-8 sm:px-6 lg:px-8 max-[680px]:w-[min(1280px,96%)] max-[680px]:py-6 max-[480px]:w-full max-[480px]:py-4 max-[480px]:px-2">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 lg:gap-12">
        <div className="flex w-full flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex w-full flex-col gap-4 md:w-2/5">
            <span className="text-xl font-bold text-white tracking-wide">ResumeLens</span>
            <p className="text-sm leading-6 text-gray-400 md:max-w-sm">
              ResumeLens evaluates your resume with an ATS score and helps you
              create optimized, job-ready resumes.
            </p>
          </div>
          <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:w-3/5 lg:grid-cols-3">
            <div>
              <span className="text-sm font-semibold text-white tracking-wider uppercase">Company</span>
              <ul className="mt-5 space-y-3 text-sm text-gray-400">
                <li className="cursor-pointer transition hover:text-white" onClick={() => navigate("/home")}>Home</li>
                <li className="cursor-pointer transition hover:text-white" onClick={() => navigate("/resume")}>Create Resume</li>
                <li className="cursor-pointer transition hover:text-white" onClick={() => navigate("/analysis")}>Analysis</li>
              </ul>
            </div>
            <div>
              <span className="text-sm font-semibold text-white tracking-wider uppercase">Social</span>
              <ul className="mt-5 space-y-3 text-sm text-gray-400">
                <li className="cursor-pointer transition hover:text-white">Twitter</li>
                <li className="cursor-pointer transition hover:text-white">Instagram</li>
                <li className="cursor-pointer transition hover:text-white">LinkedIn</li>
              </ul>
            </div>
            <div>
              <span className="text-sm font-semibold text-white tracking-wider uppercase">Legal</span>
              <ul className="mt-5 space-y-3 text-sm text-gray-400">
                <li className="cursor-pointer transition hover:text-white" onClick={() => navigate("/terms")}>Terms &amp; Conditions</li>
                <li className="cursor-pointer transition hover:text-white" onClick={() => navigate("/terms")}>Privacy Policy</li>
                <li className="cursor-pointer transition hover:text-white" onClick={() => navigate("/contact")}>Contact</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center text-sm text-gray-500 md:flex-row md:text-left">
          <p>
            &copy; 2026 All rights reserved to{" "}
            <a href="/home" className="text-cyan-400 transition hover:text-cyan-300 hover:underline">ResumeLens</a>
          </p>
          <p>
            Made with <i className="fas fa-heart text-red-500"></i> by{" "}
            <a href="/home" className="text-cyan-400 transition hover:text-cyan-300 hover:underline">ResumeLens</a>{" "}Team
          </p>
          <p className="flex items-center gap-4 text-base">
            <span className="fa-brands fa-github cursor-pointer transition hover:text-white"></span>
            <span className="fa-brands fa-linkedin cursor-pointer transition hover:text-white"></span>
            <span className="fa-brands fa-twitter cursor-pointer transition hover:text-white"></span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
