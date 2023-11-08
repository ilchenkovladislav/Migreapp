import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <NextUIProvider>
            <ThemeProvider attribute="class" defaultTheme="dark">
                <App />
            </ThemeProvider>
        </NextUIProvider>
    </React.StrictMode>,
);