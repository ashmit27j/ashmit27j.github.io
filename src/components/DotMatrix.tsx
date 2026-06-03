import { useRef, useState, useLayoutEffect, useMemo } from "react";
import { motion } from "framer-motion";

const BASE_GAP = 24; // spacing between dot centers
const BASE_RADIUS = 3; // dot radius in px (larger as requested)
const MAX_DOTS = 6000; // safety cap to avoid extremely large SVGs

const DotMatrix = () => {
	const hostRef = useRef<HTMLDivElement | null>(null);
	const [size, setSize] = useState({ width: 0, height: 0 });

	useLayoutEffect(() => {
		const el = hostRef.current;
		if (!el) return;

		const update = () => {
			const rect = el.getBoundingClientRect();
			setSize({
				width: Math.max(0, Math.round(rect.width)),
				height: Math.max(0, Math.round(rect.height)),
			});
		};

		update();

		const ro = new ResizeObserver(update);
		ro.observe(el);
		return () => ro.disconnect();
	}, []);

	const { cols, rows, gap } = useMemo(() => {
		if (!size.width || !size.height) return { cols: 0, rows: 0, gap: BASE_GAP };

		let gap = BASE_GAP;
		let cols = Math.ceil(size.width / gap);
		let rows = Math.ceil(size.height / gap);

		// gently increase gap if there would be too many dots
		while (cols * rows > MAX_DOTS) {
			gap += 4;
			cols = Math.ceil(size.width / gap);
			rows = Math.ceil(size.height / gap);
		}

		return { cols, rows, gap };
	}, [size]);

	const dots = useMemo(() => {
		if (!cols || !rows) return [];
		const list: {
			id: string;
			cx: number;
			cy: number;
			delay: number;
			duration: number;
		}[] = [];
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				const cx = c * gap + gap / 2;
				const cy = r * gap + gap / 2;
				const delay = Math.random() * 3; // subtle stagger
				const duration = 2.5 + Math.random() * 3; // gentle pulsing
				list.push({ id: `${r}-${c}`, cx, cy, delay, duration });
			}
		}
		return list;
	}, [cols, rows, gap]);

	return (
		<div ref={hostRef} className="absolute inset-0 pointer-events-none">
			{size.width > 0 && size.height > 0 && (
				<svg
					className="w-full h-full"
					xmlns="http://www.w3.org/2000/svg"
					viewBox={`0 0 ${size.width} ${size.height}`}
					preserveAspectRatio="none"
				>
					{dots.map(({ id, cx, cy, delay, duration }) => (
						<motion.circle
							key={id}
							cx={cx}
							cy={cy}
							r={BASE_RADIUS}
							fill={`hsl(var(--dot-color))`}
							initial={{ opacity: 0.12 }}
							animate={{ opacity: [0.06, 0.22, 0.06] }}
							transition={{
								duration,
								repeat: Infinity,
								delay,
								ease: "easeInOut",
							}}
						/>
					))}
				</svg>
			)}
		</div>
	);
};

export default DotMatrix;
