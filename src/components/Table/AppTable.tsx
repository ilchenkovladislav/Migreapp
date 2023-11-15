import { useMemo, useCallback, Key } from 'react';
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
    Spinner,
} from '@nextui-org/react';
import { columns } from './data';
import { formatDate } from '../../utils/calendarUtils.ts';
import { HiChevronDown } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { useAppTable } from './useAppTable.ts';
import { PainRecord } from '../../types/types.ts';

export default function AppTable() {
    const {
        page,
        pages,
        setPage,
        onSearchChange,
        hasSearchFilter,
        filteredItems,
        filterValue,
        onClear,
        painRecords,
        visibleColumns,
        setVisibleColumns,
        selectedKeys,
        setSelectedKeys,
        items,
        sortDescriptor,
        setSortDescriptor,
        headerColumns,
        isLoading,
        handleDeleteSelected,
    } = useAppTable();

    const renderCell = useCallback((record: PainRecord, columnKey: Key) => {
        const cellValue = record[columnKey as keyof PainRecord];

        switch (columnKey) {
            case 'date':
                return <div>{formatDate(cellValue as string)}</div>;
            case 'imported':
                return <div>{cellValue ? 'Да' : null}</div>;
            default:
                return cellValue;
        }
    }, []);

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between sm:gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Поиск по дате..."
                        startContent={<BiSearch />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">
                        Всего записей: {painRecords.length}
                    </span>

                    {(selectedKeys === 'all' || selectedKeys.size > 0) && (
                        <Button
                            color="primary"
                            onClick={() => handleDeleteSelected(selectedKeys)}
                        >
                            Удалить
                        </Button>
                    )}

                    <Dropdown>
                        <DropdownTrigger className="flex">
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
                                    {column.name}
                                </DropdownItem>
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        );
    }, [
        filterValue,
        visibleColumns,
        onSearchChange,
        painRecords.length,
        hasSearchFilter,
        selectedKeys,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div>
                <p className="text-small text-center text-default-400">
                    {selectedKeys === 'all'
                        ? 'Выбраны все записи'
                        : `${selectedKeys.size} из ${filteredItems.length} выбрано`}
                </p>
                {pages > 0 ? (
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
                ) : null}
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <Table
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
                wrapper: 'max-h-[500px]',
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
                isLoading={isLoading}
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
