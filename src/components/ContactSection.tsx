import { motion } from "framer-motion";
import { ArrowUpRight, Mail, ChevronUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaFigma } from "react-icons/fa";
import { useRef } from "react";

const links = [
  { label: "GitHub", icon: FaGithub, url: "https://github.com/ashmit27j" },
  { label: "LinkedIn", icon: FaLinkedin, url: "https://linkedin.com/in/ashmitjain" },
  { label: "Figma", icon: FaFigma, url: "https://www.figma.com/@ashmit27j" },
  { label: "Email", icon: Mail, url: "mailto:ashmit27j@gmail.com" },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <section ref={sectionRef} id="contact" className="bg-foreground text-background relative">
        {/* Black semi-circle at top center with chevron and curved text */}

        <button
          onClick={scrollToTop}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-background rounded-b-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity overflow-visible"
          aria-label="Scroll to top"
        >
          <svg
            className="absolute -top-24 left-1/2 -translate-x-1/2"
            width="200"
            height="200"
            viewBox="0 0 200 200"
          >
            {/* Outer white semi-circle (bottom half only) */}
            <path
              d="M 10,100 A 90,90 0 0,0 190,100"
              fill="none"
              stroke="hsl(var(--background))"
              strokeWidth="0"
            />
            {/* Curved text following the bottom semi-circle arc */}
            <path
              id="curvePathOuter"
              d="M 10,100 A 90,90 0 0,0 190,100"
              fill="none"
            />
            <text fontSize="9" fontFamily="monospace" letterSpacing="4" fill="hsl(var(--background))" className="hidden sm:block">
              <textPath href="#curvePathOuter" startOffset="50%" textAnchor="middle">
              SCROLL TO TOP • SCROLL TO TOP
              </textPath>
            </text>
          </svg>
          <ChevronUp className="w-10 h-10 text-foreground mb-2" />
        </button>

        <div className="pt-24 pb-10 md:pt-32 md:pb-20 px-6 md:px-20 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Let's Talk</h2>
            <p className="opacity-60 mb-12 text-sm uppercase tracking-widest">
              Open for opportunities
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
              {links.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center justify-between border border-background/20 p-4 hover:bg-background/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <link.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{link.label}</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </div>

            <div className="mt-24 pt-8 border-t border-background/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-4">
              <p className="text-xs opacity-50 font-mono">
                © 2026 Ashmit Jain. All rights reserved.
              </p>
              <div className="hidden sm:block w-14 h-14" />
              <p className="text-xs opacity-50 font-mono">
                Built with conviction.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
