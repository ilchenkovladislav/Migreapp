import { HiClock } from 'react-icons/hi';
import { CalendarDay } from '../../../utils/calendarUtils.ts';
import { Button } from '@nextui-org/react';

interface DatePainsProps {
    selectedDay: CalendarDay | null;
}

export const DatePains = ({ selectedDay }: DatePainsProps) => {
    if (!selectedDay) return;

    return (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
            <ol className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white text-sm shadow ring-1 ring-black ring-opacity-5">
                {selectedDay.painRecords.map((record) => (
                    <li
                        key={record.id}
                        className="group flex p-4 pr-6 focus-within:bg-gray-50 hover:bg-gray-50"
                    >
                        <div className="flex-auto">
                            <p className="font-semibold text-gray-900">
                                {record.name}
                            </p>
                            <time
                                dateTime={record.datetime}
                                className="mt-2 flex items-center text-gray-700"
                            >
                                <HiClock
                                    className="mr-2 h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                                {record.time}
                            </time>
                        </div>
                        <a
                            href={record.href}
                            className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-gray-900 opacity-0 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                        >
                            Edit
                            <span className="sr-only">, {record.name}</span>
                        </a>
                    </li>
                ))}
            </ol>
            <Button
                color="primary"
                variant="shadow"
                fullWidth
                size="lg"
                className="mt-3"
            >
                Записать
            </Button>
        </div>
    );
};
