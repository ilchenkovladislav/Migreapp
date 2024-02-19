import { Button } from '@nextui-org/react';

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
            <Button
                onClick={() => handleDeleteRecord(record)}
                variant="light"
                className="ml-auto flex px-0 text-red-500 font-semibold justify-end"
            >
                удалить
            </Button>
        </>
    );
};
