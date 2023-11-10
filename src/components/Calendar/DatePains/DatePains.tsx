import { HiClock } from 'react-icons/hi';
import {
    CalendarDay,
    formatDate,
    PainRecord,
} from '../../../utils/calendarUtils.ts';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useIndexedDB } from '../../../hooks/useIndexedDB.ts';

interface DatePainsProps {
    selectedDay: CalendarDay | null;
    painRecords: PainRecord[];
    handleDeleteRecord: (record: PainRecord) => void;
}

export const DatePains = ({
    selectedDay,
    handleDeleteRecord,
    painRecords,
}: DatePainsProps) => {
    const navigate = useNavigate();
    const { deleteRecord } = useIndexedDB();
    if (!selectedDay) return;

    const clickHandler = (date: string) => {
        navigate(`/Migreapp/form/${date}`);
    };

    const handleDelete = (record: PainRecord) => {
        if (record.id) {
            deleteRecord(record.id);
            handleDeleteRecord(record);
        }
    };

    return (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
            <ol className="divide-y dark:divide-gray-800 overflow-hidden rounded-lg dark:bg-gray-900 text-sm shadow ring-1 ring-black ring-opacity-5">
                {painRecords.map((record) => {
                    if (record.date === selectedDay.date) {
                        return (
                            <li key={record.id} className="group flex p-4 pr-6">
                                <div className="flex-auto">
                                    <p className="font-semibold dark:text-gray-100">
                                        Голова болела: {record.headache}
                                    </p>
                                    <time
                                        dateTime={record.date}
                                        className="mt-2 flex items-center text-gray-500"
                                    >
                                        <HiClock
                                            className="mr-2 h-5 w-5 text-gray-200"
                                            aria-hidden="true"
                                        />
                                        {formatDate(record.date)}
                                    </time>
                                </div>
                                <button
                                    onClick={() => handleDelete(record)}
                                    className="ml-6 flex-none self-center rounded-md bg-background px-3 py-2 font-semibold text-foreground shadow-sm"
                                >
                                    Удалить
                                </button>
                            </li>
                        );
                    }
                })}
            </ol>
            <Button
                color="primary"
                variant="shadow"
                fullWidth
                size="lg"
                className="mt-3"
                onClick={() => clickHandler(selectedDay?.date)}
            >
                Записать
            </Button>
        </div>
    );
};
