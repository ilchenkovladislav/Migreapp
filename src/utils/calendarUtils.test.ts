import { describe, expect, test } from 'vitest';
import {
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
    expect(getCurrentYear()).toBe(2023);
});

test('getCurrentMonth', () => {
    expect(getCurrentMonth()).toBe(11);
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
