import { clearState, useHeadacheStore } from '../store/store.ts';
import { FormEvent } from 'react';
import { useIndexedDB } from '../../../hooks/useIndexedDB.ts';
import { useNavigate, useParams } from 'react-router-dom';

export const useCreateForm = () => {
    const { painRecord, setPainRecord } = useHeadacheStore();

    const { addPainRecord } = useIndexedDB();
    const { date } = useParams();
    const navigate = useNavigate();

    const clearForm = () => {
        setPainRecord(clearState);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addPainRecord({ ...painRecord, date });
        clearForm();

        navigate('/Migreapp/');
    };

    return { handleSubmit };
};
