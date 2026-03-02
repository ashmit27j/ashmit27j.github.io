import { useEffect, useRef } from "react";
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

  return (
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: cols }).map((_, col) => (
          <motion.circle
            key={`${row}-${col}`}
            cx={col * GAP + GAP / 2}
            cy={row * GAP + GAP / 2}
            r={DOT_SIZE}
            fill="hsl(0 0% 30%)"
            initial={{ opacity: 0.05 }}
            animate={{
              opacity: [0.05, 0.3, 0.05],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))
      )}
    </svg>
  );
};

export default DotMatrix;
