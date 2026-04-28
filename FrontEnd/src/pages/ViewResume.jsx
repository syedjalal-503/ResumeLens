import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewResume = () => {
  const [resumes, setResumes] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("savedResumes") || "[]");
    return [...saved].reverse();
  });
  const navigate = useNavigate();

  const handleDelete = (id) => {
    const updated = resumes.filter((r) => r.id !== id);
    setResumes(updated);
    localStorage.setItem("savedResumes", JSON.stringify([...updated].reverse()));
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="w-[min(1280px,94%)] min-h-full mx-auto py-9 pb-14 max-[480px]:w-full max-[480px]:py-4 max-[480px]:px-4">
      <div className="mb-7 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-white">My Resumes</h1>
          <p className="text-sm text-gray-400 mt-0.5">Your saved resumes are listed here.</p>
        </div>
        <button
          onClick={() => navigate("/resume")}
          className="rounded-xl bg-linear-to-r from-cyan-600 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-900/40 transition hover:-translate-y-0.5"
        >
          + Create New Resume
        </button>
      </div>

      {resumes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-cyan-700/40 bg-white/5 py-20 text-center">
          <i className="fa-regular fa-file text-5xl text-gray-600 mb-4"></i>
          <h2 className="text-lg font-bold text-white">No resumes saved yet</h2>
          <p className="text-sm text-gray-400 mt-1 mb-6 max-w-xs">
            Build a resume using the Resume Builder and save it to see it here.
          </p>
          <button
            onClick={() => navigate("/resume")}
            className="rounded-xl bg-linear-to-r from-cyan-600 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-900/40 transition hover:-translate-y-0.5"
          >
            Create Your First Resume
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {resumes.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 flex flex-col gap-3 transition hover:-translate-y-0.5 hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-cyan-900/40 border border-cyan-700/50 px-2.5 py-0.5 text-xs font-semibold text-cyan-400">
                  {r.template}
                </span>
                <span className="text-xs text-gray-500">{formatDate(r.savedAt)}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{r.name}</h3>
                {r.data?.title && (
                  <p className="text-sm text-gray-400">{r.data.title}</p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                {r.data?.email && (
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <i className="fa-regular fa-envelope text-[10px]"></i>
                    {r.data.email}
                  </span>
                )}
                {r.data?.phone && (
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <i className="fa-solid fa-phone text-[10px]"></i>
                    {r.data.phone}
                  </span>
                )}
                {r.data?.location && (
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <i className="fa-solid fa-location-dot text-[10px]"></i>
                    {r.data.location}
                  </span>
                )}
              </div>

              <div className="flex gap-2 mt-auto pt-1">
                <button
                  onClick={() => navigate("/resume")}
                  className="flex-1 rounded-lg border border-cyan-600/40 py-1.5 text-xs font-semibold text-cyan-400 transition hover:bg-cyan-900/20"
                >
                  Open Builder
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="rounded-lg border border-red-500/30 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:bg-red-900/20"
                  aria-label="Delete resume"
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewResume;
