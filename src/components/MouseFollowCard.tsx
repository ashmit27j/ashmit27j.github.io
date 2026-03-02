import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

interface MouseFollowCardProps {
  isVisible: boolean;
  parentRef: React.RefObject<HTMLElement>;
  type: "github" | "linkedin";
  url: string;
  label?: string;
}

const MouseFollowCard = ({ isVisible, parentRef, type, url, label }: MouseFollowCardProps) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!parentRef.current) return;
    const rect = parentRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left + 16, y: e.clientY - rect.top - 20 });
  }, [parentRef]);

  useEffect(() => {
    const el = parentRef.current;
    if (!el || !isVisible) return;
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [isVisible, handleMouseMove, parentRef]);

  const Icon = type === "github" ? Github : Linkedin;
  const displayLabel = label || (type === "github" ? "github.com/ashmit27j" : "linkedin.com/in/ashmitjain");

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15 }}
          className="absolute z-50 pointer-events-auto flex items-center gap-2 px-3 py-2 bg-secondary border border-border text-muted-foreground text-xs font-mono"
          style={{ left: pos.x, top: pos.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <Icon className="w-3.5 h-3.5" />
          <span>{displayLabel}</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default MouseFollowCard;
