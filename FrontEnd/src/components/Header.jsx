import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const profileMenuRef = useRef(null);

  const userName = localStorage.getItem("userName") || "User";
  const profileInitial = userName.trim().charAt(0).toUpperCase() || "U";

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setIsProfileMenuOpen(false);
    navigate("/signin");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-gray-900/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-xl font-bold tracking-wide text-white"
        >
          ResumeLens
        </button>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-gray-300 transition hover:border-white/40 hover:bg-white/10 lg:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div
          className={`w-full flex-col gap-2 sm:gap-3 lg:flex lg:w-auto lg:flex-row lg:items-center lg:justify-end ${
            isMobileMenuOpen ? "flex" : "hidden lg:flex"
          }`}
        >
          <button
            type="button"
            onClick={() => { navigate("/home"); setIsMobileMenuOpen(false); }}
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-white/40 hover:text-white"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => { navigate("/analysis"); setIsMobileMenuOpen(false); }}
            className="rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-white/40 hover:text-white"
          >
            Analysis
          </button>

          <button
            type="button"
            onClick={() => { navigate("/resume"); setIsMobileMenuOpen(false); }}
            className="rounded-full bg-linear-to-r from-cyan-600 to-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-900/40 transition hover:-translate-y-0.5"
          >
            Create Resume
          </button>

          <div
            ref={profileMenuRef}
            onClick={() => setIsProfileMenuOpen(true)}
            className="relative w-full mt-2 cursor-pointer lg:w-auto lg:mt-0 lg:ml-2 hidden lg:block"
            onMouseEnter={() => setIsProfileMenuOpen(true)}
          >
            <div className="flex w-full justify-end lg:w-auto">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-sm font-bold text-white shadow-sm"
                aria-label="User profile"
                title={userName}
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              >
                {profileInitial}
              </button>
            </div>

            {isProfileMenuOpen && (
              <div className="absolute right-0 z-50 mt-2 w-40 rounded-lg border border-white/10 bg-gray-800 p-2 shadow-lg">
                <button
                  type="button"
                  onClick={() => { setIsProfileMenuOpen(false); navigate("/contact"); }}
                  className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-300 hover:bg-white/10"
                >
                  Contact
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-400 hover:bg-red-900/20"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
