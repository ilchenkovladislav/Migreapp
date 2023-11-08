import {
    createDaysForCurrentMonth,
    createDaysForNextMonth,
    createDaysForPreviousMonth,
    daysOfWeekFull,
    daysOfWeekShort,
    getMonthName,
} from '../../utils/calendarUtils.ts';
import classNames from 'classnames';

import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { DatePains } from './DatePains/DatePains.tsx';
import { Button, ButtonGroup } from '@nextui-org/react';

interface CalendarProps {
    yearAndMonth: [number, number];
    onYearAndMonthChange: (yearAndMonth: [number, number]) => void;
}

export const Calendar = ({
    yearAndMonth = [2021, 6],
    onYearAndMonthChange,
}: CalendarProps) => {
    const [year, month] = yearAndMonth;

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

    const currentMonthDays = createDaysForCurrentMonth(year, month);
    const previousMonthDays = createDaysForPreviousMonth(
        year,
        month,
        currentMonthDays,
    );
    const nextMonthDays = createDaysForNextMonth(year, month, currentMonthDays);
    const calendarGridDayObjects = [
        ...previousMonthDays,
        ...currentMonthDays,
        ...nextMonthDays,
    ];

    calendarGridDayObjects[10].isSelected = true;
    calendarGridDayObjects[10].painRecords.push({
        id: 4,
        name: 'Maple syrup museum',
        time: '3PM',
        datetime: '2022-01-22T15:00',
        href: '#',
    });
    const selectedDay = calendarGridDayObjects.find((day) => day.isSelected);

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
                    >
                        <span className="sr-only">Предыдущий месяц</span>
                        <HiChevronLeft className="h-5 w-5" aria-hidden="true" />
                    </Button>
                    <Button
                        type="button"
                        onClick={handleMonthNavForwardButtonClick}
                        radius="sm"
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
                    <div className="hidden w-full lg:grid lg:grid-cols-7 lg:gap-px">
                        {calendarGridDayObjects.map((day) => (
                            <div
                                key={day.date}
                                className={classNames(
                                    {
                                        'bg-white': day.isCurrentMonth,
                                        'bg-gray-50 text-gray-500':
                                            !day.isCurrentMonth,
                                    },
                                    'relative px-3 py-2',
                                )}
                            >
                                <time
                                    dateTime={day.date}
                                    className={classNames({
                                        'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white':
                                            day.isToday,
                                    })}
                                >
                                    {day.dayOfMonth}
                                </time>
                                {day.painRecords.length > 0 && (
                                    <ol className="mt-2">
                                        {day.painRecords
                                            .slice(0, 2)
                                            .map((event) => (
                                                <li key={event.id}>
                                                    <a
                                                        href={event.href}
                                                        className="group flex"
                                                    >
                                                        <p className="flex-auto truncate font-medium text-gray-900 group-hover:text-indigo-600">
                                                            {event.name}
                                                        </p>
                                                        <time
                                                            dateTime={
                                                                event.datetime
                                                            }
                                                            className="ml-3 hidden flex-none text-gray-500 group-hover:text-indigo-600 xl:block"
                                                        >
                                                            {event.time}
                                                        </time>
                                                    </a>
                                                </li>
                                            ))}
                                        {day.painRecords.length > 2 && (
                                            <li className="text-gray-500">
                                                + {day.painRecords.length - 2}{' '}
                                                more
                                            </li>
                                        )}
                                    </ol>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="isolate grid w-full grid-cols-7 gap-px lg:hidden">
                        {calendarGridDayObjects.map((day) => (
                            <button
                                key={day.date}
                                type="button"
                                className={classNames(
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

                                    'flex h-14 flex-col px-3 py-2 hover:bg-background/50 focus:z-10',
                                )}
                            >
                                <time
                                    dateTime={day.date}
                                    className={classNames(
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
                                <span className="sr-only">
                                    {day.painRecords.length} events
                                </span>
                                {day.painRecords.length > 0 && (
                                    <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                                        {day.painRecords.map((event) => (
                                            <span
                                                key={event.id}
                                                className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                                            />
                                        ))}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <DatePains selectedDay={selectedDay || null} />
        </div>
    );
};
