import toast from 'react-hot-toast';
// Подключение библиотеки idb
import { openDB } from 'idb';

const STORE_NAME = 'painRecords';

export const useIndexedDB = () => {
    // Функция для создания или открытия базы данных
    async function openDatabase() {
        return await openDB('db', 2, {
            upgrade(db) {
                // Создание таблицы "painRecords" с автоинкрементом поля "id" и индексом по полю "date"
                const painRecordsStore = db.createObjectStore(STORE_NAME, {
                    keyPath: 'id',
                    autoIncrement: true,
                });
                painRecordsStore.createIndex('date', 'date', { unique: false });
            },
        });
    }

    async function addPainRecord(record: any) {
        const db = await openDatabase();

        await db
            .add(STORE_NAME, record)
            .then(() => {
                toast.success('Запись успешно добавлена');
            })
            .catch((e) => toast.error(e));
    }

    async function addPainRecords(records: any[]) {
        const db = await openDatabase();

        const promises = records.map((record) =>
            db.add(STORE_NAME, { ...record, imported: true }),
        );

        Promise.allSettled(promises)
            .then(() => {
                toast.success('Записи успешно импортированы');
            })
            .catch((e) => toast.error(e));
    }

    async function getRecord(id: number) {
        const db = await openDatabase();

        const res = await db.get(STORE_NAME, id);
        console.log(res);
    }

    async function getAllRecords() {
        const db = await openDatabase();

        return await db.getAll(STORE_NAME);
    }

    async function deleteRecord(key: IDBValidKey) {
        const db = await openDatabase();

        return await db
            .delete(STORE_NAME, key)
            .then(() => {
                toast.success('Записи успешно удалена');
            })
            .catch((e) => toast.error(e));
    }

    async function getPainRecordsByDateRange(startDate: any, endDate: any) {
        const db = await openDatabase();

        const records = await db.getAllFromIndex(
            STORE_NAME,
            'date',
            IDBKeyRange.bound(startDate, endDate),
        );

        console.log('Записи за выбранный период: ', records);
    }

    return {
        addPainRecord,
        addPainRecords,
        getAllRecords,
        getRecord,
        getPainRecordsByDateRange,
        deleteRecord,
    };
};
