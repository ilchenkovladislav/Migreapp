import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { CalendarDay } from '../../types/types.ts';
import { CalendarRecordList } from './components/CalendarRecordList/CalendarRecordList.tsx';
import { useAppStore } from '../../store/store.ts';

interface DatePainsProps {
    selectedDay: CalendarDay;
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
            <div className="px-4 py-10 sm:px-6">
                <CalendarRecordList
                    selectedDay={selectedDay}
                    recordsSelectedDay={recordsSelectedDay}
                />
                <Button
                    color="primary"
                    variant="shadow"
                    fullWidth
                    size="lg"
                    className="mt-3"
                    onClick={() => navigateToForm(selectedDay.date)}
                >
                    Записать
                </Button>
            </div>
        </>
    );
};
