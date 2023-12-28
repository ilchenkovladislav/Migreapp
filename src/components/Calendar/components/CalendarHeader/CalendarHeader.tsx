import { Button, ButtonGroup } from '@nextui-org/react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { DisplayedDate } from '../../hooks/useCalendar.ts';
import { CalendarDate } from '../CalendarDate/CalendarDate.tsx';

type CalendarHeaderProps = {
    updateDisplayedDate: (monthChange: number) => void;
    displayedDate: DisplayedDate;
};

export const CalendarHeader = (props: CalendarHeaderProps) => {
    const { updateDisplayedDate, displayedDate } = props;
    const handleMonthNavBackButtonClick = () => {
        updateDisplayedDate(-1);
    };

    const handleMonthNavForwardButtonClick = () => {
        updateDisplayedDate(1);
    };

    return (
        <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-900 px-6 py-4 lg:flex-none">
            <CalendarDate displayedDate={displayedDate} />
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
                    <HiChevronRight className="h-5 w-5" aria-hidden="true" />
                </Button>
            </ButtonGroup>
        </header>
    );
};
