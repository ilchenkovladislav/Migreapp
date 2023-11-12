import { Key } from 'react';

import { PainRecord } from '../../../types/types.ts';

export type HeadacheStore = {
    painRecord: PainRecord;

    setPainRecord: (
        newPainRecord: Partial<HeadacheStore['painRecord']>,
    ) => void;
    setHeadache: (newHeadache: string) => void;
    setTookPainMeds: (newTookPainMeds: string) => void;
    setMenstrual: (newMenstrual: string) => void;
    setPainMedsName: (newPainMedsName: Key | null) => void;
    setPainMedsQuantity: (newPainMedsQuantity: string) => void;
    setPainMedsHelped: (newPainMedsHelped: string) => void;
    setComment: (newComment: string) => void;
};
