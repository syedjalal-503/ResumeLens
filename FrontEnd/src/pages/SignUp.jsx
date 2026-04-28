import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const features = [
  {
    icon: "fa-solid fa-arrow-trend-up",
    title: "Increase Interview Chances",
    desc: "Optimize your resume to match job descriptions and pass ATS filters.",
  },
  {
    icon: "fa-solid fa-file-lines",
    title: "Structured Feedback",
    desc: "Get detailed insights on formatting, keywords, and missing sections.",
  },
  {
    icon: "fa-solid fa-robot",
    title: "AI-Powered Recommendations",
    desc: "Receive intelligent suggestions to improve content quality.",
  },
  {
    icon: "fa-solid fa-bolt",
    title: "Instant Analysis",
    desc: "Upload your resume and get real-time evaluation.",
  },
];

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    // if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === form.email)) { setError("An account with this email already exists."); return; }
    users.push({ email: form.email, password: form.password, firstName: form.firstName, lastName: form.lastName });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("userName", `${form.firstName} ${form.lastName}`);
    navigate("/home");
  };

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition";

  return (
    <div className="min-h-screen flex bg-linear-to-br from-gray-900 via-gray-800 to-black">
      {/* Left panel – form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 border-r border-white/10">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center lg:hidden">
            <button onClick={() => navigate("/")} className="text-2xl font-bold text-white tracking-wide">
              ResumeLens
            </button>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold text-white mb-1 text-center">Create Account</h2>
            <p className="text-xs text-gray-400 text-center mb-6">
              Start building your perfect resume today
            </p>

            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <input type="text" placeholder="First Name" required value={form.firstName} onChange={set("firstName")} className={inputCls} />
                <input type="text" placeholder="Last Name" required value={form.lastName} onChange={set("lastName")} className={inputCls} />
              </div>
              <input type="email" placeholder="Email" required value={form.email} onChange={set("email")} className={inputCls} />
              <input type="password" placeholder="Password" required value={form.password} onChange={set("password")} className={inputCls} />
              <input type="password" placeholder="Confirm Password" required value={form.confirm} onChange={set("confirm")} className={inputCls} />

              {error && <p className="text-red-400 text-xs">{error}</p>}

              <button
                type="submit"
                className="w-full rounded-xl bg-linear-to-r from-cyan-600 to-cyan-500 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-900/40 transition hover:-translate-y-0.5 mt-4!"
              >
                Create Account
              </button>
            </form>

            <p className="text-sm text-center mt-5 text-gray-400">
              Already have an account?{" "}
              <Link to="/signin" className="text-cyan-400 font-semibold hover:text-cyan-300">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right panel – benefits */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center p-12">
        <div className="max-w-md">
          <button
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-white mb-10 tracking-wide"
          >
            ResumeLens
          </button>
          <h1 className="text-3xl font-extrabold text-white mb-2">Get started today</h1>
          <p className="text-gray-400 text-sm mb-10">
            Join thousands who improved their resumes and landed more interviews.
          </p>
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
    </div>
  );
};

export default Signup;
