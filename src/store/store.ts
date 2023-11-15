import { create } from 'zustand';
import { AppStore } from './types.ts';
import { PainRecord } from '../types/types.ts';

const initialState: PainRecord[] = [];

export const useAppStore = create<AppStore>((set) => ({
    painRecords: initialState,

    setPainRecords: (newPainRecords) =>
        set((state) => ({
            ...state,
            painRecords: newPainRecords,
        })),
}));
