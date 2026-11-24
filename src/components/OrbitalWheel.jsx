import { motion, useSpring, useTransform } from "framer-motion";

const RADIUS = 155;
const ANGLE_STEP = 32;

export default function OrbitalWheel({
  stages,
  activeIndex,
  scrollYProgress,
  onSelectStage,
}) {
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  });

  const maxRotation = (stages.length - 1) * ANGLE_STEP;
  const wheelRotation = useTransform(smoothProgress, [0, 1], [0, -maxRotation]);
  const counterRotation = useTransform(wheelRotation, (r) => -r);

  const circumference = 2 * Math.PI * RADIUS;
  const arcOffset = useTransform(
    smoothProgress,
    [0, 1],
    [circumference, circumference * 0.55]
  );

  return (
    <div className="relative h-[420px] w-full flex items-center justify-start overflow-visible select-none">
      {/* Center Neon Pointer Line */}
      <div className="absolute left-[135px] top-1/2 -translate-y-1/2 flex items-center gap-1 z-20 pointer-events-none">
        <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-indigo-500" />
        <span className="w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_12px_#6366f1]" />
      </div>

      {/* Wheel Container */}
      <div className="relative -ml-36 w-[360px] h-[360px] flex items-center justify-center">
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          viewBox="0 0 360 360"
        >
          <defs>
            <linearGradient id="neonArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#14B8A6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Inner Dashed Ring */}
          <circle
            cx="180"
            cy="180"
            r={RADIUS - 36}
            fill="none"
            stroke="#27272a"
            strokeWidth="1"
            strokeDasharray="4 6"
          />

          {/* Main Orbit Track */}
          <circle
            cx="180"
            cy="180"
            r={RADIUS}
            fill="none"
            stroke="#3f3f46"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />

          {/* Outer Subtle Ring */}
          <circle
            cx="180"
            cy="180"
            r={RADIUS + 26}
            fill="none"
            stroke="#18181b"
            strokeWidth="1"
          />

          {/* Glowing Scroll Progress Arc */}
          <motion.circle
            cx="180"
            cy="180"
            r={RADIUS}
            fill="none"
            stroke="url(#neonArcGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#glow)"
            strokeDasharray={circumference}
            style={{ strokeDashoffset: arcOffset }}
            transform="rotate(-90 180 180)"
          />
        </svg>

        {/* Rotating Nodes Wrapper */}
        <motion.div
          style={{ rotate: wheelRotation }}
          className="relative w-full h-full"
        >
          {stages.map((stage, idx) => {
            const angleDeg = idx * ANGLE_STEP;
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = Math.cos(angleRad) * RADIUS;
            const y = Math.sin(angleRad) * RADIUS;
            const isActive = idx === activeIndex;

            return (
              <div
                key={stage.id}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <motion.button
                  style={{ rotate: counterRotation }}
                  onClick={() => onSelectStage(idx)}
                  className="group flex items-center gap-3 cursor-pointer focus:outline-none"
                >
                  {/* Node Dot */}
                  <span
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? "bg-indigo-500 border-indigo-300 scale-125 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                        : "bg-zinc-900 border-zinc-700 group-hover:border-indigo-400"
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </span>

                  {/* Stage Number & Label */}
                  <div
                    className={`text-left whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "opacity-100 translate-x-1"
                        : "opacity-40 group-hover:opacity-80"
                    }`}
                  >
                    <span className="text-[10px] font-mono block leading-none text-indigo-400 font-semibold">
                      {stage.step}
                    </span>
                    <span
                      className={`text-sm font-semibold ${
                        isActive ? "text-white" : "text-zinc-400"
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                </motion.button>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}