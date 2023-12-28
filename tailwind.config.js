import { nextui } from '@nextui-org/react';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{ts,tsx}',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    purge: {
        content: [
            './index.html',
            './src/**/*.{ts,tsx}',
            './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
        ],
        options: {
            safelist: [
                'bg-green-600',
                'bg-red-600',
                'bg-yellow-600',
                'bg-purple-600',
                'bg-blue-600',
                'bg-gray-600',
            ],
        },
    },
    theme: {
        extend: {},
    },
    darkMode: 'class',
    plugins: [nextui({ themes: { dark: { colors: { background: '#111' } } } })],
};
