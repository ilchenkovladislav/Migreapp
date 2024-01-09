import cn from 'classnames';

import { useAppStore } from '../../../../store/store.ts';
import { Day } from '../../../../types/types.ts';
import { getIndicatorColor } from '../../../../utils/calendarUtils.ts';
import { IndicatorList } from '../../../IndicatorList/IndicatorList.tsx';

type CalendarDayProps = {
    day: Day;
    handleSelectDay: (day: Day) => void;
};

export const CalendarDay = ({ day, handleSelectDay }: CalendarDayProps) => {
    const painRecords = useAppStore((state) => state.painRecords);
    const indicatorColors = painRecords
        .filter((record) => record.date === day.date)
        .map((record) => getIndicatorColor(record));

    return (
        <button
            key={day.date}
            type="button"
            onClick={() => handleSelectDay(day)}
            className={cn(
                'flex h-14 flex-col px-3 py-2 hover:bg-blue-400/20 focus:z-10',
                day.isCurrentMonth ? 'bg-background' : 'bg-background/50',
                { 'text-white': day.isSelected },
                { 'font-semibold': day.isSelected || day.isToday },
                { 'text-indigo-600': !day.isSelected && day.isToday },
                {
                    'text-gray-500':
                        !day.isSelected && !day.isCurrentMonth && !day.isToday,
                },
            )}
        >
            <time
                dateTime={day.date}
                className={cn(
                    'ml-auto',
                    {
                        'flex h-6 w-6 items-center justify-center rounded-full':
                            day.isSelected,
                    },
                    { 'bg-indigo-600': day.isSelected && day.isToday },
                    { 'bg-gray-900': day.isSelected && !day.isToday },
                )}
            >
                {day.dayOfMonth}
            </time>
            {painRecords.length > 0 && (
                <IndicatorList indicatorColors={indicatorColors} />
            )}
        </button>
    );
};
