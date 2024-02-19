import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

import { useAppStore } from '../../store/store.ts';
import { Day } from '../../types/types.ts';
import { CalendarRecordList } from './components/CalendarRecordList/CalendarRecordList.tsx';

interface DatePainsProps {
    selectedDay: Day;
}

export const CalendarPopup = ({ selectedDay }: DatePainsProps) => {
    const painRecords = useAppStore((state) => state.painRecords);

    const navigate = useNavigate();
    const navigateToForm = (date: string) => {
        navigate(`form/${date}`);
    };

    const recordsSelectedDay = painRecords.filter((record) => {
        return record.date === selectedDay.date;
    });

    return (
        <>
            <div className="px-4 py-5 pb-20 sm:px-6">
                <CalendarRecordList
                    selectedDay={selectedDay}
                    recordsSelectedDay={recordsSelectedDay}
                />
                <Button
                    color="primary"
                    fullWidth
                    size="lg"
                    radius="sm"
                    className="mt-3 text-lg"
                    onClick={() => navigateToForm(selectedDay.date)}
                >
                    новая запись
                </Button>
            </div>
        </>
    );
};
