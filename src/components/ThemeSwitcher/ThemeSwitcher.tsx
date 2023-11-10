import { useTheme } from 'next-themes';
import { Switch } from '@nextui-org/react';
import { BsSunFill, BsMoonFill } from 'react-icons/bs';

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <Switch
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
