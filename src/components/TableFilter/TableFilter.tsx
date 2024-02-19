import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';

import { Filter } from '../Table/data.ts';
import { FilterOption } from '../Table/useAppTable.ts';

type TableFilterProps = {
    filter: Filter;
    selectedOptions: 'all' | Set<number | string> | undefined;
    onChange: (object: FilterOption) => void;
};

export const TableFilter = (props: TableFilterProps) => {
    const { filter, selectedOptions, onChange } = props;

    const onOptionChange = (keys: 'all' | Set<number | string> | undefined) => {
        onChange({ keys, filter });
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="light" className="border-1">
                    {filter.name}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Multiple selection example"
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={selectedOptions}
                onSelectionChange={onOptionChange}
            >
                {filter.options.map((option) => {
                    return <DropdownItem key={option}>{option}</DropdownItem>;
                })}
                <DropdownItem key="none">—</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};
