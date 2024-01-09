// Подключение библиотеки idb
import { openDB } from 'idb';
import { Key } from 'react';
import toast from 'react-hot-toast';

import { PainRecord } from '../types/types.ts';
import { handleError } from '../utils/commonUtils.ts';

const STORE_NAME = 'painRecords';

export const useIndexedDB = () => {
    // Функция для создания или открытия базы данных
    // eslint-disable-next-line unicorn/consistent-function-scoping
    async function openDatabase() {
        return await openDB<PainRecord>('db', 2, {
            upgrade(database) {
                // Создание таблицы "painRecords" с автоинкрементом поля "id" и индексом по полю "date"
                const painRecordsStore = database.createObjectStore(
                    STORE_NAME,
                    {
                        keyPath: 'id',
                        autoIncrement: true,
                    },
                );
                painRecordsStore.createIndex('date', 'date', { unique: false });
            },
        });
    }

    async function addPainRecord(record: any) {
        const database = await openDatabase();

        await database
            .add(STORE_NAME, record)
            .then(() => {
                toast.success('Запись успешно добавлена');
            })
            .catch(handleError);
    }

    async function addPainRecords(records: any[]) {
        const database = await openDatabase();

        const promises = records.map((record) =>
            database.add(STORE_NAME, { ...record, imported: true }),
        );

        Promise.allSettled(promises)
            .then(() => {
                toast.success('Записи успешно импортированы');
            })
            .catch(handleError);
    }

    async function getRecord(id: number) {
        const database = await openDatabase();

        return (await database.get(STORE_NAME, id)) as PainRecord;
    }

    async function getAllRecords() {
        const database = await openDatabase();

        return (await database.getAll(STORE_NAME)) as PainRecord[];
    }

    async function deleteRecord(key: IDBValidKey) {
        const database = await openDatabase();

        database
            .delete(STORE_NAME, key)
            .then(() => {
                toast.success('Запись успешно удалена');
            })
            .catch(handleError);
    }

    async function deleteRecords(keys: Key[]) {
        const database = await openDatabase();

        const promises = keys.map((key) => {
            return database.delete(STORE_NAME, Number(key));
        });

        Promise.allSettled(promises)
            .then(() => {
                toast.success('Записи успешно удалены');
            })
            .catch(handleError);
    }

    async function clearRecords() {
        const database = await openDatabase();

        database
            .clear(STORE_NAME)
            .then(() => {
                toast.success('Записи успешно удалены');
            })
            .catch(handleError);
    }

    async function getPainRecordsByDateRange(startDate: any, endDate: any) {
        const database = await openDatabase();

        const records = await database.getAllFromIndex(
            STORE_NAME,
            'date',
            IDBKeyRange.bound(startDate, endDate),
        );

        console.log('Записи за выбранный период:', records);
    }

    return {
        addPainRecord,
        addPainRecords,
        getAllRecords,
        getRecord,
        getPainRecordsByDateRange,
        deleteRecord,
        deleteRecords,
        clearRecords,
    };
};
