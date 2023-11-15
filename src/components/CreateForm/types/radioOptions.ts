export type Variants = Record<string, string>;

export enum HeadacheVariants {
    Yes = 'Да',
    No = 'Нет',
}

export enum TookPainMedsVariants {
    Yes = 'Да',
    No = 'Нет',
}

export enum PainMedsHelpedVariants {
    Yes = 'Да',
    No = 'Нет',
    Little = 'Немного',
}

export enum MenstrualVariants {
    Yes = 'Да',
    No = 'Нет',
}

export type medicineOption = {
    value: string;
    label: string;
};
