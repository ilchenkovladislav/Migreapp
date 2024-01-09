import { create } from 'zustand';

import { PainRecord } from '../types/types.ts';
import { AppStore } from './types.ts';

const initialState: PainRecord[] = [];

export const useAppStore = create<AppStore>((set) => ({
    painRecords: initialState,

    setPainRecords: (newPainRecords) =>
        set((state) => ({
            ...state,
            painRecords: newPainRecords,
        })),
}));
