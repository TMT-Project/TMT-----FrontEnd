/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {},
		colors: {
			primary: "#0286ff",
			secondary: {
				100: "#E2E2D5",
				200: "#888883",
			},
		},
	},
	plugins: [],
};
