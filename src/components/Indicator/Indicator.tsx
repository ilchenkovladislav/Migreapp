import cn from 'classnames';
import { twMerge } from 'tailwind-merge';

export type IndicatorColor =
    | 'green'
    | 'red'
    | 'yellow'
    | 'purple'
    | 'blue'
    | 'gray';

type IndicatorProps = {
    variant: IndicatorColor;
};

export const Indicator = ({ variant }: IndicatorProps) => {
    const color = `bg-${variant}-600`;

    return (
        <div
            className={twMerge(
                cn('h-1.5 w-1.5 rounded-full bg-gray-400', {
                    [color]: variant,
                }),
            )}
        />
    );
};
