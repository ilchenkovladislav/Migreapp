import {
    HeadacheVariants,
    MenstrualVariants,
    PainMedsHelpedVariants,
    TookPainMedsVariants,
} from '../components/CreateForm/types/radioOptions.ts';

export interface PainRecord {
    id: number;
    date: string;
    headache: HeadacheVariants;
    menstrual: MenstrualVariants;
    tookPainMeds: TookPainMedsVariants;
    painMedsName?: string | number | null;
    painMedsQuantity?: string | number;
    painMedsHelped?: PainMedsHelpedVariants;
    comment?: string;
    imported?: string;
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
