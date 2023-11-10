import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <NextUIProvider>
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <App />
                </ThemeProvider>
            </NextUIProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
