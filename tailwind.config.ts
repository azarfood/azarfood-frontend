import type { Config } from 'tailwindcss';
import type { PluginCreator } from 'tailwindcss/types/config';

const gridLayout: PluginCreator = ({ addComponents }) => {
	addComponents({
		'.wrapper': {
			display: 'grid',
			'grid-template-columns': '1fr min(120ch, 100%) 1fr',
		},
		'.wrapper > *': {
			'grid-column': '2',
		},
		'.full-bleed': {
			width: '100%',
			'grid-column': '1 / 4',
		},
	});
};

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [gridLayout],
};
export default config;
