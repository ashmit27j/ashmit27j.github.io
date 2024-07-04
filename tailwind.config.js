/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["*.{html,js}"],
	theme: {
		extend: {
			backgroundImage: {
				"grey-white-transparent":
					"linear-gradient(to right, rgba(255, 255, 253, 0.4), rgba(255, 255, 253, 0.3), rgba(255, 255, 255, 0.1))",
			},
			screens: {
				// rs: "300px",
				xs: "500px",

				sm: "640px",
				// => @media (min-width: 640px) { ... }

				md: "768px",
				// => @media (min-width: 768px) { ... }

				lg: "1024px",
				// => @media (min-width: 1024px) { ... }

				xl: "1280px",
				// => @media (min-width: 1280px) { ... }

				"2xl": "1536px",
				// => @media (min-width: 1536px) { ... }},
			},
			colors: {
				primaryBg: "#D9DCDF",
				secondaryBg: "#FFF",
				black: "#000",
				white: "#FFF",
				red: "#F00",
			},
			fontFamily: {
				heading: ["HelveticaCompressed", "Times New Roman"],
				body: ["Quicksand", "arial", "sans-serif"],
			},
			fontSize: {
				sm: ["16px"],
				base: ["16px", "24px"],
				lg: ["18px", "28px"],
				xl: ["20px", "30px"],
				"2xl": ["24px", "32px"],
				"3xl": ["30px", "36px"],
				"4xl": ["36px", "42px"],
				"5xl": ["48px", "56px"],
				"6xl": ["64px", "72px"],
			},
		},
	},
	plugins: [],
};
