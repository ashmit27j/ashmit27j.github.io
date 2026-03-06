import { useRef, useMemo } from "react";
import { motion } from "framer-motion";

const DOT_SIZE = 2;
const GAP = 16;

const DotMatrix = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <DotGrid />
    </div>
  );
};

const DotGrid = () => {
  const cols = 100;
  const rows = 50;

  const dots = useMemo(
    () =>
      Array.from({ length: rows }).flatMap((_, row) =>
        Array.from({ length: cols }).map((_, col) => ({
          id: `${row}-${col}`,
          cx: col * GAP + GAP / 2,
          cy: row * GAP + GAP / 2,
          delay: Math.random() * 5,
          duration: 3 + Math.random() * 4,
        }))
      ),
    [rows, cols]
  );

  return (
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {dots.map(({ id, cx, cy, delay, duration }) => (
        <motion.circle
          key={id}
          cx={cx}
          cy={cy}
          r={DOT_SIZE}
          fill="hsl(0 0% 45%)"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{
            duration,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  );
};

export default DotMatrix;
