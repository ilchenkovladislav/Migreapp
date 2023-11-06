import { useState } from 'react';
import { Calendar } from './components/Calendar/Calendar.tsx';

function App() {
    const [yearAndMonth, setYearAndMonth] = useState<[number, number]>([
        2021, 9,
    ]);

    return (
        <>
            <Calendar
                yearAndMonth={yearAndMonth}
                onYearAndMonthChange={setYearAndMonth}
            />
        </>
    );
}

export default App;
