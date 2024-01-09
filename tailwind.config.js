import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{ts,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    safelist: [
        {
            pattern: /bg-(red|green|yellow|purple|blue|grary)-(600)/,
        },
    ],
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [nextui({ themes: { dark: { colors: { background: '#111' } } } })],
};
