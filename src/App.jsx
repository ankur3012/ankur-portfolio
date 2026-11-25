import { useRef, useState, useEffect } from "react";
import {
  useScroll,
  useMotionValueEvent,
  useSpring,
  motion,
  AnimatePresence,
} from "framer-motion";
import { FileText, ArrowDown, X, Printer } from "lucide-react";
import { RESUME_STAGES } from "./data/resumeData";
import OrbitalWheel from "./components/OrbitalWheel";
import StageVisuals from "./components/StageVisuals";

export default function App() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showResume, setShowResume] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothBar = useSpring(scrollYProgress, { stiffness: 260, damping: 28 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = RESUME_STAGES.length;
    const index = Math.min(total - 1, Math.max(0, Math.round(latest * (total - 1))));
    setActiveIndex(index);
  });

  const activeStage = RESUME_STAGES[activeIndex];

  const scrollToStage = (index) => {
    if (!containerRef.current) return;
    const clamped = Math.max(0, Math.min(RESUME_STAGES.length - 1, index));
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const scrollableHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetY =
      containerTop + (clamped / (RESUME_STAGES.length - 1)) * scrollableHeight;

    setActiveIndex(clamped);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showResume) {
        if (e.key === "Escape") setShowResume(false);
        return;
      }

      const tag = e.target.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      const numMatch =
        ["1", "2", "3", "4", "5", "6"].includes(e.key)
          ? Number(e.key)
          : e.code?.startsWith("Digit") || e.code?.startsWith("Numpad")
          ? Number(e.code.replace("Digit", "").replace("Numpad", ""))
          : null;

      if (numMatch >= 1 && numMatch <= 6) {
        e.preventDefault();
        scrollToStage(numMatch - 1);
      } else if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToStage(activeIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToStage(activeIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, showResume]);

  return (
    <div className="min-h-screen text-zinc-100 selection:bg-indigo-500/30">
      {/* Navbar + Glowing Progress Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-800/80">
        <div className="px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => scrollToStage(0)}
            className="font-bold tracking-wider text-sm flex items-center gap-2.5 text-white cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
            ANKUR KUMAR
          </button>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
              Stage <span className="text-indigo-400">{activeStage.step}</span> / 06 —{" "}
              {activeStage.label}
            </div>
            <button
              onClick={() => setShowResume(true)}
              className="flex items-center gap-1.5 text-xs font-medium px-3.5 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.35)] transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>
        </div>

        <div className="w-full h-[2px] bg-zinc-900">
          <motion.div
            style={{ scaleX: smoothBar }}
            className="h-full bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 origin-left"
          />
        </div>
      </header>

      {/* Scroll Container */}
      <section ref={containerRef} className="relative h-[280vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-14">
          {/* Mobile Stage Tabs */}
          <div className="flex lg:hidden gap-2 overflow-x-auto px-6 pb-4">
            {RESUME_STAGES.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => scrollToStage(idx)}
                className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap ${
                  idx === activeIndex
                    ? "bg-indigo-500 text-white"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400"
                }`}
              >
                {st.step} {st.label}
              </button>
            ))}
          </div>

          <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT: Orbital Wheel */}
            <div className="hidden lg:flex lg:col-span-3 items-center">
              <OrbitalWheel
                stages={RESUME_STAGES}
                activeIndex={activeIndex}
                scrollYProgress={scrollYProgress}
                onSelectStage={scrollToStage}
              />
            </div>

            {/* MIDDLE: Stage Details */}
            <div className="lg:col-span-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4"
                >
                  <span className="inline-block text-xs font-mono font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {activeStage.step} · {activeStage.badge}
                  </span>
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
                    {activeStage.title}
                  </h1>
                  <p className="text-sm font-medium text-teal-400">
                    {activeStage.subtitle}
                  </p>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {activeStage.description}
                  </p>
                  <ul className="space-y-2.5 pt-2">
                    {activeStage.bullets.map((item, idx) => (
                      <li key={idx} className="text-sm text-zinc-300 flex gap-2.5">
                        <span className="text-indigo-400 font-bold">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeStage.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT: Interactive Visual Cards */}
            <div className="lg:col-span-5">
              <StageVisuals stage={activeStage} />
            </div>
          </div>

          {/* Bottom Keyboard/Scroll Hint */}
          {activeIndex === 0 && (
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-400 absolute bottom-6 left-1/2 -translate-x-1/2">
              <ArrowDown className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
              <span>
                Scroll or press <kbd className="text-zinc-200">↑</kbd>{" "}
                <kbd className="text-zinc-200">↓</kbd> /{" "}
                <kbd className="text-zinc-200">1–6</kbd>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* ATS Resume Modal with Direct Contact */}
      {showResume && (() => {
        // 👇 Yahan apna real email aur phone number daal dein
        const contactEmail = ["ska3709", "gmail.com"].join("@");
        const contactPhone = ["+91", "79923", "48514"].join("-");

        return (
          <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 my-8">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 no-print">
                <span className="text-xs font-mono text-emerald-400">
                  ATS RESUME · DIRECT CONTACT UNLOCKED
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Save as PDF</span>
                  </button>
                  <button
                    onClick={() => setShowResume(false)}
                    className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div
                id="printable-resume"
                className="bg-white text-gray-900 rounded-xl p-6 space-y-3 text-xs leading-relaxed"
              >
                <div className="border-b border-gray-300 pb-2">
                  <h2 className="text-xl font-bold">ANKUR KUMAR</h2>
                  <p className="text-gray-700 font-medium mt-0.5">
                    Ranchi, Jharkhand · {contactEmail} · {contactPhone}
                  </p>
                  <p className="text-gray-600">
                    github.com/ankur3012 · linkedin.com/in/ankur-kumar-115886156
                  </p>
                </div>
                <div>
                  <h3 className="font-bold uppercase text-[11px] border-b border-gray-200 pb-0.5 mb-1">
                    Summary
                  </h3>
                  <p className="text-gray-700">
                    MCA graduate with experience in software development and testing. Skilled in Java, JavaScript, React.js, Node.js, and SQL.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold uppercase text-[11px] border-b border-gray-200 pb-0.5 mb-1">
                    Work Experience
                  </h3>
                  <p>
                    <strong>Infosys — Operation Executive (Software Testing)</strong> (12/2021 – 06/2022): Functional & regression testing of banking web app; Java + Selenium WebDriver automation; JIRA & Jenkins.
                  </p>
                  <p className="mt-1">
                    <strong>Briztech Infosystems — Developer Intern</strong> (02/2022 – 04/2022): Advanced Java & Online ATM System project.
                  </p>
                  <p className="mt-1">
                    <strong>RSG Software Services — Developer Intern</strong> (12/2018 – 02/2019): Android Blood Bank App (Java, Android SDK, MySQL).
                  </p>
                </div>
                <div>
                  <h3 className="font-bold uppercase text-[11px] border-b border-gray-200 pb-0.5 mb-1">
                    Projects
                  </h3>
                  <p>
                    <strong>Employee Management System (09/2026):</strong> React.js, Node.js, Express.js, MongoDB.
                  </p>
                  <p>
  <strong>iValidate — Email Validator (10/2023):</strong> HTML, CSS, JavaScript, REST API; single & bulk validation, MX/SMTP checks, disposable detection, typo suggestions & CSV export.
</p>
                  <p>
                    <strong>Weather App (07/2023 – 08/2023):</strong> HTML, CSS, JS, Weather API.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div>
                    <h3 className="font-bold uppercase text-[11px] border-b border-gray-200 pb-0.5 mb-1">
                      Education
                    </h3>
                    <p>
                      <strong>MCA (9.28 / 10.00 GPA)</strong> — DSPMU Ranchi (2019–2022)
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold uppercase text-[11px] border-b border-gray-200 pb-0.5 mb-1">
                      Skills
                    </h3>
                    <p>
                      Java, JavaScript, Python, React.js, Node.js, SQL, MongoDB, Selenium, Android SDK, Git, JIRA, Jenkins
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}