import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from 'next-themes';
import { NextUIProvider } from '@nextui-org/react';
import './index.css';
import { BrowserRouter, useNavigate } from 'react-router-dom';

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

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter basename="/Migreapp">
            <Main />
        </BrowserRouter>
    </React.StrictMode>,
);
