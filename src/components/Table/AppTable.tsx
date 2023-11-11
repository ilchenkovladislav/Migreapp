import { useState, useMemo, useCallback, useEffect, Key } from 'react';
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Button,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Pagination,
    Selection,
    SortDescriptor,
    Spinner,
} from '@nextui-org/react';
import { columns } from './data';
import { useIndexedDB } from '../../hooks/useIndexedDB.ts';
import { formatDate, PainRecord } from '../../utils/calendarUtils.ts';
import { HiChevronDown } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

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

export default function AppTable() {
    const [painRecords, usePainRecords] = useState<PainRecord[]>([]);
    const { getAllRecords } = useIndexedDB();

    useEffect(() => {
        getAllRecords().then(usePainRecords);
    }, []);

    const [filterValue, setFilterValue] = useState('');
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState<Selection>(
        new Set(INITIAL_VISIBLE_COLUMNS),
    );
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: 'date',
        direction: 'ascending',
    });

    const [page, setPage] = useState(1);

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = useMemo(() => {
        if (visibleColumns === 'all') return columns;

        return columns.filter((column) =>
            Array.from(visibleColumns).includes(column.uid),
        );
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredRecords = [...painRecords];

        if (hasSearchFilter) {
            filteredRecords = filteredRecords.filter((record) => {
                if (record.date) {
                    return formatDate(record.date).includes(filterValue);
                }
            });
        }

        return filteredRecords;
    }, [painRecords, filterValue]);

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

    const renderCell = useCallback((record: PainRecord, columnKey: Key) => {
        const cellValue = record[columnKey as keyof PainRecord];

        switch (columnKey) {
            case 'date':
                return <div>{formatDate(cellValue as string)}</div>;
            case 'actions':
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button size="sm" variant="light">
                                    Иконка
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>View</DropdownItem>
                                <DropdownItem>Edit</DropdownItem>
                                <DropdownItem>Delete</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

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

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Поиск по дате..."
                        startContent={<BiSearch />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button
                                    endContent={<HiChevronDown />}
                                    variant="flat"
                                >
                                    Колонки
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem
                                        key={column.uid}
                                        className="capitalize"
                                    >
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Всего записей: {painRecords.length}
                    </span>
                </div>
            </div>
        );
    }, [
        filterValue,
        visibleColumns,
        onSearchChange,
        painRecords.length,
        hasSearchFilter,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div>
                <p className="text-small text-center text-default-400">
                    {selectedKeys === 'all'
                        ? 'Выбраны все записи'
                        : `${selectedKeys.size} из ${filteredItems.length} выбрано`}
                </p>
                <div className="py-2 px-2 flex justify-center items-center">
                    <Pagination
                        isCompact
                        showControls
                        showShadow
                        color="primary"
                        page={page}
                        total={pages}
                        onChange={setPage}
                    />
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: 'max-h-[550px]',
                base: 'px-4',
            }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === 'actions' ? 'center' : 'start'}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                emptyContent={'Нет записей'}
                items={items}
                isLoading={!items.length}
                loadingContent={<Spinner label="Загрузка..." />}
            >
                {(item) => (
                    <TableRow key={item.id}>
                        {(columnKey) => (
                            //@ts-ignore
                            <TableCell>{renderCell(item, columnKey)}</TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
