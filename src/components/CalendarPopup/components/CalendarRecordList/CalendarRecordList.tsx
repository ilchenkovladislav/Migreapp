import { Accordion, AccordionItem } from '@nextui-org/react';
import {
    formatDate,
    getIndicatorColor,
} from '../../../../utils/calendarUtils.ts';
import { Indicator } from '../../../Indicator/Indicator.tsx';
import { CalendarRecord } from '../CalendarRecord/CalendarRecord.tsx';
import { CalendarDay, PainRecord } from '../../../../types/types.ts';
import { useIndexedDB } from '../../../../hooks/useIndexedDB.ts';
import { useAppStore } from '../../../../store/store.ts';
import { useAccordion } from '../../hooks/useAccordion.ts';

type CalendarRecordListProps = {
    selectedDay: CalendarDay;
    recordsSelectedDay: PainRecord[];
};

export const CalendarRecordList = (props: CalendarRecordListProps) => {
    const { recordsSelectedDay, selectedDay } = props;
    const { deleteRecord } = useIndexedDB();
    const { painRecords, setPainRecords } = useAppStore();
    const { selectedKeys, setSelectedKeys } = useAccordion(selectedDay);

    const handleDeleteRecord = (record: PainRecord) => {
        deleteRecord(record.id);
        setPainRecords(painRecords.filter((rec) => rec.id !== record.id));
    };

    return (
        <Accordion
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
            variant="shadow"
        >
            {recordsSelectedDay.map((record) => {
                return (
                    <AccordionItem
                        key={record.id}
                        aria-label="Accordion 1"
                        title={`${formatDate(record.date || '')}`}
                        indicator={
                            <Indicator variant={getIndicatorColor(record)} />
                        }
                    >
                        <CalendarRecord
                            record={record}
                            handleDeleteRecord={handleDeleteRecord}
                        />
                    </AccordionItem>
                );
            })}
        </Accordion>
    );
};
