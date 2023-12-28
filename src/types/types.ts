export interface PainRecord {
    id: number;
    date: string;
    headache: string;
    menstrual: string;
    tookPainMeds: string;
    painMedsName?: string | number | null;
    painMedsQuantity?: string | number;
    painMedsHelped?: string;
    comment?: string;
}

export interface Day {
    date: string;
    dayOfMonth: number;
    isPreviousMonth?: boolean;
    isCurrentMonth: boolean;
    isNextMonth?: boolean;
    isToday?: boolean;
    isSelected?: boolean;
}
