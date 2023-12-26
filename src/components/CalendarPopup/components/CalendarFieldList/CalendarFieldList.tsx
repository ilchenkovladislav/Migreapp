import { painRecordFields } from '../CalendarRecord/model/constants.ts';
import { CalendarRecordField } from '../CalendarRecordField/CalendarRecordField.tsx';
import { PainRecord } from '../../../../types/types.ts';

type CalendarFieldListProps = {
    record: PainRecord;
};

export const CalendarFieldList = ({ record }: CalendarFieldListProps) => {
    return (
        <div className="flex-auto">
            {painRecordFields.map((field) => {
                if (record[field.key]) {
                    return (
                        <CalendarRecordField
                            key={field.key}
                            title={field.title}
                            value={record[field.key]}
                        />
                    );
                }
            })}
        </div>
    );
};
