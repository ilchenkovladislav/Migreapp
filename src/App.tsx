import { ThemeSwitcher } from './components/ThemeSwitcher/ThemeSwitcher.tsx';
import { useState } from 'react';
import { Calendar } from './components/Calendar/Calendar.tsx';
import { getCurrentMonth, getCurrentYear } from './utils/calendarUtils.ts';

function App() {
    const [yearAndMonth, setYearAndMonth] = useState<[number, number]>([
        getCurrentYear(),
        getCurrentMonth(),
    ]);
    return (
        <>
            <ThemeSwitcher />
            <Calendar
                yearAndMonth={yearAndMonth}
                onYearAndMonthChange={setYearAndMonth}
            />
        </>
    );
}

export default App;
