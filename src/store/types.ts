import { PainRecord } from '../types/types.ts';

export type AppStore = {
    painRecords: PainRecord[];
    setPainRecords: (newPainRecords: AppStore['painRecords']) => void;
};
