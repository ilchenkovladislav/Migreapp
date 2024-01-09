import './index.css';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';

import App from './App.tsx';

const Main = () => {
    const navigate = useNavigate();

    return (
        <NextUIProvider navigate={navigate}>
            <ThemeProvider attribute="class" defaultTheme="dark">
                <App />
            </ThemeProvider>
        </NextUIProvider>
    );
};

ReactDOM.createRoot(document.querySelector('#root')!).render(
    <React.StrictMode>
        <BrowserRouter basename="/Migreapp">
            <Main />
        </BrowserRouter>
    </React.StrictMode>,
);
