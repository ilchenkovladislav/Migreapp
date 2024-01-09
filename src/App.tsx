import { Link, Tab, Tabs } from '@nextui-org/react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation } from 'react-router-dom';

import { CreateForm } from './components/CreateForm/CreateForm.tsx';
import { Sidenav } from './components/Sidenav/Sidenav.tsx';
import { AppTable } from './components/Table/AppTable.tsx';
import { CalendarPage } from './pages/CalendarPage/CalendarPage.tsx';

function App() {
    const { pathname } = useLocation();
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="flex p-4">
                <div
                    className="space-y-1 ml-auto"
                    onClick={() => setOpen(!open)}
                >
                    <span className="block w-6 h-0.5 bg-gray-600"></span>
                    <span className="block w-6 h-0.5 bg-gray-600"></span>
                    <span className="block w-6 h-0.5 bg-gray-600"></span>
                </div>
            </header>
            <Sidenav open={open} setOpen={setOpen} />
            <Routes>
                <Route path="/" index element={<CalendarPage />} />
                <Route path="/table" element={<AppTable />} />
                <Route path="/form/:date" element={<CreateForm />} />
                <Route path="*" element={<div>Не нашлось</div>} />
            </Routes>
            <Tabs
                selectedKey={pathname}
                aria-label="Tabs"
                radius="none"
                size="lg"
                fullWidth
                className="fixed bottom-0 left-0 right-0 z-20"
            >
                <Tab as={Link} key="/" href="/" title="Календарь" />
                <Tab as={Link} key="/table" href="/table" title="Таблица" />
            </Tabs>
            <Toaster
                toastOptions={{
                    className: '!bg-background !text-foreground ',
                }}
            />
        </>
    );
}

export default App;
