import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex">

      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-sm p-8 shadow-2xl rounded-2xl">
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Create Account
          </h2>

          <form className="space-y-3">
            
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 border border-gray-500 rounded-lg px-3 py-2 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 border border-gray-500 rounded-lg px-3 py-2 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800"
              />
            </div>

            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-500 rounded-lg px-4 py-2 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-500 rounded-lg px-4 py-2 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border border-gray-500 rounded-lg px-4 py-2 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Sign Up
            </button>

          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-gray-900 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>

      <div className="w-1/2 bg-gray-800 text-white flex items-center justify-center p-10">
        <div className="max-w-md space-y-6">
          <h1 className="text-3xl font-extrabold text-center mb-8">
                     
                     Resume Analyzer
          </h1>

          <div>
            <h2 className="text-xl font-bold mb-2">📈 Increase Interview Chances</h2>
            <p className="text-sm text-gray-300">
              Optimize your resume to match job descriptions and pass ATS filters effectively.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">🧾 Structured Resume Feedback</h2>
            <p className="text-sm text-gray-300">
              Get detailed insights on formatting, keywords, and missing sections in your resume.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">🤖 AI-Powered Recommendations</h2>
            <p className="text-sm text-gray-300">
              Receive intelligent suggestions to improve content quality and relevance.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">⚡ Instant Analysis & Results</h2>
            <p className="text-sm text-gray-300">
              Upload your resume and get real-time evaluation with actionable improvements.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Signup;