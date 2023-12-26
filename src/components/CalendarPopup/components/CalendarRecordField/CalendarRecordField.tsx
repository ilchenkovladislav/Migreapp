type CalendarRecordFieldProps = {
    title: string;
    value: string | number | null | undefined;
};

export const CalendarRecordField = (props: CalendarRecordFieldProps) => {
    const { title, value } = props;

    return (
        <p>
            {title}:{' '}
            <span className="font-semibold dark:text-gray-100">{value}</span>
        </p>
    );
};
