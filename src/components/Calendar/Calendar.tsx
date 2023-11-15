import {
    createCurrentMonthDays,
    daysOfWeekFull,
    daysOfWeekShort,
    getMonthName,
} from '../../utils/calendarUtils.ts';
import cn from 'classnames';

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { DatePains } from './DatePains/DatePains.tsx';
import { Button, ButtonGroup } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { useIndexedDB } from '../../hooks/useIndexedDB.ts';
import { CalendarDay, PainRecord } from '../../types/types.ts';
import { useAppStore } from '../../store/store.ts';

interface CalendarProps {
    yearAndMonth: [number, number];
    onYearAndMonthChange: (yearAndMonth: [number, number]) => void;
}

export const Calendar = ({
    yearAndMonth = [2021, 6],
    onYearAndMonthChange,
}: CalendarProps) => {
    const [year, month] = yearAndMonth;
    const { getAllRecords } = useIndexedDB();

    const [calendarDays, setCalendarDays] = useState(
        createCurrentMonthDays(year, month),
    );

    const [selectedDay, setSelectedDay] = useState<CalendarDay | null>(null);
    const { painRecords, setPainRecords } = useAppStore();

    useEffect(() => {
        try {
            setCalendarDays(createCurrentMonthDays(year, month));
            getAllRecords().then(setPainRecords);
        } catch (e) {
            console.error(e);
        }
    }, [year, month]);

    const handleMonthNavBackButtonClick = () => {
        let nextYear = year;
        let nextMonth = month - 1;
        if (nextMonth === 0) {
            nextMonth = 12;
            nextYear = year - 1;
        }
        onYearAndMonthChange([nextYear, nextMonth]);
    };

    const handleMonthNavForwardButtonClick = () => {
        let nextYear = year;
        let nextMonth = month + 1;
        if (nextMonth === 13) {
            nextMonth = 1;
            nextYear = year + 1;
        }
        onYearAndMonthChange([nextYear, nextMonth]);
    };

    const handleClick = (day: CalendarDay) => {
        setSelectedDay(day);
    };

    const handleDeleteRecord = (record: PainRecord) => {
        setPainRecords(painRecords.filter((rec) => rec.id !== record.id));
    };

    return (
        <div className="lg:flex lg:h-full lg:flex-col">
            <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-900 px-6 py-4 lg:flex-none">
                <h1 className="text-base font-semibold leading-6">
                    <time dateTime="2022-01">
                        {getMonthName(month)} {year}
                    </time>
                </h1>
                <ButtonGroup>
                    <Button
                        type="button"
                        onClick={handleMonthNavBackButtonClick}
                        radius="sm"
                        variant="bordered"
                    >
                        <span className="sr-only">Предыдущий месяц</span>
                        <HiChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </Button>
                    <Button
                        type="button"
                        onClick={handleMonthNavForwardButtonClick}
                        radius="sm"
                        variant="bordered"
                    >
                        <span className="sr-only">Следующий месяц</span>
                        <HiChevronRight
                            className="h-5 w-5"
                            aria-hidden="true"
                        />
                    </Button>
                </ButtonGroup>
            </header>
            <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
                <div className="grid grid-cols-7 gap-px border-b border-gray-200 dark:border-gray-900 bg-gray-200 dark:bg-gray-900 text-center text-xs font-semibold leading-6 text-foreground lg:flex-none">
                    {daysOfWeekFull.map((day) => (
                        <div
                            className="bg-background py-2 max-md:hidden"
                            key={day}
                        >
                            {day}
                        </div>
                    ))}
                    {daysOfWeekShort.map((day) => (
                        <div className="bg-background py-2 md:hidden" key={day}>
                            {day}
                        </div>
                    ))}
                </div>
                <div className="flex bg-gray-200 dark:bg-gray-900 text-xs leading-6 text-gray-700 dark:text-gray-100 lg:flex-auto">
                    <div className="isolate grid w-full grid-cols-7 gap-px ">
                        {calendarDays.map((day) => (
                            <button
                                key={day.date}
                                type="button"
                                onClick={() => handleClick(day)}
                                className={cn(
                                    day.isCurrentMonth
                                        ? 'bg-background'
                                        : 'bg-background/50',

                                    (day.isSelected || day.isToday) &&
                                        'font-semibold',

                                    day.isSelected && 'text-white',

                                    !day.isSelected &&
                                        day.isToday &&
                                        'text-indigo-600',

                                    !day.isSelected &&
                                        !day.isCurrentMonth &&
                                        !day.isToday &&
                                        'text-gray-500',

                                    'flex h-14 flex-col px-3 py-2 hover:bg-blue-400/20 focus:z-10',
                                )}
                            >
                                <time
                                    dateTime={day.date}
                                    className={cn(
                                        day.isSelected &&
                                            'flex h-6 w-6 items-center justify-center rounded-full',
                                        day.isSelected &&
                                            day.isToday &&
                                            'bg-indigo-600',
                                        day.isSelected &&
                                            !day.isToday &&
                                            'bg-gray-900',
                                        'ml-auto',
                                    )}
                                >
                                    {day.dayOfMonth}
                                </time>
                                {painRecords.length > 0 && (
                                    <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                                        {painRecords.map((record) => {
                                            if (record.date === day.date) {
                                                return (
                                                    <span
                                                        key={record.id}
                                                        className={cn(
                                                            'mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400',
                                                            {
                                                                'bg-red-600':
                                                                    record.headache ===
                                                                    'Да',
                                                                'bg-green-600':
                                                                    record.headache ===
                                                                    'Нет',
                                                            },
                                                        )}
                                                    />
                                                );
                                            }
                                        })}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <DatePains
                selectedDay={selectedDay || null}
                handleDeleteRecord={handleDeleteRecord}
                painRecords={painRecords.filter(
                    (record) => record.date === selectedDay?.date,
                )}
            />
        </div>
    );
};
