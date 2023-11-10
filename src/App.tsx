import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher.tsx';
import { useState } from 'react';
import { Calendar } from './components/Calendar/Calendar.tsx';
import { getCurrentMonth, getCurrentYear } from './utils/calendarUtils.ts';
import { Routes, Route } from 'react-router-dom';
import { CreateForm } from './components/CreateForm/CreateForm.tsx';

function App() {
    const [yearAndMonth, setYearAndMonth] = useState<[number, number]>([
        getCurrentYear(),
        getCurrentMonth(),
    ]);
    return (
        <>
            <ThemeSwitcher />
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
                <Route path="Migreapp/form/:date" element={<CreateForm />} />
                <Route path="*" element={<div>Не нашлось</div>} />
            </Routes>
        </>
    );
}

export default App;
