import React from "react";

const signin = () => {
  return (
    <div className="min-h-screen w-full  bg-blue-950  flex items-start justify-center px-4 pt-4 pb-8">
      
      <div className="w-full max-w-md bg-white pt-6 pb-8 px-8 rounded-3xl shadow-2xl ring-1 ring-slate-200 
      transition duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)] hover:scale-105">
        
        <h1 className="text-3xl font-bold text-center text-slate-900  mb-6">
          Create Account
        </h1>

        <form className="space-y-2">
          
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-left text-slate-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="First name"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-left text-slate-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last name"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 
                focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-left text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-left text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-left text-slate-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 
              focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <button className="w-full mt-3 rounded-xl bg-indigo-600 py-3 text-white font-semibold 
          hover:bg-indigo-700 hover:scale-105 transition duration-300">
            Create Account
          </button>

          <p className="text-sm text-center text-slate-600 mt-4">
            Already have an account?{" "}
            <span className="text-indigo-600 cursor-pointer hover:underline">
              <a href="">Sign In</a>
            </span>
          </p>

        </form>
      </div>
    </div>
  );
}

export default signin;