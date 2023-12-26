import { useState } from 'react';
import { CalendarDay } from '../../types/types.ts';
import { Calendar } from '../../components/Calendar/Calendar.tsx';
import { CalendarPopup } from '../../components/CalendarPopup/CalendarPopup.tsx';

export const CalendarPage = () => {
    const [selectedDay, setSelectedDay] = useState<CalendarDay>();

    const handleSelectDay = (day: CalendarDay) => {
        setSelectedDay(day);
    };

    return (
        <>
            <Calendar handleSelectDay={handleSelectDay} />
            {!!selectedDay && <CalendarPopup selectedDay={selectedDay} />}
        </>
    );
};
