import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import MouseFollowCard from "./MouseFollowCard";

interface Award {
  title: string;
  subtitle: string;
  date: string;
  link: string;
}

const awards: Award[] = [
  {
    title: "1st Runner Up — Hyphen Ideathon",
    subtitle: "UI/UX Design Hackathon",
    date: "2025",
    link: "https://linkedin.com/in/ashmitjain",
  },
  {
    title: "2nd Runner Up — Taqneeq CyberCipher '25",
    subtitle: "UI/UX Design Hackathon",
    date: "2025",
    link: "https://linkedin.com/in/ashmitjain",
  },
  {
    title: "ISC2 Certified in Cybersecurity",
    subtitle: "ISC2CC Professional Certification",
    date: "2026",
    link: "https://linkedin.com/in/ashmitjain",
  },
  {
    title: "CISCO Introduction To Cybersecurity",
    subtitle: "CISCO Professional Certification",
    date: "2025",
    link: "https://linkedin.com/in/ashmitjain",
  },
  {
    title: "CISCO Network",
    subtitle: "CISCO Professional Certification",
    date: "2025",
    link: "https://linkedin.com/in/ashmitjain",
  }
];

const AwardsSection = () => {
  const [hoveredTitle, setHoveredTitle] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const displayedAwards = expanded ? awards : awards.slice(0, 3);

  return (
    <section id="awards" className="min-h-screen py-24 md:py-32 px-6 md:px-20 lg:px-32 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative inline-block">
          <h2
            ref={titleRef}
            className="text-3xl md:text-5xl font-bold mb-4 cursor-pointer hover:text-muted-foreground transition-colors"
            onMouseEnter={() => setHoveredTitle(true)}
            onMouseLeave={() => setHoveredTitle(false)}
          >
            Awards & Certifications
          </h2>
          <MouseFollowCard
            isVisible={hoveredTitle}
            parentRef={titleRef as React.RefObject<HTMLElement>}
            type="linkedin"
            url="https://linkedin.com/in/ashmitjain"
          />
        </div>
        <p className="text-muted-foreground mb-12 text-sm uppercase tracking-widest">
          Recognitions & achievements
        </p>

        <div className="space-y-0">
          <AnimatePresence>
            {displayedAwards.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.1 }}
                className="group block border-t border-border py-6 md:py-8 cursor-pointer"
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
              </motion.a>
            ))}
          </AnimatePresence>
          <div className="border-t border-border" />
        </div>

        {awards.length > 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm uppercase tracking-widest"
            >
              {expanded ? "View Less" : "View More"}
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default AwardsSection;
