import { describe, expect, test } from 'vitest';

import {
    createDaysForCurrentMonth,
    createDaysForNextMonth,
    createDaysForPreviousMonth,
    formatDate,
    getCurrentMonth,
    getCurrentYear,
    getMonthName,
    getNumberOfDaysInMonth,
} from './calendarUtils.ts';

describe('getMonthName', () => {
    test('1 месяц', () => {
        expect(getMonthName(1)).toBe('январь');
    });
    test('2 месяц', () => {
        expect(getMonthName(2)).toBe('февраль');
    });
    test('3 месяц', () => {
        expect(getMonthName(3)).toBe('март');
    });
    test('4 месяц', () => {
        expect(getMonthName(4)).toBe('апрель');
    });
    test('5 месяц', () => {
        expect(getMonthName(5)).toBe('май');
    });
    test('6 месяц', () => {
        expect(getMonthName(6)).toBe('июнь');
    });
    test('7 месяц', () => {
        expect(getMonthName(7)).toBe('июль');
    });
    test('8 месяц', () => {
        expect(getMonthName(8)).toBe('август');
    });
    test('9 месяц', () => {
        expect(getMonthName(9)).toBe('сентябрь');
    });
    test('10 месяц', () => {
        expect(getMonthName(10)).toBe('октябрь');
    });
    test('11 месяц', () => {
        expect(getMonthName(11)).toBe('ноябрь');
    });
    test('12 месяц', () => {
        expect(getMonthName(12)).toBe('декабрь');
    });
});

test('getCurrentYear', () => {
    expect(getCurrentYear()).toBe(new Date().getFullYear());
});

test('getCurrentMonth', () => {
    expect(getCurrentMonth()).toBe(new Date().getMonth() + 1);
});

describe('getNumberOfDaysInMonth', () => {
    test('*.11.23', () => {
        expect(getNumberOfDaysInMonth(2023, 11)).toBe(30);
    });
    test('*.01.22', () => {
        expect(getNumberOfDaysInMonth(2022, 1)).toBe(31);
    });
    test('*.06.24', () => {
        expect(getNumberOfDaysInMonth(2024, 6)).toBe(30);
    });
    test('*.02.25', () => {
        expect(getNumberOfDaysInMonth(2025, 2)).toBe(28);
    });
});

describe('formatDate', () => {
    test('2023-11-05', () => {
        expect(formatDate('2023-11-05')).toBe('05.11.2023');
    });
    test('2024-01-22', () => {
        expect(formatDate('2024-01-22')).toBe('22.01.2024');
    });
    test('2022-12-01', () => {
        expect(formatDate('2022-12-01')).toBe('01.12.2022');
    });
});

describe('createDaysForMonth', () => {
    const daysPreviousMonth = [
        {
            date: '2023-10-30',
            dayOfMonth: 30,
            isCurrentMonth: false,
        },
        {
            date: '2023-10-31',
            dayOfMonth: 31,
            isCurrentMonth: false,
        },
    ];

    const daysCurrentMonth = [
        {
            date: '2023-11-01',
            dayOfMonth: 1,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-02',
            dayOfMonth: 2,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-03',
            dayOfMonth: 3,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-04',
            dayOfMonth: 4,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-05',
            dayOfMonth: 5,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-06',
            dayOfMonth: 6,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-07',
            dayOfMonth: 7,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-08',
            dayOfMonth: 8,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-09',
            dayOfMonth: 9,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-10',
            dayOfMonth: 10,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-11',
            dayOfMonth: 11,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-12',
            dayOfMonth: 12,
            isCurrentMonth: true,
            isToday: true,
        },
        {
            date: '2023-11-13',
            dayOfMonth: 13,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-14',
            dayOfMonth: 14,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-15',
            dayOfMonth: 15,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-16',
            dayOfMonth: 16,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-17',
            dayOfMonth: 17,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-18',
            dayOfMonth: 18,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-19',
            dayOfMonth: 19,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-20',
            dayOfMonth: 20,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-21',
            dayOfMonth: 21,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-22',
            dayOfMonth: 22,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-23',
            dayOfMonth: 23,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-24',
            dayOfMonth: 24,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-25',
            dayOfMonth: 25,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-26',
            dayOfMonth: 26,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-27',
            dayOfMonth: 27,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-28',
            dayOfMonth: 28,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-29',
            dayOfMonth: 29,
            isCurrentMonth: true,
            isToday: false,
        },
        {
            date: '2023-11-30',
            dayOfMonth: 30,
            isCurrentMonth: true,
            isToday: false,
        },
    ];

    const daysNextMonth = [
        {
            date: '2023-12-01',
            dayOfMonth: 1,
            isCurrentMonth: false,
            isNextMonth: true,
        },
        {
            date: '2023-12-02',
            dayOfMonth: 2,
            isCurrentMonth: false,
            isNextMonth: true,
        },
        {
            date: '2023-12-03',
            dayOfMonth: 3,
            isCurrentMonth: false,
            isNextMonth: true,
        },
    ];

    test('prev 2023 11', () => {
        expect(createDaysForPreviousMonth(2023, 11, daysCurrentMonth)).toEqual(
            daysPreviousMonth,
        );
    });

    test('current 2023 11', () => {
        expect(createDaysForCurrentMonth(2023, 11)).toEqual(daysCurrentMonth);
    });

    test('next 2023 11', () => {
        expect(createDaysForNextMonth(2023, 11, daysCurrentMonth)).toEqual(
            daysNextMonth,
        );
    });
});
