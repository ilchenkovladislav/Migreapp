import { Selection, SortDescriptor } from '@nextui-org/react';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { useIndexedDB } from '../../hooks/useIndexedDB.ts';
import { useAppStore } from '../../store/store.ts';
import { PainRecord } from '../../types/types.ts';
import { formatDate } from '../../utils/calendarUtils.ts';
import { handleError } from '../../utils/commonUtils.ts';
import { columns, Filter } from './data.ts';

export type FilterOption = {
    keys: 'all' | Set<number | string>;
    filter: Filter;
};

export type FilterValue = Record<string, 'all' | Set<number | string>>;

const INITIAL_VISIBLE_COLUMNS = [
    'date',
    'headache',
    'menstrual',
    'tookPainMeds',
    'painMedsName',
    'painMedsHelped',
    'actions',
];

const ROWS_PER_PAGE = 20;

export const useAppTable = () => {
    const { painRecords, setPainRecords } = useAppStore();
    const [filterValue, setFilterValue] = useState('');
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [isLoading, setIsLoading] = useState(true);
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: 'date',
        direction: 'ascending',
    });

    const [page, setPage] = useState(1);

    const [filterValues, setFilterValues] = useState<FilterValue>({
        headache: 'all',
        menstrual: 'all',
        tookPainMeds: 'all',
        painMedsName: 'all',
        painMedsHelped: 'all',
        imported: 'all',
    });

    const onChangeFilter = (object: FilterOption) => {
        if (object.filter.options.length + 1 === object?.keys?.size) {
            setFilterValues((previous) => ({
                ...previous,
                [object.filter.uid]: 'all',
            }));
        } else {
            setFilterValues((previous) => ({
                ...previous,
                [object.filter.uid]: object.keys,
            }));
        }
    };

    const { getAllRecords, deleteRecords, clearRecords } = useIndexedDB();

    useEffect(() => {
        getAllRecords()
            .then(setPainRecords)
            .catch(handleError)
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === 'all') return columns;

        return columns.filter((column) =>
            [...visibleColumns].includes(column.uid),
        );
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredRecords = [...painRecords];

        for (const key in filterValues) {
            if (filterValues[key] === 'all') {
                continue;
            }

            filteredRecords = filteredRecords.filter((record) => {
                let hasNone = false;

                if ([...(filterValues[key] ?? [])].includes('none')) {
                    hasNone = true;
                }

                return (
                    [...(filterValues[key] ?? [])]
                        .map((element) => {
                            if (typeof element === 'string') {
                                return element.toLocaleLowerCase();
                            }
                        })
                        .includes(record[key].toLocaleLowerCase()) ||
                    (hasNone ? !(key in record) : false)
                );
            });
        }

        if (hasSearchFilter) {
            filteredRecords = filteredRecords.filter((record) => {
                if (record.date) {
                    return formatDate(record.date).includes(filterValue);
                }
            });
        }

        return filteredRecords;
    }, [painRecords, filterValue, filterValues, hasSearchFilter]);

    const pages = Math.ceil(filteredItems.length / ROWS_PER_PAGE);

    const sortedItems = useMemo(() => {
        return [...filteredItems].sort((a: PainRecord, b: PainRecord) => {
            const first = a[
                sortDescriptor.column as keyof PainRecord
            ] as number;
            const second = b[
                sortDescriptor.column as keyof PainRecord
            ] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === 'descending' ? -cmp : cmp;
        });
    }, [sortDescriptor, filteredItems]);

    const items = useMemo(() => {
        const start = (page - 1) * ROWS_PER_PAGE;
        const end = start + ROWS_PER_PAGE;

        return sortedItems.slice(start, end);
    }, [page, sortedItems, ROWS_PER_PAGE]);

    const onSearchChange = useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue('');
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue('');
        setPage(1);
    }, []);

    const handleDeleteSelected = (selectedKeys: Selection) => {
        if (selectedKeys === 'all') {
            clearRecords()
                .then(() => setPainRecords([]))
                .catch(handleError);
        } else {
            deleteRecords([...selectedKeys.values()])
                .then(() => {
                    getAllRecords().then(setPainRecords).catch(handleError);
                })
                .catch(handleError);
        }

        setSelectedKeys(new Set([]));
    };

    return {
        painRecords,
        filterValue,
        onClear,
        onSearchChange,
        visibleColumns,
        setVisibleColumns,
        hasSearchFilter,
        selectedKeys,
        filteredItems,
        page,
        pages,
        setPage,
        items,
        sortDescriptor,
        setSelectedKeys,
        setSortDescriptor,
        headerColumns,
        isLoading,
        handleDeleteSelected,
        filterValues,
        onChangeFilter,
    };
};
