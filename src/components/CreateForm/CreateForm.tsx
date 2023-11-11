import { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    RadioGroup,
    Autocomplete,
    AutocompleteItem,
    Input,
    Textarea,
} from '@nextui-org/react';
import { CustomRadio } from './CustomRadio/CustomRadio.tsx';
import { useIndexedDB } from '../../hooks/useIndexedDB.ts';
import { clearState, useHeadacheStore } from './store/store.ts';
import { AnimateBlock } from './AnimateBlock.tsx';

interface Medicine {
    value: string;
    label: string;
}

const medicineOptions: Medicine[] = [
    { value: 'Нурофен 400', label: 'Нурофен 400' },
    { value: 'Суматриптан 50', label: 'Суматриптан 50' },
    { value: 'Спазмалгон', label: 'Спазмалгон' },
    { value: 'Амигренин', label: 'Амигренин' },
    { value: 'Золмитриптан', label: 'Золмитриптан' },
];

export const CreateForm = () => {
    const {
        painRecord,
        setHeadache,
        setTookPainMeds,
        setMenstrual,
        setPainMedsName,
        setPainMedsQuantity,
        setPainMedsHelped,
        setComment,
        setPainRecord,
    } = useHeadacheStore();

    const {
        headache,
        tookPainMeds,
        menstrual,
        painMedsName,
        painMedsQuantity,
        painMedsHelped,
        comment,
    } = painRecord;

    const { addPainRecord } = useIndexedDB();
    const { date } = useParams();
    const navigate = useNavigate();

    const clearForm = () => {
        setPainRecord(clearState);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addPainRecord({ ...painRecord, date });
        clearForm();

        navigate('/Migreapp/');
    };

    return (
        <form
            className="px-5 pt-2 pb-10 min-h-[90vh] flex"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 grow mt-auto gap-y-6">
                <RadioGroup
                    label="У вас болела голова?"
                    orientation="horizontal"
                    size="lg"
                    value={headache}
                    onValueChange={setHeadache}
                >
                    <CustomRadio value={'Да'}>Да</CustomRadio>
                    <CustomRadio value={'Нет'}>Нет</CustomRadio>
                </RadioGroup>
                <AnimateBlock animateCondition={!!headache}>
                    <RadioGroup
                        label="Вы принимали обезболивающие?"
                        orientation="horizontal"
                        size="lg"
                        value={tookPainMeds}
                        onValueChange={setTookPainMeds}
                    >
                        <CustomRadio value={'Да'}>Да</CustomRadio>
                        <CustomRadio value={'Нет'}>Нет</CustomRadio>
                    </RadioGroup>
                </AnimateBlock>

                <AnimateBlock animateCondition={tookPainMeds === 'Да'}>
                    <Autocomplete
                        allowsCustomValue
                        label="Какой препарат?"
                        labelPlacement="outside"
                        placeholder="Введите препарат"
                        defaultItems={medicineOptions}
                        selectedKey={painMedsName}
                        onSelectionChange={setPainMedsName}
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
                        min={1}
                        defaultValue="1"
                        size="lg"
                        value={String(painMedsQuantity)}
                        onValueChange={setPainMedsQuantity}
                    />

                    <AnimateBlock animateCondition={headache === 'Да'}>
                        <RadioGroup
                            label="Помогло?"
                            orientation="horizontal"
                            size="lg"
                            value={painMedsHelped}
                            onValueChange={setPainMedsHelped}
                        >
                            <CustomRadio value={'Да'}>Да</CustomRadio>
                            <CustomRadio value={'Нет'}>Нет</CustomRadio>
                            <CustomRadio value={'Немного'}>Немного</CustomRadio>
                        </RadioGroup>
                    </AnimateBlock>
                </AnimateBlock>

                <AnimateBlock animateCondition={!!headache && !!tookPainMeds}>
                    <RadioGroup
                        label="У вас менструальный цикл?"
                        orientation="horizontal"
                        size="lg"
                        value={menstrual}
                        onValueChange={setMenstrual}
                    >
                        <CustomRadio value={'Да'}>Да</CustomRadio>
                        <CustomRadio value={'Нет'}>Нет</CustomRadio>
                    </RadioGroup>
                    <Textarea
                        label="Комментарии"
                        labelPlacement="outside"
                        placeholder="Опишите дополнительную информацию"
                        size="lg"
                        value={comment}
                        onValueChange={setComment}
                    />
                </AnimateBlock>

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
