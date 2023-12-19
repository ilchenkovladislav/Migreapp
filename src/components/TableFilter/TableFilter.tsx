import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@nextui-org/react';

type TableFilterProps = {
    filter: any;
    selectedOptions: any;
    onChange: (obj: any) => void;
};

export const TableFilter = (props: TableFilterProps) => {
    const { filter, selectedOptions, onChange } = props;

    const onOptionChange = (keys) => {
        onChange({ keys, filter });
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button variant="bordered" className="capitalize">
                    {filter.name}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Multiple selection example"
                variant="flat"
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={selectedOptions}
                onSelectionChange={onOptionChange}
            >
                {filter.options.map((option) => {
                    return <DropdownItem key={option}>{option}</DropdownItem>;
                })}
                <DropdownItem key="none">—</DropdownItem>;
            </DropdownMenu>
        </Dropdown>
    );
};
