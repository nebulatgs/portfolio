/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				cascadia: ['CaskaydiaCove Nerd Font Mono', 'monospace']
			},
			colors: {
				ocean: {
					900: '#1F232C',
					800: '#2B303B',
					700: '#343D46',
					600: '#4F5B66',
					500: '#65737E',
					400: '#A7ADBA',
					300: '#C0C5CE',
					200: '#DFE1E8',
					100: '#EFF1F5',
					red: '#BF616A',
					green: '#A3BE8C',
					yellow: '#EBCB8B',
					blue: '#8FA1B3',
					magenta: '#B48EAD',
					cyan: '#96B5B4',
					rust: '#AB7967'
				}
			}
		}
	},
	plugins: []
};
