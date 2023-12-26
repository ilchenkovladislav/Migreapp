import { PainRecord } from '../../../../../types/types.ts';

export type PainRecordField = { title: string; key: keyof PainRecord };

export const painRecordFields: PainRecordField[] = [
    {
        title: 'Голова болела',
        key: 'headache',
    },
    {
        title: 'Принимала медикаменты',
        key: 'tookPainMeds',
    },
    {
        title: 'Менструальный цикл',
        key: 'menstrual',
    },
    {
        title: 'Название препарата',
        key: 'painMedsName',
    },
    {
        title: 'Количество',
        key: 'painMedsQuantity',
    },
    {
        title: 'Помогло',
        key: 'painMedsHelped',
    },
    {
        title: 'Комментарий',
        key: 'comment',
    },
];
