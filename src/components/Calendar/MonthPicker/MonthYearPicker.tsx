import { Button, Flex, Select } from '@chakra-ui/react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import {
    getMonthDropdownOptions,
    getYearDropdownOptions,
} from '../../../utils/calendarUtils.ts';
import React from 'react';

interface MonthPickerProps {
    yearAndMonth: [number, number];
    onYearAndMonthChange: (yearAndMonth: [number, number]) => void;
}

export const MonthYearPicker = (props: MonthPickerProps) => {
    const { yearAndMonth, onYearAndMonthChange } = props;
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

    const handleMonthSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const nextYear = year;
        const nextMonth = parseInt(evt.target.value, 10);
        onYearAndMonthChange([nextYear, nextMonth]);
    };

    const handleYearSelect = (evt: React.ChangeEvent<HTMLSelectElement>) => {
        const nextMonth = month;
        const nextYear = parseInt(evt.target.value, 10);
        onYearAndMonthChange([nextYear, nextMonth]);
    };

    return (
        <Flex justifyContent="space-between">
            <Flex w={250}>
                <Button variant="link" onClick={handleMonthNavBackButtonClick}>
                    <MdNavigateBefore />
                </Button>
                <Select
                    value={month}
                    onChange={(e) => handleMonthSelect(e)}
                    icon={<div></div>}
                    textAlign="center"
                >
                    {getMonthDropdownOptions().map(({ label, value }) => (
                        <option value={value} key={value}>
                            {label}
                        </option>
                    ))}
                </Select>
                <Button
                    variant="link"
                    onClick={handleMonthNavForwardButtonClick}
                >
                    <MdNavigateNext />
                </Button>
            </Flex>
            <Select value={year} onChange={handleYearSelect} w={100}>
                {getYearDropdownOptions(year).map(({ label, value }) => (
                    <option value={value} key={value}>
                        {label}
                    </option>
                ))}
            </Select>
        </Flex>
    );
};
