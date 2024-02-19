import {
    daysOfWeekFull,
    daysOfWeekShort,
} from '../../../../utils/calendarUtils.ts';

export const CalendarDaysOfWeek = () => {
    return (
        <div className="grid grid-cols-7 border-b border-gray-50 dark:border-gray-900 text-center text-xs leading-6 text-foreground lg:flex-none">
            {daysOfWeekFull.map((day) => (
                <div
                    className="bg-background py-2 text-gray-500 max-md:hidden"
                    key={day}
                >
                    {day}
                </div>
            ))}
            {daysOfWeekShort.map((day) => (
                <div
                    className="bg-background py-2 text-gray-500 md:hidden"
                    key={day}
                >
                    {day}
                </div>
            ))}
        </div>
    );
};
