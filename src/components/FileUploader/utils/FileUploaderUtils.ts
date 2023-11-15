import {
    PainMedsHelpedVariants,
    TookPainMedsVariants,
} from '../../CreateForm/types/radioOptions.ts';
import { PainRecord } from '../../../types/types.ts';
import { Xlsx } from '../types/FileUploaderTypes.ts';

const transformPainMedsHelped = (painMedsHelped: string) => {
    const trimmedLower = painMedsHelped.trim().toLowerCase();

    switch (trimmedLower) {
        case 'да':
        case 'помогло': {
            return PainMedsHelpedVariants.Yes;
        }
        case 'не помогло':
        case 'нет': {
            return PainMedsHelpedVariants.No;
        }
        case 'немного': {
            return PainMedsHelpedVariants.Little;
        }
    }
};

export const transformJsonToPainRecords = (json: Xlsx[]) => {
    return json.map((day) => {
        const dayData: Partial<PainRecord> = {};

        Object.entries(day).forEach(([key, value]) => {
            switch (key) {
                case 'Дата': {
                    dayData.date = value;
                    break;
                }
                case 'Головная боль': {
                    dayData.headache = value;
                    break;
                }
                case 'Менструальный цикл': {
                    dayData.menstrual = value;
                    break;
                }
                case 'Принятые медикаменты': {
                    dayData.tookPainMeds = TookPainMedsVariants.Yes;
                    dayData.painMedsQuantity = 1;

                    const arr = value.split(',');

                    if (arr.length > 1) {
                        const [medicine, painMedsHelped] = arr;
                        dayData.painMedsName = medicine.trim();
                        dayData.painMedsHelped =
                            transformPainMedsHelped(painMedsHelped);
                    } else {
                        dayData.painMedsName = value;
                    }
                    break;
                }
                case 'Время': {
                    break;
                }
                default: {
                    if (!dayData.comment) {
                        dayData.comment = '';
                    }
                    dayData.comment += `${key}: ${value}; `;
                }
            }
        });

        return dayData;
    });
};
