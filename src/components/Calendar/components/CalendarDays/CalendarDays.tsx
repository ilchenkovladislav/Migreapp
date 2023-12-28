import { Day } from '../../../../types/types.ts';
import { CalendarDay } from '../CalendarDay/CalendarDay.tsx';

type CalendarDaysProps = {
    calendarDays: Day[];
    handleSelectDay: (day: Day) => void;
};

export const CalendarDays = (props: CalendarDaysProps) => {
    const { calendarDays, handleSelectDay } = props;

    return (
        <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
            <div className="flex bg-gray-200 dark:bg-gray-900 text-xs leading-6 text-gray-700 dark:text-gray-100 lg:flex-auto">
                <div className="isolate grid w-full grid-cols-7 gap-px ">
                    {calendarDays.map((day) => (
                        <CalendarDay
                            day={day}
                            handleSelectDay={handleSelectDay}
                            key={day.date}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
