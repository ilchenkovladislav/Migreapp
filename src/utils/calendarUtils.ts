import { range } from 'lodash';
import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

dayjs.locale(ru);

export interface PainRecord {
    datetime?: string;
    id?: number;
    name?: string;
    time?: string;
    href?: string;
}

export interface CalendarDay {
    date: string;
    dayOfMonth: number;
    isPreviousMonth?: boolean;
    isCurrentMonth: boolean;
    isNextMonth?: boolean;
    isToday?: boolean;
    painRecords: PainRecord[];
    isSelected?: boolean;
}

export const daysOfWeekFull = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресение',
];

export const daysOfWeekShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export function getYearDropdownOptions(currentYear: number) {
    const minYear = currentYear - 2;
    const maxYear = currentYear + 2;
    return range(minYear, maxYear + 1).map((year) => ({
        label: `${year}`,
        value: year,
    }));
}

export function getMonthDropdownOptions() {
    return range(1, 13).map((month) => ({
        value: month,
        label: dayjs()
            .month(month - 1)
            .format('MMMM'),
    }));
}

export function getMonthName(month: number) {
    return dayjs()
        .month(month - 1)
        .format('MMMM');
}

export function isToday(date: dayjs.Dayjs) {
    return date.isSame(dayjs(), 'day');
}

export function getCurrentYear() {
    return dayjs().year();
}

export function getCurrentMonth() {
    return dayjs().month() + 1;
}

export function getNumberOfDaysInMonth(year: number, month: number) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
}

export function createDaysForCurrentMonth(
    year: number,
    month: number,
): CalendarDay[] {
    const res: CalendarDay[] = [];
    for (let i = 0; i < getNumberOfDaysInMonth(year, month); i++) {
        const currentDate = dayjs(`${year}-${month}-${i + 1}`);

        res.push({
            date: currentDate.format('YYYY-MM-DD'),
            dayOfMonth: i + 1,
            isCurrentMonth: true,
            isToday: isToday(currentDate),
            painRecords: [],
        });
    }

    return res;
}

export function createDaysForPreviousMonth(
    year: number,
    month: number,
    currentMonthDays: CalendarDay[],
): CalendarDay[] {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);
    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, 'month');

    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;

    const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
        .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
        .date();

    const res: CalendarDay[] = [];

    for (let i = 0; i < visibleNumberOfDaysFromPreviousMonth; i++) {
        res.push({
            date: dayjs(
                `${previousMonth.year()}-${previousMonth.month() + 1}-${
                    previousMonthLastMondayDayOfMonth + i
                }`,
            ).format('YYYY-MM-DD'),
            dayOfMonth: previousMonthLastMondayDayOfMonth + i,
            isCurrentMonth: false,
            painRecords: [],
        });
    }

    return res;
}

export function createDaysForNextMonth(
    year: number,
    month: number,
    currentMonthDays: CalendarDay[],
): CalendarDay[] {
    const lastDayOfTheMonthWeekday = getWeekday(
        `${year}-${month}-${currentMonthDays.length}`,
    );
    const nextMonth = dayjs(`${year}-${month}-01`).add(1, 'month');
    const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;

    const res: CalendarDay[] = [];

    for (let i = 0; i < visibleNumberOfDaysFromNextMonth; i++) {
        res.push({
            date: dayjs(
                `${nextMonth.year()}-${nextMonth.month() + 1}-${i + 1}`,
            ).format('YYYY-MM-DD'),
            dayOfMonth: i + 1,
            isCurrentMonth: false,
            isNextMonth: true,
            painRecords: [],
        });
    }

    return res;
}

export function getWeekday(dateString: string) {
    return dayjs(dateString).weekday();
}
