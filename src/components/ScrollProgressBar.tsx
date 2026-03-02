import { useState, useEffect } from "react";

const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf: number;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const target = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress((prev) => prev + (target - prev) * 0.15);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed top-[57px] left-0 md:left-[54px] bottom-0 z-40 w-[3px]">
      <div
      className="w-full bg-foreground"
      style={{
        height: `${progress * 100}%`,
        boxShadow: progress > 0
        ? `4px 0 12px hsl(var(--foreground) / 0.5), 8px 0 24px hsl(var(--foreground) / 0.2)`
        : "none",
      }}
      />
    </div>
  );
};

export default ScrollProgressBar;