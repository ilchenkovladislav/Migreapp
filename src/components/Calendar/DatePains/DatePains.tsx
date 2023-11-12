import { formatDate } from '../../../utils/calendarUtils.ts';
import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { useIndexedDB } from '../../../hooks/useIndexedDB.ts';
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { CalendarDay, PainRecord } from '../../../types/types.ts';

interface DatePainsProps {
    selectedDay: CalendarDay | null;
    painRecords: PainRecord[];
    handleDeleteRecord: (record: PainRecord) => void;
}

export const DatePains = ({
    selectedDay,
    handleDeleteRecord,
    painRecords,
}: DatePainsProps) => {
    const navigate = useNavigate();
    const { deleteRecord } = useIndexedDB();
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));

    useEffect(() => {
        setSelectedKeys(new Set([]));
    }, [selectedDay]);

    if (!selectedDay) return;

    const clickHandler = (date: string) => {
        navigate(`/Migreapp/form/${date}`);
    };

    const handleDelete = (record: PainRecord) => {
        if (record.id) {
            deleteRecord(record.id);
            handleDeleteRecord(record);
        }
    };

    return (
        <>
            <div className="px-4 py-10 sm:px-6 lg:hidden">
                <Accordion
                    selectedKeys={selectedKeys}
                    // @ts-ignore
                    onSelectionChange={setSelectedKeys}
                    variant="shadow"
                >
                    {painRecords.map((record) => {
                        return (
                            <AccordionItem
                                key={record.id}
                                aria-label="Accordion 1"
                                title={`${formatDate(record.date || '')}`}
                                indicator={
                                    <div
                                        className={cn(
                                            'h-1.5 w-1.5 rounded-full bg-gray-400',
                                            {
                                                'bg-red-600':
                                                    record.headache === 'Да',
                                                'bg-green-600':
                                                    record.headache === 'Нет',
                                            },
                                        )}
                                    />
                                }
                            >
                                <div className="flex-auto">
                                    {!!record?.headache && (
                                        <p>
                                            Голова болела:{' '}
                                            <span className="font-semibold dark:text-gray-100">
                                                {record.headache}
                                            </span>
                                        </p>
                                    )}
                                    {!!record?.tookPainMeds && (
                                        <p>
                                            Принимала медикаменты:{' '}
                                            <span className="font-semibold dark:text-gray-100">
                                                {record.tookPainMeds}
                                            </span>
                                        </p>
                                    )}
                                    {!!record?.menstrual && (
                                        <p>
                                            Менструальный цикл:{' '}
                                            <span className="font-semibold dark:text-gray-100">
                                                {record.menstrual}
                                            </span>
                                        </p>
                                    )}

                                    {!!record?.painMedsName && (
                                        <p>
                                            Название препарата:{' '}
                                            <span className="font-semibold dark:text-gray-100">
                                                {record.painMedsName as string}
                                            </span>
                                        </p>
                                    )}

                                    {!!record?.painMedsQuantity && (
                                        <p>
                                            Количество:{' '}
                                            <span className="font-semibold dark:text-gray-100">
                                                {record.painMedsQuantity}
                                            </span>
                                        </p>
                                    )}

                                    {!!record?.painMedsHelped && (
                                        <p>
                                            Помогло:{' '}
                                            <span className="font-semibold dark:text-gray-100">
                                                {record.painMedsHelped}
                                            </span>
                                        </p>
                                    )}

                                    {!!record?.comment && (
                                        <p>
                                            Комментарий:{' '}
                                            <span className="font-semibold dark:text-gray-100">
                                                {record.comment}
                                            </span>
                                        </p>
                                    )}
                                </div>
                                <button
                                    onClick={() => handleDelete(record)}
                                    className="ml-auto mt-5 flex-none self-center rounded-md bg-background px-3 py-2 font-semibold text-foreground shadow-sm"
                                >
                                    Удалить
                                </button>
                            </AccordionItem>
                        );
                    })}
                </Accordion>
                <Button
                    color="primary"
                    variant="shadow"
                    fullWidth
                    size="lg"
                    className="mt-3"
                    onClick={() => clickHandler(selectedDay?.date)}
                >
                    Записать
                </Button>
            </div>
        </>
    );
};
