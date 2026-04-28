import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-full flex justify-center items-center px-4 py-16 text-center">
      <div>
        <div className="relative w-full h-48 flex items-center justify-center mb-8">
          <div className="relative z-10 bg-gray-800/80 border border-white/10 rounded-xl w-24 h-28 flex flex-col items-center justify-center shadow-lg -mt-4">
            <div className="absolute top-0 right-0 w-5 h-5 bg-gray-700 rounded-bl-md rounded-tr-xl" />
            <span className="text-2xl font-bold text-cyan-400">404</span>
            <div className="mt-2 w-14 h-1 rounded bg-white/10" />
            <div className="mt-1.5 w-10 h-1 rounded bg-white/10" />
          </div>
          <div className="absolute bottom-10 right-16 z-20">
            <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
              <circle cx="18" cy="18" r="12" stroke="rgba(148,163,184,0.4)" strokeWidth="3.5" fill="rgba(255,255,255,0.03)" />
              <line x1="27" y1="27" x2="40" y2="40" stroke="rgba(148,163,184,0.4)" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-gray-400 max-w-xs mx-auto leading-relaxed mb-8">
          We're sorry, the page you requested could not be found. Please go back to the homepage.
        </p>
        <button
          onClick={() => navigate("/home")}
          className="rounded-xl bg-linear-to-r from-cyan-600 to-cyan-500 px-10 py-3 text-sm font-bold text-white shadow-lg shadow-cyan-900/40 transition hover:-translate-y-0.5"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Error;
