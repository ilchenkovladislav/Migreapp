import { getMonthName } from '../../../../utils/calendarUtils.ts';
import { DisplayedDate } from '../../hooks/useCalendar.ts';

type CalendarDateProps = {
    displayedDate: DisplayedDate;
};

export const CalendarDate = ({ displayedDate }: CalendarDateProps) => {
    const { month, year } = displayedDate;

    return (
        <h1 className="text-base font-semibold leading-6">
            <time dateTime={`${year}-${month}`}>
                {getMonthName(month)} {year}
            </time>
        </h1>
    );
};
