import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence } from "framer-motion";
import { RESUME_STAGES } from "./data/resumeData";
import OrbitalWheel from "./components/OrbitalWheel";
import StageVisuals from "./components/StageVisuals";

export default function App() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const total = RESUME_STAGES.length;
    const index = Math.min(total - 1, Math.floor(latest * total));
    setActiveIndex(index);
  });

  const activeStage = RESUME_STAGES[activeIndex];

  const scrollToStage = (index) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollableHeight =
      containerRef.current.offsetHeight - window.innerHeight;
    const targetY =
      containerTop + (index / (RESUME_STAGES.length - 1)) * scrollableHeight;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-zinc-100 selection:bg-indigo-500/30">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-800/80 px-6 py-3.5 flex items-center justify-between">
        <div className="font-bold tracking-wider text-sm flex items-center gap-2.5 text-white">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_#6366f1] inline-block" />
          ANKUR KUMAR
        </div>
        <div className="text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
          Stage <span className="text-indigo-400">{activeStage.step}</span> / 06 — {activeStage.label}
        </div>
      </header>

      {/* Outer Tall Scroll Container (500vh) */}
      <section ref={containerRef} className="relative h-[500vh]">
        {/* Sticky Viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-14">
          
          {/* Mobile Stage Tabs */}
          <div className="flex lg:hidden gap-2 overflow-x-auto px-6 pb-4">
            {RESUME_STAGES.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => scrollToStage(idx)}
                className={`px-3 py-1 rounded-full text-xs font-mono whitespace-nowrap transition ${
                  idx === activeIndex
                    ? "bg-indigo-500 text-white shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400"
                }`}
              >
                {st.step} {st.label}
              </button>
            ))}
          </div>

          <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT COLUMN: Orbital Wheel */}
            <div className="hidden lg:flex lg:col-span-3 items-center">
              <OrbitalWheel
                stages={RESUME_STAGES}
                activeIndex={activeIndex}
                scrollYProgress={scrollYProgress}
                onSelectStage={scrollToStage}
              />
            </div>

            {/* MIDDLE COLUMN: Active Stage Content */}
            <div className="lg:col-span-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
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

            {/* RIGHT COLUMN: Interactive Visual Cards */}
            <div className="lg:col-span-5">
              <StageVisuals stage={activeStage} />
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}