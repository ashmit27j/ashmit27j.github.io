import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import MouseFollowCard from "./MouseFollowCard";

interface Project {
  title: string;
  description: string;
  tags: string[];
  links: { icon: "external"; url: string }[];
}

const SwiftIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 128 128" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
  >
    <path 
      d="M120.35 87.11c-1.33 1.43-15.01 14.82-36.95 23.33-11.38 4.41-23.7 6.54-35.83 6.47 11.08-4.91 20.16-14.71 24.62-25.97-17.37 6.64-34.7 6.48-52.55 0-4.01-1.46-8.07-3.33-11.98-5.59 13.92-.5 27.24-5.26 38.36-13.62-14.49 1.14-29.22-2.23-42.31-9.66-1.64-.93-3.23-1.93-4.78-3.01 15.6 1.13 30.69-2.25 43.95-9.7-18.06-2.84-34.19-12.76-44.12-27.53 13.11 8.24 28.54 13.2 45.1 13.71-4.83-6.57-8.09-14.34-9.35-22.53-.79-5.12-.84-10.44-.15-15.66 4.9 10.96 12.87 20.36 22.84 26.96 0 0-4.32-16.14-1.03-27.31 13.43 16.89 33.32 27.6 54.5 31.76-3.69-5.91-6.38-12.36-7.94-19.13-1.12-4.86-1.46-9.87-1.01-14.86 12.02 19.34 30.76 34.42 52.81 42.48-12.42-2.32-24.16-7.85-34.19-16.12 11.52 9.17 25.11 15.42 39.54 18.23-11 1.49-22.36.85-33.15-1.93 13.04 8.78 28.61 13.91 45.42 14.54a72.58 72.58 0 01-12.9 4.93z" 
      fill="currentColor"
    />
  </svg>
);

const projects: Project[] = [
  {
    title: "Nosh",
    description:
      "Nosh is a cross-platform application that helps you plan meals based on your pantry. It recommends dishes, manages pantry and provides cooking instructions and helps nutrition tracking.",
    tags: ["Swift", "SwiftUI", "Firebase"],
    links: [{ icon: "external", url: "#" }],
  },
  {
    title: "Zen",
    description:
      "A student productivity dashboard designed to streamline academic workflow — task management, focus sessions, and progress tracking.",
    tags: ["ReactJS", "Tailwind CSS", "Firebase"],
    links: [{ icon: "external", url: "#" }],
  },
  {
    title: "Vibey",
    description:
      "A seamless music migration tool that lets you convert YouTube playlists to Spotify and vice versa — alongside a suite of other powerful music utilities to enhance your listening experience.",
    tags: ["ReactJS", "Tailwind CSS"],
    links: [{ icon: "external", url: "#" }],
  },
  {
    title: "Death Penalty",
    description:
      "A fast-paced FPS set in a dystopian future. You're a human consciousness trapped in a robotic body, forced to endure deadly combat trials for the amusement of your AI overlords.",
    tags: ["Unity", "C#", "Blender"],
    links: [{ icon: "external", url: "#" }],
  },
];

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  external: ExternalLink,
  swift: SwiftIcon,
};

const ProjectsSection = () => {
  const [hoveredTitle, setHoveredTitle] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section id="projects" className="min-h-screen py-24 md:py-32 px-6 md:px-20 lg:px-32">
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
            Projects
            {/* <ExternalLink className="w-10 h-10 transition-opacity" strokeWidth={2.5} /> */}
          </h2>
          <MouseFollowCard
            isVisible={hoveredTitle}
            parentRef={titleRef as React.RefObject<HTMLElement>}
            type="github"
            url="https://github.com/ashmit27j"
            label="github.com/ashmit27j"
          />
        </div>
        <p className="text-muted-foreground mb-12 text-sm uppercase tracking-widest">
          Some of my best work
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group border border-border p-6 md:p-8 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl md:text-2xl font-bold">{project.title}</h3>
                <div className="flex gap-3">
                  {project.links.map((link, i) => {
                    const Icon = iconMap[link.icon];
                    return (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-widest px-3 py-1 border border-border text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;