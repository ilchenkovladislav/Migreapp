import { useState } from 'react';

import { Calendar } from '../../components/Calendar/Calendar.tsx';
import { CalendarPopup } from '../../components/CalendarPopup/CalendarPopup.tsx';
import { Day } from '../../types/types.ts';

export const CalendarPage = () => {
    const [selectedDay, setSelectedDay] = useState<Day>();

    const handleSelectDay = (day: Day) => {
        setSelectedDay(day);
    };

    return (
        <>
            <Calendar handleSelectDay={handleSelectDay} />
            {!!selectedDay && <CalendarPopup selectedDay={selectedDay} />}
        </>
    );
};
