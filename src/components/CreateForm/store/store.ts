import { create } from 'zustand';

import { PainRecord } from '../../../types/types.ts';
import { HeadacheStore } from './types.ts';

export const initialState: PainRecord = {
    headache: '',
    tookPainMeds: '',
    menstrual: '',
};

export const clearState: PainRecord = {
    date: '',
    headache: '',
    tookPainMeds: '',
    menstrual: '',
    painMedsName: '',
    painMedsQuantity: '1',
    painMedsHelped: '',
    comment: '',
};

export const useHeadacheStore = create<HeadacheStore>((set) => ({
    painRecord: initialState,

    setPainRecord: (newPainRecord) =>
        set((state) => ({
            ...state,
            painRecord: { ...state.painRecord, ...newPainRecord },
        })),
    setHeadache: (newHeadache) => {
        set((state) => ({
            painRecord: { ...state.painRecord, headache: newHeadache },
        }));
    },
    setTookPainMeds: (newTookPainMeds) =>
        set((state) => ({
            painRecord: { ...state.painRecord, tookPainMeds: newTookPainMeds },
        })),
    setMenstrual: (newMenstrual) =>
        set((state) => ({
            painRecord: { ...state.painRecord, menstrual: newMenstrual },
        })),
    setPainMedsName: (newPainMedsName) =>
        set((state) => ({
            painRecord: { ...state.painRecord, painMedsName: newPainMedsName },
        })),
    setPainMedsQuantity: (newPainMedsQuantity) =>
        set((state) => ({
            painRecord: {
                ...state.painRecord,
                painMedsQuantity: newPainMedsQuantity,
            },
        })),
    setPainMedsHelped: (newPainMedsHelped) =>
        set((state) => ({
            painRecord: {
                ...state.painRecord,
                painMedsHelped: newPainMedsHelped,
            },
        })),
    setComment: (newComment) =>
        set((state) => ({
            painRecord: { ...state.painRecord, comment: newComment },
        })),
}));
