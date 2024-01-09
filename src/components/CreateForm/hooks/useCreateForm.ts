import { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useIndexedDB } from '../../../hooks/useIndexedDB.ts';
import { clearState, useHeadacheStore } from '../store/store.ts';

export const useCreateForm = () => {
    const { painRecord, setPainRecord } = useHeadacheStore();

    const { addPainRecord } = useIndexedDB();
    const { date } = useParams();
    const navigate = useNavigate();

    const clearForm = () => {
        setPainRecord(clearState);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        void addPainRecord({ ...painRecord, date });
        clearForm();

        navigate('/');
    };

    return { handleSubmit };
};
