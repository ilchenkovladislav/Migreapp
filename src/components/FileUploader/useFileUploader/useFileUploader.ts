import { useIndexedDB } from '../../../hooks/useIndexedDB.ts';
import { read, utils } from 'xlsx';
import { Xlsx } from '../types/FileUploaderTypes.ts';
import { transformJsonToPainRecords } from '../utils/FileUploaderUtils.ts';
import toast from 'react-hot-toast';
import { ChangeEvent } from 'react';

export const useFileUploader = () => {
    const { addPainRecords } = useIndexedDB();

    const handleFileLoad = (reader: ProgressEvent<FileReader>) => {
        if (!reader.target) return;

        const data = reader.target.result;
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = utils.sheet_to_json<Xlsx>(worksheet);

        const transformedData = transformJsonToPainRecords(json);

        if (transformedData.length) {
            addPainRecords(transformedData);
        }
    };

    const handleError = (error: ProgressEvent<FileReader>): void => {
        toast.error(`Ошибка чтения файла: ${error}`);
    };

    const readUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!e.target.files) return;

        const reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onload = handleFileLoad;
        reader.onerror = handleError;
    };

    return { readUploadFile };
};
