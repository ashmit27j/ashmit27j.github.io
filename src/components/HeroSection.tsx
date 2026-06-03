import { motion } from "framer-motion";
import DotMatrix from "./DotMatrix";
import TypewriterText from "./TypewriterText";
import { ArrowDown } from "lucide-react";

interface HeroSectionProps {
	onNavigate: (section: string) => void;
}

const HeroSection = ({ onNavigate }: HeroSectionProps) => {
	return (
		<section
			id="hero"
			className="relative h-screen flex items-center overflow-hidden "
		>
			<DotMatrix />
			<div className="relative z-10 px-6 md:px-20 lg:px-32 w-full">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					<p className="text-sm md:text-base uppercase tracking-[0.4em] text-muted-foreground mb-6">
						Portfolio / 2026
					</p>

					<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
						Hi, I'm Ashmit Jain.
						<br />
						<span className="text-muted-foreground text-2xl md:text-4xl lg:text-5xl whitespace-nowrap">
							I'm <TypewriterText />
						</span>
					</h1>

					<p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed mb-12">
						A multidisciplinary Software Engineer passionate about problem
						solving and building impactful digital experiences through clean
						code and intuitive design.
					</p>

					<motion.button
						onClick={() => onNavigate("projects")}
						whileHover={{ y: 4 }}
						className="flex items-center gap-3 text-sm uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
					>
						<ArrowDown className="w-4 h-4" />
						Scroll to explore
					</motion.button>
				</motion.div>
			</div>
		</section>
	);
};

export default HeroSection;
