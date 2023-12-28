import { Day } from '../../types/types.ts';
import { CalendarDays } from './components/CalendarDays/CalendarDays.tsx';
import { CalendarDaysOfWeek } from './components/CalendarDaysOfWeek/CalendarDaysOfWeek.tsx';
import { CalendarHeader } from './components/CalendarHeader/CalendarHeader.tsx';
import { useCalendar } from './hooks/useCalendar.ts';

type CalendarProps = {
    handleSelectDay: (day: Day) => void;
};

export const Calendar = ({ handleSelectDay }: CalendarProps) => {
    const { displayedDate, calendarDays, updateDisplayedDate } = useCalendar();

    return (
        <div>
            <CalendarHeader
                updateDisplayedDate={updateDisplayedDate}
                displayedDate={displayedDate}
            />
            <CalendarDaysOfWeek />
            <CalendarDays
                calendarDays={calendarDays}
                handleSelectDay={handleSelectDay}
            />
        </div>
    );
};
