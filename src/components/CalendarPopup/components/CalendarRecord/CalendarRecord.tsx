import { PainRecord } from '../../../../types/types.ts';
import { CalendarFieldList } from '../CalendarFieldList/CalendarFieldList.tsx';

type CalendarRecordProps = {
    record: PainRecord;
    handleDeleteRecord: (record: PainRecord) => void;
};

export const CalendarRecord = (props: CalendarRecordProps) => {
    const { record, handleDeleteRecord } = props;

    return (
        <>
            <CalendarFieldList record={record} />
            <button
                onClick={() => handleDeleteRecord(record)}
                className="ml-auto mt-5 flex-none self-center rounded-md bg-background px-3 py-2 font-semibold text-foreground shadow-sm"
            >
                Удалить
            </button>
        </>
    );
};
