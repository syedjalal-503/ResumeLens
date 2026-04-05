import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const profileMenuRef = useRef(null);

  const userName = localStorage.getItem("userName") || "User";
  const profileInitial = userName.trim().charAt(0).toUpperCase() || "U";

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setIsProfileMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-around gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-xl font-bold tracking-wide text-gray-900"
        >
          ResumeLens
        </button>

        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-500 hover:text-gray-900"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => navigate("/analysis")}
            className="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-gray-500 hover:text-gray-900"
          >
            Analysis
          </button>

          <button
            type="button"
            onClick={() => navigate("/resume")}
            className="rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-gray-700"
          >
            Create Resume
          </button>

          <div
            ref={profileMenuRef}
            onClick={() => setIsProfileMenuOpen((true ))}
            className="relative ml-1 cursor-pointer"
            onMouseEnter={() => setIsProfileMenuOpen(true)}
            // onMouseLeave={() => setIsProfileMenuOpen(false)}
          >
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm"
              aria-label="User profile"
              title={userName}
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
            >
              {profileInitial}
            </button>

            {isProfileMenuOpen && (
              <div className="absolute right-0 z-50 mt-2 w-40 rounded-lg border border-gray-200 bg-white p-2 shadow-lg">
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    navigate("/contact");
                  }}
                  className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Contact
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
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
