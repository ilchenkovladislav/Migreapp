import { Link, Tab, Tabs } from '@nextui-org/react';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { CiViewTable } from 'react-icons/ci';
import { IoCalendarNumberOutline } from 'react-icons/io5';
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
                variant="light"
                fullWidth
                classNames={{ cursor: 'shadow-none' }}
                className="fixed bottom-0 left-0 right-0 z-20 bg-background"
            >
                <Tab
                    as={Link}
                    key="/"
                    href="/"
                    title={<IoCalendarNumberOutline className="w-5 h-5" />}
                />
                <Tab
                    as={Link}
                    key="/table"
                    href="/table"
                    title={<CiViewTable className="w-5 h-5" />}
                />
                <Tab>
                    <div
                        className="space-y-[3px] ml-auto"
                        onClick={() => setOpen(!open)}
                    >
                        <span className="block w-5 h-0.5 bg-gray-500 rounded"></span>
                        <span className="block w-5 h-0.5 bg-gray-500 rounded"></span>
                        <span className="block w-5 h-0.5 bg-gray-500 rounded"></span>
                    </div>
                </Tab>
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
