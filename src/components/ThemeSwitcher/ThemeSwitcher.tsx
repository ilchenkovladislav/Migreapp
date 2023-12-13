import { useTheme } from 'next-themes';
import { Switch } from '@nextui-org/react';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

type ThemeSwitcherProps = {
    className?: string;
};

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { theme, setTheme } = useTheme();

    return (
        <Switch
            className={className}
            startContent={<BsSunFill />}
            endContent={<BsMoonFill />}
            isSelected={theme === 'light'}
            size="md"
            onValueChange={(isSelected) => {
                isSelected ? setTheme('light') : setTheme('dark');
            }}
        ></Switch>
    );
};
