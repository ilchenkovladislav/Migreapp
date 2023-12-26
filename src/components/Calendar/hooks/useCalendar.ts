import { useEffect, useState } from 'react';
import {
    createCurrentMonthDays,
    getCurrentMonth,
    getCurrentYear,
} from '../../../utils/calendarUtils.ts';
import { useIndexedDB } from '../../../hooks/useIndexedDB.ts';
import { useAppStore } from '../../../store/store.ts';

type DisplayedDate = {
    month: number;
    year: number;
};

export const useCalendar = () => {
    const [displayedDate, setDisplayedDate] = useState<DisplayedDate>({
        month: getCurrentMonth(),
        year: getCurrentYear(),
    });

    const { month, year } = displayedDate;

    const [calendarDays, setCalendarDays] = useState(
        createCurrentMonthDays(year, month),
    );

    const { setPainRecords } = useAppStore();

    const { getAllRecords } = useIndexedDB();
    useEffect(() => {
        try {
            setCalendarDays(createCurrentMonthDays(year, month));
            getAllRecords().then(setPainRecords);
        } catch (e) {
            console.error(e);
        }
    }, [year, month]);

    function updateDisplayedDate(monthChange: number) {
        let nextYear = year;
        let nextMonth = month + monthChange;

        if (nextMonth === 0) {
            nextMonth = 12;
            nextYear = year - 1;
        } else if (nextMonth === 13) {
            nextMonth = 1;
            nextYear = year + 1;
        }

        setDisplayedDate({ month: nextMonth, year: nextYear });
    }

    return {
        displayedDate,
        calendarDays,
        updateDisplayedDate,
    };
};
