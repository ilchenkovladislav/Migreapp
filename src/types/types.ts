import { Key } from 'react';

export interface PainRecord {
    id?: number;
    date?: string;
    headache: string;
    menstrual: string;
    tookPainMeds: string;
    painMedsName?: Key | null;
    painMedsQuantity?: string | number;
    painMedsHelped?: string;
    comment?: string;
}

export interface CalendarDay {
    date: string;
    dayOfMonth: number;
    isPreviousMonth?: boolean;
    isCurrentMonth: boolean;
    isNextMonth?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
}
