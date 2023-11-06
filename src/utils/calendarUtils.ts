import { range } from 'lodash';
import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

dayjs.locale(ru);

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

export function getNumberOfDaysInMonth(year: number, month: number) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
}

export function createDaysForCurrentMonth(year: number, month: number) {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((_, index) => {
        return {
            dateString: dayjs(`${year}-${month}-${index + 1}`).format(
                'YYYY-MM-DD',
            ),
            dayOfMonth: index + 1,
            isCurrentMonth: true,
        };
    });
}

export function createDaysForPreviousMonth(
    year: number,
    month: number,
    currentMonthDays: any,
) {
    const firstDayOfTheMonthWeekday = getWeekday(
        currentMonthDays[0].dateString,
    );
    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, 'month');

    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday;

    const previousMonthLastMondayDayOfMonth = dayjs(
        currentMonthDays[0].dateString,
    )
        .subtract(visibleNumberOfDaysFromPreviousMonth, 'day')
        .date();

    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((_, index) => {
        return {
            dateString: dayjs(
                `${previousMonth.year()}-${previousMonth.month() + 1}-${
                    previousMonthLastMondayDayOfMonth + index
                }`,
            ).format('YYYY-MM-DD'),
            dayOfMonth: previousMonthLastMondayDayOfMonth + index,
            isCurrentMonth: false,
            isPreviousMonth: true,
        };
    });
}

export function createDaysForNextMonth(
    year: number,
    month: number,
    currentMonthDays: any,
) {
    const lastDayOfTheMonthWeekday = getWeekday(
        `${year}-${month}-${currentMonthDays.length}`,
    );
    const nextMonth = dayjs(`${year}-${month}-01`).add(1, 'month');
    const visibleNumberOfDaysFromNextMonth = 6 - lastDayOfTheMonthWeekday;

    return [...Array(visibleNumberOfDaysFromNextMonth)].map((_, index) => {
        return {
            dateString: dayjs(
                `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`,
            ).format('YYYY-MM-DD'),
            dayOfMonth: index + 1,
            isCurrentMonth: false,
            isNextMonth: true,
        };
    });
}

export function getWeekday(dateString: string) {
    return dayjs(dateString).weekday();
}

export function isWeekendDay(dateString: string) {
    return [5, 6].includes(getWeekday(dateString));
}
