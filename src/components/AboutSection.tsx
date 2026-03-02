import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import MouseFollowCard from "./MouseFollowCard";

interface Skill {
  name: string;
  logo: string;
  color: string;
}

const skills: Skill[] = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "hsl(197 71% 73%)" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "hsl(211 60% 60%)" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", color: "hsl(53 95% 55%)" },
  { name: "Tailwind CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", color: "hsl(189 70% 65%)" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", color: "hsl(340 60% 65%)" },
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "hsl(120 40% 55%)" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "hsl(210 50% 60%)" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", color: "hsl(211 55% 55%)" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg", color: "hsl(211 55% 65%)" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "hsl(15 75% 55%)" },
  { name: "Go", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg", color: "hsl(193 80% 60%)" },
  { name: "Bash", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg", color: "hsl(120 30% 60%)" },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg", color: "hsl(45 60% 60%)" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "hsl(210 60% 60%)" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", color: "hsl(12 70% 55%)" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", color: "hsl(35 70% 55%)" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", color: "hsl(120 45% 50%)" },
  { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg", color: "hsl(38 95% 55%)" },
  { name: "Supabase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg", color: "hsl(153 60% 50%)" },
  { name: "Nmap", logo: "https://nmap.org/images/sitelogo.png", color: "hsl(210 40% 65%)" },
];

const AboutSection = () => {
  const [hoveredTitle, setHoveredTitle] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);

  return (
    <section id="about-me" className="min-h-screen py-24 md:py-32 px-6 md:px-20 lg:px-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <div className="relative inline-block">
          <h2
            ref={titleRef}
            className="flex items-center gap-3 text-3xl md:text-5xl font-bold mb-4 cursor-pointer hover:text-muted-foreground transition-colors"
            onMouseEnter={() => setHoveredTitle(true)}
            onMouseLeave={() => setHoveredTitle(false)}
          >
            About Me
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
        <p className="text-muted-foreground mb-6 text-sm uppercase tracking-widest">
          The person behind the work
        </p>

        <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            I'm Ashmit Jain — a multidisciplinary engineer who thrives at the intersection of
            design, development, and cybersecurity. I believe great products are born when
            aesthetics meet functionality.
          </p>
          <p>
            When I'm not writing code or pushing pixels, you'll find me diving into research
            papers, exploring the latest tech, or competing in hackathons.
          </p>
          <p>
            I'm driven by curiosity, fueled by caffeine, and committed to building
            things that make a difference.
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider px-4 py-2 border border-border hover:border-foreground transition-colors cursor-default"
                style={{ color: skill.color }}
              >
                <img src={skill.logo} alt={skill.name} className="w-4 h-4" />
                {skill.name}
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
