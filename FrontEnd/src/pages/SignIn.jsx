import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gray-800 text-white flex items-center justify-center p-10">
        <div className="max-w-md space-y-6">
          <h1 className="text-3xl font-extrabold">
            Welcome to Resume Analyzer
          </h1>

          <div>
            <h2 className="text-xl font-bold mb-2">🚀 Smart ATS Optimization</h2>
            <p className="text-sm text-gray-300">
              Improve keyword matching and boost resume selection chances.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">📊 Detailed Insights</h2>
            <p className="text-sm text-gray-300">
              Get feedback on skills, formatting, and missing sections.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2">⚡ Instant Analysis</h2>
            <p className="text-sm text-gray-300">
              Upload resume and get results instantly.
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-sm p-8 shadow-2xl rounded-2xl">
          
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Sign In
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-500 rounded-lg px-4 py-2 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-500 rounded-lg px-4 py-2 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800"
            />

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition"
            >
              Log In
            </button>

          </form>

          <p className="text-sm text-center mt-4 text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-gray-900 font-semibold hover:underline"
            >
              Create Account
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default SignIn;
