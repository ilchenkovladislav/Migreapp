import {
    Button,
    RadioGroup,
    Autocomplete,
    AutocompleteItem,
    Input,
    Textarea,
} from '@nextui-org/react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CustomRadio } from './CustomRadio/CustomRadio.tsx';

interface Medicine {
    value: string;
    label: string;
}

const medicine: Medicine[] = [
    { value: 'Нурофен', label: 'Нурофен' },
    { value: 'Спазмалгон', label: 'Спазмалгон' },
    { value: 'Амигренин', label: 'Амигренин' },
    { value: 'Золмитриптан', label: 'Золмитриптан' },
];

const variants = {
    open: { opacity: 1, height: 'auto', display: 'grid' },
    closed: { opacity: 0, height: 0, transitionEnd: { display: 'none' } },
};

export const CreateForm = () => {
    const [hasPain, setHasPain] = useState<boolean | null>(null);
    const [hasMedicine, setHasMedicine] = useState<boolean | null>(null);

    return (
        <form
            className="px-5 py-10 min-h-[95vh] flex"
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 grow mt-auto">
                <RadioGroup
                    label="У вас болела голова?"
                    orientation="horizontal"
                    size="lg"
                    value={String(hasPain)}
                    onValueChange={(value) => {
                        if (value === 'true') {
                            setHasPain(true);
                        } else {
                            setHasPain(false);
                        }
                    }}
                >
                    <CustomRadio value={'true'}>Да</CustomRadio>
                    <CustomRadio value={'false'}>Нет</CustomRadio>
                </RadioGroup>
                <motion.div
                    className="overflow-hidden grid grid-cols-1 gap-x-6 gap-y-8 grow mt-auto"
                    animate={
                        hasPain === true || hasPain === false
                            ? 'open'
                            : 'closed'
                    }
                    variants={variants}
                >
                    <RadioGroup
                        label="Вы принимали обезболивающие?"
                        orientation="horizontal"
                        size="lg"
                        value={String(hasMedicine)}
                        onValueChange={(value) => {
                            if (value === 'true') {
                                setHasMedicine(true);
                            } else {
                                setHasMedicine(false);
                            }
                        }}
                    >
                        <CustomRadio value={'true'}>Да</CustomRadio>
                        <CustomRadio value={'false'}>Нет</CustomRadio>
                    </RadioGroup>
                </motion.div>

                <motion.div
                    className="overflow-hidden grid grid-cols-1 gap-x-6 gap-y-8 grow mt-auto"
                    animate={hasMedicine ? 'open' : 'closed'}
                    variants={variants}
                >
                    <Autocomplete
                        allowsCustomValue
                        label="Какой препарат?"
                        labelPlacement="outside"
                        placeholder="Введите препарат"
                        defaultItems={medicine}
                        // @ts-ignore
                        size="lg"
                    >
                        {(item) => (
                            <AutocompleteItem key={item.value}>
                                {item.label}
                            </AutocompleteItem>
                        )}
                    </Autocomplete>
                    <Input
                        classNames={{
                            input: 'appearance-none',
                        }}
                        type="number"
                        label="Количество"
                        placeholder="Введите количество"
                        labelPlacement="outside"
                        min={0}
                        size="lg"
                    />

                    <motion.div
                        className="overflow-hidden grid grid-cols-1 gap-x-6 gap-y-8 grow mt-auto"
                        animate={hasPain ? 'open' : 'closed'}
                        variants={variants}
                    >
                        <RadioGroup
                            label="Помогло?"
                            orientation="horizontal"
                            size="lg"
                        >
                            <CustomRadio value={true}>Да</CustomRadio>
                            <CustomRadio value={false}>Нет</CustomRadio>
                        </RadioGroup>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="overflow-hidden grid grid-cols-1 gap-x-6 gap-y-8 grow mt-auto"
                    animate={
                        (hasPain === true || hasPain === false) &&
                        (hasMedicine === true || hasMedicine === false)
                            ? 'open'
                            : 'closed'
                    }
                    variants={variants}
                >
                    <Textarea
                        label="Комментарии"
                        labelPlacement="outside"
                        placeholder="Опишите дополнительную информацию"
                        size="lg"
                    />
                </motion.div>

                <Button
                    color="primary"
                    size="lg"
                    variant="shadow"
                    type="submit"
                >
                    Сохранить
                </Button>
            </div>
        </form>
    );
};
