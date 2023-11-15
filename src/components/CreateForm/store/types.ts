import { PainRecord } from '../../../types/types.ts';

export type HeadacheStore = {
    painRecord: PainRecord;

    setPainRecord: (
        newPainRecord: Partial<HeadacheStore['painRecord']>,
    ) => void;
    setHeadache: (newHeadache: PainRecord['headache']) => void;
    setTookPainMeds: (newTookPainMeds: PainRecord['tookPainMeds']) => void;
    setMenstrual: (newMenstrual: PainRecord['menstrual']) => void;
    setPainMedsName: (newPainMedsName: PainRecord['painMedsName']) => void;
    setPainMedsQuantity: (
        newPainMedsQuantity: PainRecord['painMedsQuantity'],
    ) => void;
    setPainMedsHelped: (
        newPainMedsHelped: PainRecord['painMedsHelped'],
    ) => void;
    setComment: (newComment: string) => void;
};
