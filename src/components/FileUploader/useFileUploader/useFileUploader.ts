import { ChangeEvent } from 'react';
import { read, utils } from 'xlsx';

import { useIndexedDB } from '../../../hooks/useIndexedDB.ts';
import { useAppStore } from '../../../store/store.ts';
import { handleError } from '../../../utils/commonUtils.ts';
import { Xlsx } from '../types/FileUploaderTypes.ts';
import { transformJsonToPainRecords } from '../utils/FileUploaderUtils.ts';

export const useFileUploader = () => {
    const { addPainRecords, getAllRecords } = useIndexedDB();
    const { setPainRecords } = useAppStore();

    const handleFileLoad = (arrayBuffer: ArrayBuffer) => {
        const workbook = read(arrayBuffer, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json<Xlsx>(worksheet);

        const transformedData = transformJsonToPainRecords(json);

        if (transformedData.length > 0) {
            addPainRecords(transformedData)
                .then(() => {
                    getAllRecords().then(setPainRecords).catch(handleError);
                })
                .catch(handleError);
        }
    };

    async function readUploadFile(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        if (!event.target.files) return;

        try {
            const arrayBuffer = await event.target.files[0].arrayBuffer();
            handleFileLoad(arrayBuffer);
        } catch (error) {
            handleError(error);
        }
    }

    return { readUploadFile };
};
