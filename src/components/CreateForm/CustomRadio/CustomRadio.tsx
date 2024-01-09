import { cn, Radio } from '@nextui-org/react';
import { ReactNode } from 'react';

type CustomRadioProps = {
    children: ReactNode;
    value: string;
    key: string;
};

export const CustomRadio = (props: CustomRadioProps) => {
    const { children, ...otherProps } = props;

    return (
        <Radio
            {...otherProps}
            classNames={{
                base: cn(
                    'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
                    'flex-row-reverse max-w-[400px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
                    'data-[selected=true]:border-primary grow',
                ),
            }}
        >
            {children}
        </Radio>
    );
};
