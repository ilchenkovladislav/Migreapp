import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher.tsx';
import { useState } from 'react';
import { Calendar } from './components/Calendar/Calendar.tsx';
import { getCurrentMonth, getCurrentYear } from './utils/calendarUtils.ts';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CreateForm } from './components/CreateForm/CreateForm.tsx';
import { FileUploader } from './components/FileUploader/FileUploader.tsx';
import AppTable from './components/Table/AppTable.tsx';
import { Tab, Tabs } from '@nextui-org/react';
import { Toaster } from 'react-hot-toast';

function App() {
    const [yearAndMonth, setYearAndMonth] = useState<[number, number]>([
        getCurrentYear(),
        getCurrentMonth(),
    ]);

    const { pathname } = useLocation();

    return (
        <>
            <header className="flex justify-between p-4">
                <FileUploader />
                <ThemeSwitcher />
            </header>
            <Routes>
                <Route
                    path="Migreapp/"
                    index
                    element={
                        <Calendar
                            yearAndMonth={yearAndMonth}
                            onYearAndMonthChange={setYearAndMonth}
                        />
                    }
                />
                <Route path="Migreapp/table" element={<AppTable />} />
                <Route path="Migreapp/form/:date" element={<CreateForm />} />
                <Route path="*" element={<div>Не нашлось</div>} />
            </Routes>
            <Tabs
                selectedKey={pathname}
                aria-label="Tabs"
                radius="none"
                size="lg"
                fullWidth
                className="fixed bottom-0 left-0 right-0 z-10"
            >
                <Tab
                    id="/Migreapp/"
                    key="/Migreapp/"
                    href="/Migreapp/"
                    title="Календарь"
                />
                <Tab
                    id="/Migreapp/table"
                    key="/Migreapp/table"
                    href="/Migreapp/table"
                    title="Таблица"
                />
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
