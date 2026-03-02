import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import MouseFollowCard from "./MouseFollowCard";


interface ExperienceItem {
  title: string;
  subtitle: string;
  date: string;
  detail: string;
  link: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Synoris",
    subtitle: "Web Development and UI/UX",
    date: "2024 — 2025",
    detail: "Focused on full-stack solutions and software architecture, building scalable applications.",
    link: "https://linkedin.com/in/ashmitjain",
  },
  {
    title: "Digitas",
    subtitle: "iOS Development",
    date: "2025 (Summer Internship)",
    detail: "Bridging the gap between creative UI/UX design and technical implementation.",
    link: "https://linkedin.com/in/ashmitjain",
  },
];

const ExperienceSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredTitle, setHoveredTitle] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  return (
    <section id="experience" className="min-h-screen py-24 md:py-32 px-6 md:px-20 lg:px-32 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative inline-block">
            <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold mb-4 cursor-pointer hover:text-muted-foreground transition-colors flex items-center gap-2"
            onMouseEnter={() => setHoveredTitle(true)}
            onMouseLeave={() => setHoveredTitle(false)}
            >
            Experience
            {/* <ExternalLink className="w-10 h-10 transition-opacity" strokeWidth={2.5} /> */}
            </h2>
          <MouseFollowCard
            isVisible={hoveredTitle}
            parentRef={titleRef as React.RefObject<HTMLElement>}
            type="linkedin"
            url="https://linkedin.com/in/ashmitjain"
          />
        </div>
        <p className="text-muted-foreground mb-12 text-sm uppercase tracking-widest">
          Where I've worked
        </p>

        <div className="space-y-0">
          {experiences.map((item, index) => (
            <motion.a
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative block border-t border-border py-6 md:py-8 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg md:text-2xl font-bold group-hover:text-muted-foreground transition-colors underline decoration-border underline-offset-4 group-hover:decoration-muted-foreground">
                      {item.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{item.subtitle}</p>
                </div>

                <span className="text-xs font-mono text-muted-foreground tracking-wider">
                  {item.date}
                </span>
              </div>

              <AnimatePresence>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full z-20 w-72 p-4 hover-card-brutalist"
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.a>
          ))}
          <div className="border-t border-border" />
        </div>

        <div className="flex justify-center mt-16">
          <motion.a
            href="https://docs.google.com/document/d/1BVbXy18fN-2X_n0Q2eDjIRcnL6_grv9jW6Z4trapmTs/edit?tab=t.0"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest"
          >
            Open to Hire
            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default ExperienceSection;
