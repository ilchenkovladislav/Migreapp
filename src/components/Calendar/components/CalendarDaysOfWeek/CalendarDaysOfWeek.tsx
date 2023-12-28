import {
    daysOfWeekFull,
    daysOfWeekShort,
} from '../../../../utils/calendarUtils.ts';

export const CalendarDaysOfWeek = () => {
    return (
        <div className="grid grid-cols-7 gap-px border-b border-gray-200 dark:border-gray-900 bg-gray-200 dark:bg-gray-900 text-center text-xs font-semibold leading-6 text-foreground lg:flex-none">
            {daysOfWeekFull.map((day) => (
                <div className="bg-background py-2 max-md:hidden" key={day}>
                    {day}
                </div>
            ))}
            {daysOfWeekShort.map((day) => (
                <div className="bg-background py-2 md:hidden" key={day}>
                    {day}
                </div>
            ))}
        </div>
    );
};
