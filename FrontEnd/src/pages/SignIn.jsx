import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const features = [
  {
    icon: "fa-solid fa-chart-line",
    title: "Smart ATS Optimization",
    desc: "Improve keyword matching and boost resume selection chances.",
  },
  {
    icon: "fa-solid fa-chart-bar",
    title: "Detailed Insights",
    desc: "Get feedback on skills, formatting, and missing sections.",
  },
  {
    icon: "fa-solid fa-bolt",
    title: "Instant Analysis",
    desc: "Upload your resume and get results in seconds.",
  },
];

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u) => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("userName", `${user.firstName} ${user.lastName}`);
      navigate("/home");
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition";

  return (
    <div className="min-h-screen flex bg-linear-to-br from-gray-900 via-gray-800 to-black">
      {/* Left panel – benefits */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12 border-r border-white/10">
        <div className="max-w-md">
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-white mb-10 tracking-wide"
          >
            ResumeLens
          </button>
          <h1 className="text-3xl font-extrabold text-white mb-2">Welcome back</h1>
          <p className="text-gray-400 text-sm mb-10">Sign in to continue building your career.</p>
          <div className="space-y-7">
            {features.map((f) => (
              <div key={f.title} className="flex gap-4 items-start">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-900/40 text-cyan-400">
                  <i className={f.icon}></i>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white mb-1">{f.title}</h2>
                  <p className="text-xs text-gray-400">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel – form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center lg:hidden">
            <button onClick={() => navigate("/")} className="text-2xl font-bold text-white tracking-wide">
              ResumeLens
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-1 text-center">Sign In</h2>
            <p className="text-xs text-gray-400 text-center mb-6">
              Enter your credentials to access your account
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputCls}
              />

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-xl bg-linear-to-r from-cyan-600 to-cyan-500 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-900/40 transition hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </form>

            <p className="text-sm text-center mt-5 text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-cyan-400 font-semibold hover:text-cyan-300">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
