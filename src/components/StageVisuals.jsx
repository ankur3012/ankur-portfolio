import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  CheckCircle2,
  XCircle,
  Mail,
  Phone,
  MapPin,
  Terminal,
  Sparkles,
  ExternalLink,
  Briefcase,
  Code2,
  GraduationCap,
} from "lucide-react";

export default function StageVisuals({ stage }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage.id}
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.98 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
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

/* 1. PROFILE BENTO CARD (Clean Visual — No JSON) */
function ProfileCard() {
  return (
    <div className="space-y-5">
      {/* Header with Avatar & Status */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-teal-400 flex items-center justify-center font-bold text-white text-lg shadow-[0_0_15px_rgba(99,102,241,0.3)]">
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

      {/* MCA GPA Highlight */}
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

      {/* Quick Bento Stats */}
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

/* 2. EXPERIENCE TIMELINE CARD */
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
      points: [
        "Hands-on development in Advanced Java.",
        "Built an Online ATM System project.",
      ],
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
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              selected === i
                ? "bg-teal-500 text-zinc-950 font-semibold shadow-[0_0_12px_rgba(20,184,166,0.4)]"
                : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
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
        <ul className="space-y-2.5 pt-2">
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

/* 3. PROJECTS + LIVE EMAIL VALIDATOR CARD */
/* 3. PROJECTS INTERACTIVE TABS CARD */
function ProjectsCard() {
  const [selected, setSelected] = useState(0);
  const [email, setEmail] = useState("ankur.dev@gmail.com");
  const [city, setCity] = useState("Ranchi");

  const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isDisposable = /(tempmail|10minutemail|mailinator)/i.test(email);

  const weatherSamples = {
    Ranchi: { temp: "26°C", condition: "Clear Sky", humidity: "48%" },
    Bengaluru: { temp: "24°C", condition: "Partly Cloudy", humidity: "62%" },
    Delhi: { temp: "29°C", condition: "Haze", humidity: "40%" },
  };

  const projects = [
    {
      tab: "Employee Mgmt",
      title: "Employee Management System",
      period: "09/2026",
      stack: ["React.js", "Node.js", "Express.js", "MongoDB"],
      points: [
        "Built web-based employee & department management modules.",
        "Implemented REST backend APIs with MongoDB integration.",
        "Added user authentication and frontend-backend integration.",
      ],
    },
    {
      tab: "Email Validator",
      title: "Email Validator Web App",
      period: "10/2023",
      stack: ["HTML", "CSS", "JavaScript", "MX / SMTP"],
      points: [
        "Implemented format, domain, and disposable email checks.",
        "Added MX and SMTP-based email verification features.",
      ],
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
    },
  ];

  const current = projects[selected];

  return (
    <div className="space-y-4">
      <p className="text-xs font-mono text-zinc-500">FEATURED BUILDS · CLICK TO INSPECT</p>

      {/* Clickable Project Tabs */}
      <div className="flex gap-2 flex-wrap">
        {projects.map((p, i) => (
          <button
            key={p.tab}
            onClick={() => setSelected(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
              selected === i
                ? "bg-violet-500 text-zinc-950 font-semibold shadow-[0_0_12px_rgba(139,92,246,0.45)]"
                : "bg-zinc-800/80 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
            }`}
          >
            {p.tab}
          </button>
        ))}
      </div>

      {/* Selected Project Details */}
      <div className="border border-zinc-800 rounded-xl p-4 bg-zinc-950/60 space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h4 className="font-bold text-white text-sm">{current.title}</h4>
          <span className="text-[11px] font-mono text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded">
            {current.period}
          </span>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5">
          {current.stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Resume Bullet Points */}
        <ul className="space-y-1.5">
          {current.points.map((pt, idx) => (
            <li key={idx} className="text-xs text-zinc-300 flex gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
              <span>{pt}</span>
            </li>
          ))}
        </ul>

        {/* Mini Interactive Preview per Project */}
        {selected === 0 && (
          <div className="pt-2 border-t border-zinc-800/80 grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
              <p className="text-violet-400 font-bold">JWT</p>
              <p className="text-zinc-500 text-[10px]">Auth Active</p>
            </div>
            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
              <p className="text-emerald-400 font-bold">REST</p>
              <p className="text-zinc-500 text-[10px]">CRUD APIs</p>
            </div>
            <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800">
              <p className="text-sky-400 font-bold">Atlas</p>
              <p className="text-zinc-500 text-[10px]">MongoDB</p>
            </div>
          </div>
        )}

        {selected === 1 && (
          <div className="pt-2 border-t border-zinc-800/80 space-y-2">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Test an email..."
              className="w-full px-2.5 py-1.5 text-xs bg-zinc-900 border border-zinc-800 text-white rounded-lg focus:outline-none focus:border-violet-500 font-mono"
            />
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1.5 text-zinc-300">
                {isValidFormat ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-red-400" />
                )}
                <span>Syntax: {isValidFormat ? "PASS" : "FAIL"}</span>
              </div>
              <div className="px-2.5 py-1.5 rounded bg-zinc-900 border border-zinc-800 flex items-center gap-1.5 text-zinc-300">
                {!isDisposable && isValidFormat ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <XCircle className="w-3.5 h-3.5 text-red-400" />
                )}
                <span>Domain: {isDisposable ? "TEMP" : "CLEAN"}</span>
              </div>
            </div>
          </div>
        )}

        {selected === 2 && (
          <div className="pt-2 border-t border-zinc-800/80 space-y-2">
            <div className="flex gap-1.5">
              {Object.keys(weatherSamples).map((c) => (
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
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono">
              <span className="text-zinc-300">{city}</span>
              <span className="text-sky-400 font-bold">{weatherSamples[city].temp}</span>
              <span className="text-zinc-400">{weatherSamples[city].condition}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* 4. QA & SELENIUM SIMULATOR CARD */
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
      }, (idx + 1) * 550);
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
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-zinc-950 font-semibold text-xs cursor-pointer disabled:opacity-50 transition"
        >
          <Play className="w-3.5 h-3.5" />
          {running ? "Running..." : "Run Suite"}
        </button>
      </div>

      <div className="space-y-2.5">
        {steps.map((step, i) => {
          const done = i < completed;
          return (
            <div
              key={step}
              className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between transition-all ${
                done
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-zinc-950/60 border-zinc-800 text-zinc-500"
              }`}
            >
              <span>{step}</span>
              <span className="font-bold">{done ? "PASS" : "..."}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* 5. SKILLS MATRIX CARD */
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
            className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition ${
              tab === cat
                ? "bg-amber-500 text-zinc-950 font-semibold"
                : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        {categories[tab].map((skill) => (
          <span
            key={skill}
            className="px-3 py-1.5 rounded-lg bg-zinc-950/70 border border-zinc-800 text-xs font-mono font-medium text-zinc-200 hover:border-amber-500/40 transition"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

/* 6. CONTACT CARD */
/* 6. PRIVACY-PROTECTED CONTACT REQUEST CARD */
function ContactCard({ stage }) {
  const [name, setName] = useState("");
  const [requesterEmail, setRequesterEmail] = useState("");
  const [purpose, setPurpose] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleRequest = async (e) => {
    e.preventDefault();
    if (!name.trim() || !requesterEmail.trim()) return;

    setStatus("sending");

    // Optional: Web3Forms ka free access key daalne par real email aayega
    // (Key lene ke liye web3forms.com par apna email daalein — aapka email code mein hidden rahega)
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
            email: requesterEmail,
            message: purpose || "Requested direct email & phone number.",
          }),
        });
      } catch (err) {
        console.error(err);
      }
    }

    setTimeout(() => {
      setStatus("sent");
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-zinc-500">PRIVACY SHIELD · ON REQUEST</p>
        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Protected
        </span>
      </div>

      {/* Hidden Details Notice */}
      <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-950/70 border border-zinc-800 text-xs">
        <div className="flex items-center gap-2 text-zinc-300">
          <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Email & Phone Number</span>
        </div>
        <span className="font-mono text-[11px] text-zinc-500">Hidden · Request below</span>
      </div>

      {/* Request Form OR Success Message */}
      {status === "sent" ? (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
          <CheckCircle2 className="w-7 h-7 text-emerald-400 mx-auto" />
          <p className="text-sm font-semibold text-white">Request Received!</p>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Thanks <span className="text-emerald-400 font-medium">{name}</span>, your request has been noted. I will share my direct email & phone number with you at{" "}
            <span className="font-mono text-zinc-200">{requesterEmail}</span> shortly.
          </p>
          <button
            onClick={() => {
              setStatus("idle");
              setName("");
              setRequesterEmail("");
              setPurpose("");
            }}
            className="text-[11px] font-mono text-emerald-400 hover:underline pt-1 cursor-pointer"
          >
            Send another request
          </button>
        </div>
      ) : (
        <form onSubmit={handleRequest} className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name *"
              className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 text-white rounded-lg focus:outline-none focus:border-emerald-500"
            />
            <input
              type="email"
              required
              value={requesterEmail}
              onChange={(e) => setRequesterEmail(e.target.value)}
              placeholder="Your Work Email *"
              className="w-full px-3 py-2 text-xs bg-zinc-950 border border-zinc-800 text-white rounded-lg focus:outline-none focus:border-emerald-500"
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
            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs transition cursor-pointer disabled:opacity-50"
          >
            {status === "sending" ? "Sending Request..." : "Request Email & Phone"}
          </button>
        </form>
      )}

      {/* Location + Public Links */}
      <div className="pt-1 flex items-center justify-between text-xs text-zinc-400">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Ranchi, Jharkhand
        </span>
        <div className="flex gap-2">
          <a
            href={stage.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-[11px] font-medium transition"
          >
            <ExternalLink className="w-3 h-3" /> GitHub
          </a>
          <a
            href={stage.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-medium transition"
          >
            <ExternalLink className="w-3 h-3" /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}