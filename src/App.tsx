import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher.tsx';
import { useState } from 'react';
import { Calendar } from './components/Calendar/Calendar.tsx';
import { getCurrentMonth, getCurrentYear } from './utils/calendarUtils.ts';
import { Routes, Route } from 'react-router-dom';
import { CreateForm } from './components/CreateForm/CreateForm.tsx';
import { FileUploader } from './components/FileUploader/FileUploader.tsx';
import AppTable from './components/Table/AppTable.tsx';

function App() {
    const [yearAndMonth, setYearAndMonth] = useState<[number, number]>([
        getCurrentYear(),
        getCurrentMonth(),
    ]);
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
        </>
    );
}

export default App;
