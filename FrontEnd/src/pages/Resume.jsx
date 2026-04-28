import { useState, useRef } from "react";

const TEMPLATES = [
  { id: 1, name: "Classic", accent: "#1e3a8a", bg: "#f8fafc", sidebar: false },
  { id: 2, name: "Modern", accent: "#7c3aed", bg: "#ffffff", sidebar: false },
  { id: 3, name: "Bold", accent: "#dc2626", bg: "#ffffff", sidebar: false },
  { id: 4, name: "Minimal", accent: "#111827", bg: "#ffffff", sidebar: false },
  { id: 5, name: "Teal Pro", accent: "#0f766e", bg: "#f0fdfa", sidebar: false },
  { id: 6, name: "Sidebar", accent: "#1e3a8a", bg: "#f8fafc", sidebar: true },
  { id: 7, name: "Executive", accent: "#92400e", bg: "#fffbeb", sidebar: false },
  { id: 8, name: "Creative", accent: "#be185d", bg: "#fdf2f8", sidebar: true },
];

const EMPTY = {
  name: "",
  title: "",
  email: "",
  phone: "",
  location: "",
  summary: "",
  exp1_role: "",
  exp1_company: "",
  exp1_date: "",
  exp1_desc: "",
  exp2_role: "",
  exp2_company: "",
  exp2_date: "",
  exp2_desc: "",
  edu_degree: "",
  edu_school: "",
  edu_date: "",
  edu_grade: "",
  edu_degree2: "",
  edu_school2: "",
  edu_date2: "",
  edu_grade2: "",
  edu_degree3: "",
  edu_school3: "",
  edu_date3: "",
  edu_grade3: "",
  project_1_title: "",
  project_1_link: "",
  project_1_date: "",
  project_1_desc: "",
  project_1_time_spent: "",
  project_2_title: "",
  project_2_link: "",
  project_2_date: "",
  project_2_desc: "",
  project_2_time_spent: "",
  skills: "",
};

function TemplateThumbnail({ tpl, selected, onClick }) {
  const a = tpl.accent;
  const isBand = tpl.id === 2 || tpl.id === 3;
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        width: 110,
        cursor: "pointer",
        border: selected ? `2.5px solid ${a}` : "2px solid #e2e8f0",
        borderRadius: 10,
        overflow: "hidden",
        background: "#fff",
        padding: 0,
        boxShadow: selected ? `0 0 0 3px ${a}22` : "0 1px 4px rgba(0,0,0,0.07)",
        transition: "all 0.18s ease",
        outline: "none",
      }}
    >
      <div style={{ height: 78, background: tpl.bg, position: "relative", overflow: "hidden" }}>
        {tpl.sidebar && (
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 28, background: a, opacity: 0.9 }} />
        )}
        {isBand && (
          <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 22, background: a, opacity: 0.9 }} />
        )}
        <div style={{ padding: tpl.sidebar ? "6px 5px 6px 33px" : isBand ? "28px 7px 6px" : "6px 7px" }}>
          <div style={{ width: "60%", height: 5, borderRadius: 3, background: isBand ? "#e2e8f0" : a, marginBottom: 3 }} />
          <div style={{ width: "40%", height: 3, borderRadius: 2, background: isBand ? "#e2e8f0" : a, opacity: 0.4, marginBottom: 6 }} />
          <div style={{ width: "100%", height: 2, borderRadius: 1, background: "#e2e8f0", marginBottom: 2 }} />
          <div style={{ width: "85%", height: 2, borderRadius: 1, background: "#e2e8f0", marginBottom: 2 }} />
          <div style={{ width: "70%", height: 2, borderRadius: 1, background: "#e2e8f0", marginBottom: 5 }} />
          <div style={{ width: "45%", height: 3, borderRadius: 2, background: a, opacity: 0.6, marginBottom: 3 }} />
          <div style={{ width: "100%", height: 2, borderRadius: 1, background: "#e2e8f0", marginBottom: 2 }} />
          <div style={{ width: "80%", height: 2, borderRadius: 1, background: "#e2e8f0" }} />
        </div>
      </div>
      <div style={{ padding: "5px 6px", fontSize: 11, fontWeight: 600, color: selected ? a : "#64748b", textAlign: "center", fontFamily: "system-ui, sans-serif", background: "#fff", borderTop: "1px solid #f1f5f9" }}>
        {tpl.name}
      </div>
    </button>
  );
}

/* ── Shared sub-components (all inline styles for PDF export) ── */

function SecHeader({ a, title }) {
  return (
    <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: a, borderBottom: `1.5px solid ${a}`, paddingBottom: 3, margin: "14px 0 7px" }}>
      {title}
    </div>
  );
}

function BandSecHeader({ a, title }) {
  return (
    <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: a, borderLeft: `3px solid ${a}`, paddingLeft: 8, margin: "13px 0 7px" }}>
      {title}
    </div>
  );
}

function ExpBlock({ a, role, company, date, desc }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 1 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#111827" }}>{role}</span>
        <span style={{ fontSize: 8, color: "#9ca3af", whiteSpace: "nowrap" }}>{date}</span>
      </div>
      <div style={{ fontSize: 9, color: a, fontWeight: 600, marginBottom: 3 }}>{company}</div>
      {desc && <p style={{ margin: 0, fontSize: 8.5, color: "#4b5563", lineHeight: 1.6 }}>{desc}</p>}
    </div>
  );
}

function EduBlock({ a, degree, school, date, grade }) {
  if (!degree && !school) return null;
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#111827" }}>{degree}</span>
        <span style={{ fontSize: 8, color: "#9ca3af" }}>{date}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 9, color: a, fontWeight: 500 }}>{school}</span>
        {grade && <span style={{ fontSize: 8, color: "#6b7280" }}>{grade}</span>}
      </div>
    </div>
  );
}

function ProjBlock({ a, title, link, time, desc }) {
  if (!title) return null;
  return (
    <div style={{ marginBottom: 9 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: "#111827" }}>{title}</span>
        <span style={{ fontSize: 8, color: "#9ca3af" }}>{time}</span>
      </div>
      {link && <div style={{ fontSize: 8, color: a, marginBottom: 2 }}>{link}</div>}
      {desc && <p style={{ margin: 0, fontSize: 8.5, color: "#4b5563", lineHeight: 1.6 }}>{desc}</p>}
    </div>
  );
}

function SkillTags({ a, skills }) {
  if (!skills.length) return null;
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 5px", marginTop: 4 }}>
      {skills.map((s, i) => (
        <span key={i} style={{ fontSize: 8, background: `${a}15`, color: a, border: `1px solid ${a}30`, borderRadius: 4, padding: "2px 7px", fontWeight: 500 }}>{s}</span>
      ))}
    </div>
  );
}

/* ── Resume Preview ── */

function ResumePreview({ tpl, data }) {
  const a = tpl.accent;
  const name = data.name || "Your Name";
  const jobTitle = data.title || "Professional Title";
  const email = data.email || "email@example.com";
  const phone = data.phone || "+91 00000 00000";
  const loc = data.location || "City, Country";
  const summary = data.summary || "A motivated professional with a proven track record of delivering impactful results. Passionate about continuous learning and contributing to team success.";
  const skills = data.skills ? data.skills.split(",").map((s) => s.trim()).filter(Boolean) : [];

  const e1 = !!(data.exp1_role || data.exp1_company);
  const e2 = !!(data.exp2_role || data.exp2_company);
  const ed1 = !!(data.edu_degree || data.edu_school);
  const ed2 = !!(data.edu_degree2 || data.edu_school2);
  const ed3 = !!(data.edu_degree3 || data.edu_school3);
  const p1 = !!data.project_1_title;
  const p2 = !!data.project_2_title;

  /* ── Sidebar Layout (ids 6, 8) ── */
  if (tpl.sidebar) {
    return (
      <div style={{ display: "flex", minHeight: "100%", fontFamily: "Arial, Helvetica, sans-serif" }}>
        {/* Left sidebar */}
        <div style={{ width: 138, background: a, color: "#fff", padding: "22px 13px", flexShrink: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255,255,255,0.18)", border: "2.5px solid rgba(255,255,255,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: "#fff", margin: "0 auto 10px" }}>
            {name.charAt(0).toUpperCase()}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, textAlign: "center", color: "#fff", lineHeight: 1.2, marginBottom: 3 }}>{name}</div>
          <div style={{ fontSize: 8, textAlign: "center", color: "rgba(255,255,255,0.7)", marginBottom: 16 }}>{jobTitle}</div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: 11, marginBottom: 13 }}>
            <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", marginBottom: 7 }}>Contact</div>
            <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.85)", marginBottom: 4, wordBreak: "break-all" }}>{email}</div>
            <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.85)", marginBottom: 4 }}>{phone}</div>
            <div style={{ fontSize: 7.5, color: "rgba(255,255,255,0.85)" }}>{loc}</div>
          </div>

          {skills.length > 0 && (
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.18)", paddingTop: 11 }}>
              <div style={{ fontSize: 7, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.45)", marginBottom: 7 }}>Skills</div>
              {skills.map((s, i) => (
                <div key={i} style={{ fontSize: 7.5, color: "#fff", background: "rgba(255,255,255,0.14)", borderRadius: 3, padding: "2px 6px", marginBottom: 4 }}>{s}</div>
              ))}
            </div>
          )}
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: "20px 15px", background: tpl.bg, overflowX: "hidden" }}>
          <SecHeader a={a} title="Professional Summary" />
          <p style={{ margin: 0, fontSize: 8.5, color: "#374151", lineHeight: 1.65 }}>{summary}</p>

          {(e1 || e2) && <SecHeader a={a} title="Work Experience" />}
          {e1 && <ExpBlock a={a} role={data.exp1_role} company={data.exp1_company} date={data.exp1_date} desc={data.exp1_desc} />}
          {e2 && <ExpBlock a={a} role={data.exp2_role} company={data.exp2_company} date={data.exp2_date} desc={data.exp2_desc} />}

          {(ed1 || ed2 || ed3) && <SecHeader a={a} title="Education" />}
          {ed1 && <EduBlock a={a} degree={data.edu_degree} school={data.edu_school} date={data.edu_date} grade={data.edu_grade} />}
          {ed2 && <EduBlock a={a} degree={data.edu_degree2} school={data.edu_school2} date={data.edu_date2} grade={data.edu_grade2} />}
          {ed3 && <EduBlock a={a} degree={data.edu_degree3} school={data.edu_school3} date={data.edu_date3} grade={data.edu_grade3} />}

          {(p1 || p2) && <SecHeader a={a} title="Projects" />}
          {p1 && <ProjBlock a={a} title={data.project_1_title} link={data.project_1_link} time={data.project_1_time_spent} desc={data.project_1_desc} />}
          {p2 && <ProjBlock a={a} title={data.project_2_title} link={data.project_2_link} time={data.project_2_time_spent} desc={data.project_2_desc} />}
        </div>
      </div>
    );
  }

  /* ── Modern / Band Header Layout (ids 2, 3) ── */
  if (tpl.id === 2 || tpl.id === 3) {
    return (
      <div style={{ fontFamily: "Arial, Helvetica, sans-serif", background: "#fff", minHeight: "100%" }}>
        {/* Colored header band */}
        <div style={{ background: a, padding: "24px 22px 20px" }}>
          <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", lineHeight: 1.1, marginBottom: 5 }}>{name}</div>
          <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.82)", marginBottom: 10, fontWeight: 500, letterSpacing: "0.02em" }}>{jobTitle}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px 14px", fontSize: 8, color: "rgba(255,255,255,0.72)" }}>
            <span>{email}</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>{phone}</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>{loc}</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "14px 22px" }}>
          <BandSecHeader a={a} title="Professional Summary" />
          <p style={{ margin: 0, fontSize: 8.5, color: "#374151", lineHeight: 1.65 }}>{summary}</p>

          {(e1 || e2) && <BandSecHeader a={a} title="Work Experience" />}
          {e1 && <ExpBlock a={a} role={data.exp1_role} company={data.exp1_company} date={data.exp1_date} desc={data.exp1_desc} />}
          {e2 && <ExpBlock a={a} role={data.exp2_role} company={data.exp2_company} date={data.exp2_date} desc={data.exp2_desc} />}

          {(ed1 || ed2 || ed3) && <BandSecHeader a={a} title="Education" />}
          {ed1 && <EduBlock a={a} degree={data.edu_degree} school={data.edu_school} date={data.edu_date} grade={data.edu_grade} />}
          {ed2 && <EduBlock a={a} degree={data.edu_degree2} school={data.edu_school2} date={data.edu_date2} grade={data.edu_grade2} />}
          {ed3 && <EduBlock a={a} degree={data.edu_degree3} school={data.edu_school3} date={data.edu_date3} grade={data.edu_grade3} />}

          {(p1 || p2) && <BandSecHeader a={a} title="Projects" />}
          {p1 && <ProjBlock a={a} title={data.project_1_title} link={data.project_1_link} time={data.project_1_time_spent} desc={data.project_1_desc} />}
          {p2 && <ProjBlock a={a} title={data.project_2_title} link={data.project_2_link} time={data.project_2_time_spent} desc={data.project_2_desc} />}

          {skills.length > 0 && (
            <>
              <BandSecHeader a={a} title="Skills" />
              <SkillTags a={a} skills={skills} />
            </>
          )}
        </div>
      </div>
    );
  }

  /* ── Classic Centered Layout (ids 1, 4, 5, 7) ── */
  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: tpl.bg, padding: "22px 24px", minHeight: "100%" }}>
      {/* Centered header */}
      <div style={{ textAlign: "center", paddingBottom: 12, marginBottom: 4, borderBottom: `2.5px solid ${a}` }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: a, letterSpacing: "-0.3px", lineHeight: 1.1 }}>{name}</div>
        <div style={{ fontSize: 10.5, color: "#64748b", marginTop: 4, fontStyle: "italic", letterSpacing: "0.02em" }}>{jobTitle}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, fontSize: 8.5, color: "#94a3b8", marginTop: 7, flexWrap: "wrap" }}>
          <span>{email}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{phone}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{loc}</span>
        </div>
      </div>

      <SecHeader a={a} title="Professional Summary" />
      <p style={{ margin: 0, fontSize: 8.5, color: "#374151", lineHeight: 1.65 }}>{summary}</p>

      {(e1 || e2) && <SecHeader a={a} title="Work Experience" />}
      {e1 && <ExpBlock a={a} role={data.exp1_role} company={data.exp1_company} date={data.exp1_date} desc={data.exp1_desc} />}
      {e2 && <ExpBlock a={a} role={data.exp2_role} company={data.exp2_company} date={data.exp2_date} desc={data.exp2_desc} />}

      {(ed1 || ed2 || ed3) && <SecHeader a={a} title="Education" />}
      {ed1 && <EduBlock a={a} degree={data.edu_degree} school={data.edu_school} date={data.edu_date} grade={data.edu_grade} />}
      {ed2 && <EduBlock a={a} degree={data.edu_degree2} school={data.edu_school2} date={data.edu_date2} grade={data.edu_grade2} />}
      {ed3 && <EduBlock a={a} degree={data.edu_degree3} school={data.edu_school3} date={data.edu_date3} grade={data.edu_grade3} />}

      {(p1 || p2) && <SecHeader a={a} title="Projects" />}
      {p1 && <ProjBlock a={a} title={data.project_1_title} link={data.project_1_link} time={data.project_1_time_spent} desc={data.project_1_desc} />}
      {p2 && <ProjBlock a={a} title={data.project_2_title} link={data.project_2_link} time={data.project_2_time_spent} desc={data.project_2_desc} />}

      {skills.length > 0 && (
        <>
          <SecHeader a={a} title="Skills" />
          <SkillTags a={a} skills={skills} />
        </>
      )}
    </div>
  );
}

const Resume = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [data, setData] = useState(EMPTY);
  const [saved, setSaved] = useState(false);
  const sliderRef = useRef(null);
  const previewRef = useRef(null);

  const tpl = TEMPLATES.find((t) => t.id === selectedId);
  const a = tpl.accent;

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }));

  const scroll = (dir) => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({ left: dir * 100, behavior: "smooth" });
  };

  const handleSave = () => {
    const list = JSON.parse(localStorage.getItem("savedResumes") || "[]");
    const entry = {
      id: Date.now(),
      name: data.name || "Untitled Resume",
      template: tpl.name,
      data,
      savedAt: new Date().toISOString(),
    };
    list.push(entry);
    localStorage.setItem("savedResumes", JSON.stringify(list));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDownload = () => {
    const node = previewRef.current;
    if (!node) return;
    const win = window.open("", "_blank");
    win.document.write(
      `<!DOCTYPE html><html><head><title>${data.name || "Resume"}</title>` +
      `<style>*{box-sizing:border-box;margin:0;padding:0}body{margin:0;padding:0;background:white}` +
      `@media print{@page{margin:0;size:A4 portrait}}</style></head>` +
      `<body>${node.innerHTML}</body></html>`
    );
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 400);
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 11px",
    fontSize: 13,
    border: "1.5px solid #e2e8f0",
    borderRadius: 8,
    outline: "none",
    fontFamily: "system-ui, sans-serif",
    color: "#1e293b",
    background: "#fff",
    transition: "border-color 0.15s",
  };
  const labelCss = {
    fontSize: 11,
    fontWeight: 600,
    color: "#64748b",
    marginBottom: 4,
    display: "block",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  };
  const sectionHead = {
    fontSize: 12,
    fontWeight: 700,
    color: a,
    borderBottom: `2px solid ${a}`,
    paddingBottom: 6,
    marginBottom: 14,
    marginTop: 20,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  };

  return (
    <div className="mx-auto flex min-h-screen w-[min(1280px,94%)] flex-col justify-center rounded-lg bg-linear-to-br from-gray-900 via-gray-800 to-black pb-5 font-sans max-[680px]:w-[min(1280px,96%)] max-[680px]:py-6 max-[680px]:pb-10 max-[480px]:w-full max-[480px]:px-0 max-[480px]:py-4">
      {/* Step 1: Template slider */}
      <div className="border-b border-white/10 px-7 py-4">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.08em] text-gray-400">
          Step 1 — Choose a template
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => scroll(-1)}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/20 bg-white/5 text-base text-gray-300 hover:bg-white/10"
          >
            ‹
          </button>
          <div
            ref={sliderRef}
            className="flex flex-1 gap-3 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:none]"
          >
            {TEMPLATES.map((t) => (
              <TemplateThumbnail
                key={t.id}
                tpl={t}
                selected={selectedId === t.id}
                onClick={() => setSelectedId(t.id)}
              />
            ))}
          </div>
          <button
            onClick={() => scroll(1)}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-white/20 bg-white/5 text-base text-gray-300 hover:bg-white/10"
          >
            ›
          </button>
        </div>
      </div>

      {/* Step 2: Editor + Preview */}
      <div className="m-4 flex flex-col lg:flex-row  gap-4 ">
        {/* Left: Input form */}
        <div className="w-full overflow-y-auto rounded-lg border-2 border-slate-200 bg-white p-5 lg:w-1/2 lg:max-h-[calc(110vh-10px)]">
          <div className="text-sm font-bold text-slate-900">
            Step 2 — Fill in your details
          </div>
          <div className="mb-4.5 text-xs text-slate-400">
            Your resume updates live as you type
          </div>
          {/* Personal */}
          <div style={sectionHead}>Personal Info</div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label style={labelCss}>Full name</label>
              <input
                style={inputStyle}
                placeholder="John Doe"
                value={data.name}
                onChange={set("name")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Job title</label>
              <input
                style={inputStyle}
                placeholder="Software Engineer"
                value={data.title}
                onChange={set("title")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Email</label>
              <input
                style={inputStyle}
                placeholder="john@email.com"
                value={data.email}
                onChange={set("email")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Phone</label>
              <input
                style={inputStyle}
                placeholder="+91 98765 43210"
                value={data.phone}
                onChange={set("phone")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Location</label>
              <input
                style={inputStyle}
                placeholder="Hyderabad, India"
                value={data.location}
                onChange={set("location")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          {/* Summary */}
          <div style={sectionHead}>Summary</div>
          <textarea
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
            placeholder="Write a short professional summary..."
            value={data.summary}
            onChange={set("summary")}
            onFocus={(e) => (e.target.style.borderColor = a)}
            onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
          />
          {/* Education */}
          <div style={sectionHead}>Education</div>
          <div className="mb-3 flex flex-col gap-3">
            <div>
              <label style={labelCss}>Degree</label>
              <input
                style={inputStyle}
                placeholder="B.Tech Computer Science"
                value={data.edu_degree}
                onChange={set("edu_degree")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>School / University</label>
              <input
                style={inputStyle}
                placeholder="Osmania University"
                value={data.edu_school}
                onChange={set("edu_school")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Year</label>
              <input
                style={inputStyle}
                placeholder="2018 – 2022"
                value={data.edu_date}
                onChange={set("edu_date")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>CGPA</label>
              <input
                style={inputStyle}
                placeholder="8.5"
                value={data.edu_grade}
                onChange={set("edu_grade")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          <div style={sectionHead}>Education 2</div>
          <div className="mb-3 flex flex-col gap-3">
            <div>
              <label style={labelCss}>Degree</label>
              <input
                style={inputStyle}
                placeholder="Intermediate / 12th"
                value={data.edu_degree2}
                onChange={set("edu_degree2")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>School / University</label>
              <input
                style={inputStyle}
                placeholder="Board / College Name"
                value={data.edu_school2}
                onChange={set("edu_school2")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Year</label>
              <input
                style={inputStyle}
                placeholder="2016 – 2018"
                value={data.edu_date2}
                onChange={set("edu_date2")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Marks / Percentage</label>
              <input
                style={inputStyle}
                placeholder="92%"
                value={data.edu_grade2}
                onChange={set("edu_grade2")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          <div style={sectionHead}>Education 3</div>
          <div className="mb-3 flex flex-col gap-3">
            <div>
              <label style={labelCss}>Degree</label>
              <input
                style={inputStyle}
                placeholder="SSC / 10th"
                value={data.edu_degree3}
                onChange={set("edu_degree3")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>School / University</label>
              <input
                style={inputStyle}
                placeholder="School Name"
                value={data.edu_school3}
                onChange={set("edu_school3")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Year</label>
              <input
                style={inputStyle}
                placeholder="2014 – 2016"
                value={data.edu_date3}
                onChange={set("edu_date3")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>GPA / Percentage</label>
              <input
                style={inputStyle}
                placeholder="95%"
                value={data.edu_grade3}
                onChange={set("edu_grade3")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          {/* Project 1 */}
          <div style={sectionHead}>Project 1</div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label style={labelCss}>Title</label>
              <input
                style={inputStyle}
                placeholder="Project Title"
                value={data.project_1_title}
                onChange={set("project_1_title")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Duration</label>
              <input
                style={inputStyle}
                placeholder="4 Months"
                value={data.project_1_time_spent}
                onChange={set("project_1_time_spent")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Demo Link</label>
              <input
                style={inputStyle}
                placeholder="https://demo-project.com"
                value={data.project_1_link}
                onChange={set("project_1_link")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Description</label>
              <textarea
                rows={2}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="What did you build or achieve?"
                value={data.project_1_desc}
                onChange={set("project_1_desc")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          {/* Project 2 */}
          <div style={sectionHead}>Project 2</div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label style={labelCss}>Title</label>
              <input
                style={inputStyle}
                placeholder="Project Title"
                value={data.project_2_title}
                onChange={set("project_2_title")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Duration</label>
              <input
                style={inputStyle}
                placeholder="3 Months"
                value={data.project_2_time_spent}
                onChange={set("project_2_time_spent")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Demo Link</label>
              <input
                style={inputStyle}
                placeholder="https://demo-project.com"
                value={data.project_2_link}
                onChange={set("project_2_link")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Description</label>
              <textarea
                rows={2}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="Key responsibilities and wins"
                value={data.project_2_desc}
                onChange={set("project_2_desc")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          {/* Experience 1 */}
          <div style={sectionHead}>Experience 1</div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label style={labelCss}>Role</label>
              <input
                style={inputStyle}
                placeholder="Frontend Developer"
                value={data.exp1_role}
                onChange={set("exp1_role")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Company</label>
              <input
                style={inputStyle}
                placeholder="Acme Corp"
                value={data.exp1_company}
                onChange={set("exp1_company")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Date range</label>
              <input
                style={inputStyle}
                placeholder="Jan 2022 – Present"
                value={data.exp1_date}
                onChange={set("exp1_date")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Description</label>
              <textarea
                rows={2}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="What did you build or achieve?"
                value={data.exp1_desc}
                onChange={set("exp1_desc")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          {/* Experience 2 */}
          <div style={sectionHead}>Experience 2</div>
          <div className="mb-3 grid grid-cols-2 gap-3">
            <div>
              <label style={labelCss}>Role</label>
              <input
                style={inputStyle}
                placeholder="Junior Developer"
                value={data.exp2_role}
                onChange={set("exp2_role")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div>
              <label style={labelCss}>Company</label>
              <input
                style={inputStyle}
                placeholder="Startup Inc."
                value={data.exp2_company}
                onChange={set("exp2_company")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Date range</label>
              <input
                style={inputStyle}
                placeholder="Jun 2020 – Dec 2021"
                value={data.exp2_date}
                onChange={set("exp2_date")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="col-span-2">
              <label style={labelCss}>Description</label>
              <textarea
                rows={2}
                style={{ ...inputStyle, resize: "vertical" }}
                placeholder="Key responsibilities and wins"
                value={data.exp2_desc}
                onChange={set("exp2_desc")}
                onFocus={(e) => (e.target.style.borderColor = a)}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
          </div>
          {/* Skills */}
          <div style={sectionHead}>Skills</div>
          <div>
            <label style={labelCss}>Skills (comma separated)</label>
            <input
              style={inputStyle}
              placeholder="React, TypeScript, Node.js, Figma"
              value={data.skills}
              onChange={set("skills")}
              onFocus={(e) => (e.target.style.borderColor = a)}
              onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
            />
          </div>
        </div>

        {/* Right: Live preview */}
        <div className="flex flex-col gap-3 w-full rounded-lg bg-white p-6 lg:w-1/2">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between w-full gap-2">
              <div className="text-sm font-bold text-slate-900">
                Live Preview
              </div>
              <div className="text-xs text-slate-400">
                Template:{" "}
                <span style={{ color: a, fontWeight: 600 }}>{tpl.name}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="cursor-pointer self-end rounded-lg border px-4 py-2 text-[13px] font-semibold transition"
                  style={{
                    borderColor: a,
                    color: saved ? "#fff" : a,
                    background: saved ? a : "#fff",
                  }}
                >
                  {saved ? "Saved!" : "Save"}
                </button>
                <button
                  onClick={handleDownload}
                  className="cursor-pointer self-end rounded-lg border-none px-5 py-2 text-[13px] font-semibold text-white"
                  style={{ background: a }}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* A4 paper preview */}
          <div ref={previewRef} className="h-100vh min-h-120 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.10)]">
            <ResumePreview tpl={tpl} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resume;
