import { Indicator, IndicatorColor } from '../Indicator/Indicator.tsx';

type IndicatorListProps = {
    indicatorColors: IndicatorColor[];
};

export const IndicatorList = ({ indicatorColors }: IndicatorListProps) => {
    return (
        <span className="mt-auto flex flex-wrap-reverse gap-1">
            {indicatorColors.map((color, index) => {
                return <Indicator variant={color} key={index} />;
            })}
        </span>
    );
};
