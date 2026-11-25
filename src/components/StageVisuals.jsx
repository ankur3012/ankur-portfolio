import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  CheckCircle2,
  XCircle,
  Mail,
  MapPin,
  Terminal,
  Sparkles,
  ExternalLink,
  Briefcase,
  Code2,
  GraduationCap,
  Globe,
} from "lucide-react";

export default function StageVisuals({ stage }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage.id}
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -14, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="w-full bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/90 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.4)] p-6 min-h-[380px] flex flex-col justify-between"
      >
        {stage.id === 0 && <ProfileCard />}
        {stage.id === 1 && <ExperienceCard />}
        {stage.id === 2 && <ProjectsCard />}
        {stage.id === 3 && <TestingCard />}
        {stage.id === 4 && <SkillsCard />}
        {stage.id === 5 && <ContactCard stage={stage} />}
      </motion.div>
    </AnimatePresence>
  );
}

/* 1. PROFILE CARD */
function ProfileCard() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center font-bold text-white text-lg">
            AK
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Ankur Kumar</h3>
            <p className="text-xs text-zinc-400">Ranchi, Jharkhand</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Open to Work
        </span>
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-400">
            <GraduationCap className="w-4 h-4" />
            <span>MASTER OF COMPUTER APPLICATIONS</span>
          </div>
          <p className="text-sm font-semibold text-zinc-100 mt-1">
            Dr. Shyama Prasad Mukherjee University
          </p>
          <p className="text-xs text-zinc-500 mt-0.5">Jun 2019 – Aug 2022</p>
        </div>
        <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="26" fill="none" stroke="#27272a" strokeWidth="5" />
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="#6366f1"
              strokeWidth="5"
              strokeDasharray={163.36}
              strokeDashoffset={163.36 * (1 - 0.928)}
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-xs font-mono font-bold text-indigo-300">9.28</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
          <Briefcase className="w-4 h-4 text-teal-400 mb-2" />
          <p className="text-xs text-zinc-400">Industry Exp</p>
          <p className="text-sm font-bold text-white mt-0.5">Infosys QA & Dev</p>
        </div>
        <div className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
          <Code2 className="w-4 h-4 text-indigo-400 mb-2" />
          <p className="text-xs text-zinc-400">Core Stack</p>
          <p className="text-sm font-bold text-white mt-0.5">Java · MERN · SQL</p>
        </div>
      </div>
    </div>
  );
}

/* 2. EXPERIENCE CARD */
function ExperienceCard() {
  const roles = [
    {
      company: "Infosys",
      role: "Operation Executive (Software Testing)",
      period: "12/2021 – 06/2022",
      points: [
        "Functional & regression testing on banking web app.",
        "Automated scripts using Java + Selenium WebDriver.",
        "Defect tracking in JIRA & CI execution via Jenkins.",
      ],
    },
    {
      company: "Briztech Infosystems",
      role: "Developer Intern",
      period: "02/2022 – 04/2022",
      points: ["Hands-on development in Advanced Java.", "Built an Online ATM System project."],
    },
    {
      company: "RSG Software Services",
      role: "Developer Intern",
      period: "12/2018 – 02/2019",
      points: [
        "Built Android Blood Bank App (Java, Android SDK, MySQL).",
        "Implemented donor/recipient registration & DB connectivity.",
      ],
    },
  ];
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-4">
      <p className="text-xs font-mono text-zinc-500">EXECUTION TRACE · WORK HISTORY</p>
      <div className="flex gap-2 flex-wrap">
        {roles.map((r, i) => (
          <button
            key={r.company}
            onClick={() => setSelected(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition ${
              selected === i
                ? "bg-teal-500 text-zinc-950 font-semibold"
                : "bg-zinc-800/80 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {r.company}
          </button>
        ))}
      </div>

      <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-950/60 space-y-2">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h4 className="font-bold text-white text-sm">{roles[selected].role}</h4>
          <span className="text-[11px] font-mono text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded">
            {roles[selected].period}
          </span>
        </div>
        <ul className="space-y-2 pt-2">
          {roles[selected].points.map((pt, idx) => (
            <li key={idx} className="text-xs text-zinc-300 flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* 3. PROJECTS INTERACTIVE CARD */
/* 3. PROJECTS INTERACTIVE CARD */
function ProjectsCard() {
const [selected, setSelected] = useState(0);
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Ranchi");

  const trimmedEmail = email.trim();
  const hasInput = trimmedEmail.length > 0;
  const isValid = hasInput && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
  const domain = hasInput ? (trimmedEmail.split("@")[1] || "").toLowerCase() : "";
  const typos = {
    "gmial.com": "gmail.com",
    "gmai.com": "gmail.com",
    "yaho.com": "yahoo.com",
    "hotmal.com": "hotmail.com",
  };
  const isTemp = hasInput && /(tempmail|10minutemail|mailinator|guerrillamail)/i.test(domain);
  const suggestion = hasInput && typos[domain] ? `${trimmedEmail.split("@")[0]}@${typos[domain]}` : "";
  const qualityScore = !hasInput ? 0 : !isValid || suggestion ? 20 : isTemp ? 45 : 85;

  const weather = {
    Ranchi: { temp: "26°C", cond: "Clear Sky" },
    Bengaluru: { temp: "24°C", cond: "Partly Cloudy" },
    Delhi: { temp: "29°C", cond: "Haze" },
  };

  const projects = [
    {
      tab: "Employee Mgmt",
      title: "Employee Management System",
      period: "09/2026",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
      points: [
        "Built employee & department management modules.",
        "Implemented REST backend APIs with MongoDB & user authentication.",
      ],
      repoUrl: "https://github.com/ankur3012",
    },
    {
      tab: "iValidate (Email)",
      title: "iValidate — Pro Email Validator",
      period: "10/2023",
      stack: ["JavaScript", "REST API", "MX / SMTP", "CSV Export"],
      points: [
        "Built single & bulk (up to 10) email verification via REST API with local heuristic fallback.",
        "Implemented MX/SMTP checks, disposable domain detection, typo suggestions & 0–100% quality scoring.",
        "Added CSV report export, JSON copy, and LocalStorage history with Dark/Light mode.",
      ],
      repoUrl: "https://github.com/ankur3012",
    },
    {
      tab: "Weather App",
      title: "Real-Time Weather App",
      period: "07/2023 – 08/2023",
      stack: ["HTML", "CSS", "JavaScript", "Weather API"],
      points: [
        "Integrated live Weather API to fetch and display weather data.",
        "Designed a clean, responsive user interface.",
      ],
      repoUrl: "https://github.com/ankur3012",
    },
  ];

  const current = projects[selected];

  return (
    <div className="space-y-3.5">
      <p className="text-xs font-mono text-zinc-500">FEATURED BUILDS · CLICK TO INSPECT</p>
      <div className="flex gap-2 flex-wrap">
        {projects.map((p, i) => (
          <button
            key={p.tab}
            onClick={() => setSelected(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition ${
              selected === i
                ? "bg-violet-500 text-zinc-950 font-semibold"
                : "bg-zinc-800/80 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            {p.tab}
          </button>
        ))}
      </div>

      <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-950/60 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-bold text-white text-sm">{current.title}</h4>
          <span className="text-[11px] font-mono text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">
            {current.period}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {current.stack.map((t) => (
            <span
              key={t}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
            >
              {t}
            </span>
          ))}
        </div>

        <ul className="space-y-1.5">
          {current.points.map((pt, idx) => (
            <li key={idx} className="text-xs text-zinc-300 flex gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        {selected === 0 && (
          <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-violet-400 font-bold">
              JWT Auth
            </div>
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-emerald-400 font-bold">
              REST APIs
            </div>
            <div className="p-2 rounded bg-zinc-900 border border-zinc-800 text-sky-400 font-bold">
              MongoDB
            </div>
          </div>
        )}

        {selected === 1 && (
          <div className="pt-2 border-t border-zinc-800/80 space-y-2">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="test@example.com"
              className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 text-white placeholder:text-zinc-500 rounded-lg font-mono focus:outline-none focus:border-violet-500"
            />
            {suggestion && (
              <div className="text-[11px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded flex items-center justify-between">
                <span>Did you mean {suggestion}?</span>
                <button
                  onClick={() => setEmail(suggestion)}
                  className="underline font-bold text-amber-200 cursor-pointer"
                >
                  Fix
                </button>
              </div>
            )}
            <div className="grid grid-cols-3 gap-1.5 text-[10px] font-mono">
              <div
                className={`px-2 py-1 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1.5 ${
                  hasInput ? "text-zinc-300" : "text-zinc-500"
                }`}
              >
                {!hasInput ? (
                  <span className="w-2 h-2 rounded-full bg-zinc-600 shrink-0" />
                ) : isValid && !suggestion ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-3 h-3 text-red-400 shrink-0" />
                )}
                <span>MX/SMTP</span>
              </div>
              <div
                className={`px-2 py-1 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1.5 ${
                  hasInput ? "text-zinc-300" : "text-zinc-500"
                }`}
              >
                {!hasInput ? (
                  <span className="w-2 h-2 rounded-full bg-zinc-600 shrink-0" />
                ) : !isTemp && isValid ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="w-3 h-3 text-red-400 shrink-0" />
                )}
                <span>{isTemp ? "Temp Mail" : "Clean"}</span>
              </div>
              <div
                className={`px-2 py-1 rounded bg-zinc-900 border border-zinc-800 text-center font-bold ${
                  hasInput ? "text-violet-300" : "text-zinc-500"
                }`}
              >
                Score: {qualityScore}%
              </div>
            </div>
          </div>
        )}

        {selected === 2 && (
          <div className="pt-2 border-t border-zinc-800/80 space-y-2">
            <div className="flex gap-1.5">
              {Object.keys(weather).map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono cursor-pointer ${
                    city === c
                      ? "bg-sky-500/20 text-sky-300 border border-sky-500/40"
                      : "bg-zinc-900 text-zinc-500"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="flex justify-between px-3 py-1.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono">
              <span className="text-zinc-300">{city}</span>
              <span className="text-sky-400 font-bold">{weather[city].temp}</span>
              <span className="text-zinc-400">{weather[city].cond}</span>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-zinc-800/80">
          <a
            href={current.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-medium transition"
          >
            <Code2 className="w-3.5 h-3.5 text-violet-400" />
            <span>Source Code</span>
            <ExternalLink className="w-3 h-3 text-zinc-500" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* 4. QA SIMULATOR CARD */
function TestingCard() {
  const steps = [
    "Init Selenium WebDriver (Chrome)",
    "Login & Banking Dashboard Functional Check",
    "Regression Suite Execution (18/18 Passed)",
    "Jenkins Report Generated & JIRA Synced",
  ];
  const [completed, setCompleted] = useState(4);
  const [running, setRunning] = useState(false);

  const runSimulation = () => {
    if (running) return;
    setRunning(true);
    setCompleted(0);
    steps.forEach((_, idx) => {
      setTimeout(() => {
        setCompleted(idx + 1);
        if (idx === steps.length - 1) setRunning(false);
      }, (idx + 1) * 500);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
          <Terminal className="w-4 h-4 text-sky-400" />
          <span>JENKINS · SELENIUM PIPELINE</span>
        </div>
        <button
          onClick={runSimulation}
          disabled={running}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-zinc-950 font-semibold text-xs cursor-pointer disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5" />
          {running ? "Running..." : "Run Suite"}
        </button>
      </div>
      <div className="space-y-2.5">
        {steps.map((step, i) => (
          <div
            key={step}
            className={`p-3 rounded-xl border text-xs font-mono flex justify-between ${
              i < completed
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                : "bg-zinc-950/60 border-zinc-800 text-zinc-500"
            }`}
          >
            <span>{step}</span>
            <span className="font-bold">{i < completed ? "PASS" : "..."}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 5. SKILLS CARD */
function SkillsCard() {
  const categories = {
    All: ["Java", "JavaScript", "Python", "React.js", "Node.js", "HTML/CSS", "SQL", "MongoDB", "Selenium", "Android SDK", "Git"],
    Languages: ["Java", "JavaScript", "Python"],
    "Web & Mobile": ["React.js", "Node.js", "HTML/CSS", "Android SDK"],
    "DB & QA": ["SQL", "MongoDB", "Selenium", "Git", "JIRA", "Jenkins"],
  };
  const [tab, setTab] = useState("All");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>TECHNICAL STACK MATRIX</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {Object.keys(categories).map((cat) => (
          <button
            key={cat}
            onClick={() => setTab(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
              tab === cat ? "bg-amber-500 text-zinc-950 font-semibold" : "bg-zinc-800 text-zinc-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 pt-2">
        {categories[tab].map((skill) => (
          <span key={skill} className="px-3 py-1.5 rounded-lg bg-zinc-950/70 border border-zinc-800 text-xs font-mono text-zinc-200">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

/* 6. PRIVACY-PROTECTED CONTACT CARD */
function ContactCard({ stage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [status, setStatus] = useState("idle");

  const handleRequest = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("sending");

    // 👇 Apni Web3Forms Access Key yahan paste karein
    const ACCESS_KEY = "dd903fa3-ec8e-4c52-826d-88ee5f9f34bd";

    if (ACCESS_KEY !== "YOUR_WEB3FORMS_ACCESS_KEY") {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: ACCESS_KEY,
            subject: `Portfolio Contact Request from ${name}`,
            name,
            email,
            message: purpose || "Requested direct email & phone number.",
          }),
        });
      } catch (err) {
        console.error(err);
      }
    }
    setTimeout(() => setStatus("sent"), 400);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-zinc-500">PRIVACY SHIELD · ON REQUEST</p>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Protected
        </span>
      </div>

      <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs">
        <span className="flex items-center gap-2 text-zinc-300">
          <Mail className="w-4 h-4 text-emerald-400" /> Email & Phone Number
        </span>
        <span className="font-mono text-[11px] text-zinc-500">Hidden · Request below</span>
      </div>

      {status === "sent" ? (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
          <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto" />
          <p className="text-sm font-semibold text-white">Request Received!</p>
          <p className="text-xs text-zinc-300">
            Thanks <span className="text-emerald-400">{name}</span>, I will share my details at{" "}
            <span className="font-mono text-zinc-200">{email}</span> shortly.
          </p>
          <button
            onClick={() => {
              setStatus("idle");
              setName("");
              setEmail("");
              setPurpose("");
            }}
            className="text-[11px] font-mono text-emerald-400 hover:underline cursor-pointer"
          >
            Send another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleRequest} className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name *"
              className="px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 text-white rounded-lg focus:outline-none focus:border-emerald-500"
            />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Work Email *"
              className="px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 text-white rounded-lg focus:outline-none focus:border-emerald-500"
            />
          </div>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Company / Role (e.g. Hiring for SDE-1)"
            className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 text-white rounded-lg focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs cursor-pointer"
          >
            {status === "sending" ? "Sending..." : "Request Email & Phone"}
          </button>
        </form>
      )}

      <div className="pt-1 flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Ranchi, Jharkhand
        </span>
        <div className="flex gap-2">
          <a href={stage.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[11px]">
            <ExternalLink className="w-3 h-3" /> GitHub
          </a>
          <a href={stage.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px]">
            <ExternalLink className="w-3 h-3" /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}