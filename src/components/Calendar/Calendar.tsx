import {
    daysOfWeekFull,
    createDaysForCurrentMonth,
    createDaysForNextMonth,
    createDaysForPreviousMonth,
    daysOfWeekShort,
} from '../../utils/calendarUtils.ts';
import { Box, SimpleGrid } from '@chakra-ui/react';
import { MonthYearPicker } from './MonthPicker/MonthYearPicker.tsx';

interface CalendarProps {
    yearAndMonth: [number, number];
    onYearAndMonthChange: (yearAndMonth: [number, number]) => void;
}

export const Calendar = ({
    yearAndMonth = [2021, 6],
    onYearAndMonthChange,
}: CalendarProps) => {
    const [year, month] = yearAndMonth;

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

    return (
        <div>
            <MonthYearPicker
                onYearAndMonthChange={onYearAndMonthChange}
                yearAndMonth={yearAndMonth}
            />
            <SimpleGrid columns={7} justifyItems="center" mt="30px">
                {daysOfWeekFull.map((day) => (
                    <Box hideBelow="md" key={day}>
                        {day}
                    </Box>
                ))}
                {daysOfWeekShort.map((day) => (
                    <Box hideFrom="md" key={day}>
                        {day}
                    </Box>
                ))}
            </SimpleGrid>
            <SimpleGrid columns={7} spacing="1px" bgColor="chakra-border-color">
                {calendarGridDayObjects.map((day) => (
                    <Box
                        key={day.dateString}
                        bgColor={
                            day.isCurrentMonth
                                ? 'chakra-body-bg'
                                : 'chakra-subtle-bg'
                        }
                        p={3}
                        minH="75px"
                        color={
                            !day.isCurrentMonth
                                ? 'chakra-subtle-text'
                                : 'chakra-body-text'
                        }
                        onClick={() => console.log(day)}
                    >
                        <Box>{day.dayOfMonth}</Box>
                    </Box>
                ))}
            </SimpleGrid>
        </div>
    );
};
