import {
    Button,
    RadioGroup,
    Autocomplete,
    AutocompleteItem,
    Input,
    Textarea,
} from '@nextui-org/react';
import { CustomRadio } from './CustomRadio/CustomRadio.tsx';
import { useHeadacheStore } from './store/store.ts';
import { AnimateBlock } from './AnimateBlock.tsx';
import {
    HeadacheVariants,
    MenstrualVariants,
    PainMedsHelpedVariants,
    TookPainMedsVariants,
    Variants,
    medicineOption,
} from './types/radioOptions.ts';
import { useCreateForm } from './hooks/useCreateForm.ts';

const medicineOptions: medicineOption[] = [
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

    const { handleSubmit } = useCreateForm();

    const renderRadioOptions = (variants: Variants) => {
        return Object.values(variants).map((value) => (
            <CustomRadio key={value} value={value}>
                {value}
            </CustomRadio>
        ));
    };

    return (
        <form
            className="px-5 pt-2 pb-20 min-h-[90vh] flex"
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
                    {renderRadioOptions(HeadacheVariants)}
                </RadioGroup>
                <AnimateBlock animateCondition={!!headache}>
                    <RadioGroup
                        label="Вы принимали обезболивающие?"
                        orientation="horizontal"
                        size="lg"
                        value={tookPainMeds}
                        onValueChange={setTookPainMeds}
                    >
                        {renderRadioOptions(TookPainMedsVariants)}
                    </RadioGroup>
                </AnimateBlock>

                <AnimateBlock
                    animateCondition={tookPainMeds === TookPainMedsVariants.Yes}
                >
                    <Autocomplete
                        allowsCustomValue
                        label="Какой препарат?"
                        labelPlacement="outside"
                        placeholder="Введите препарат"
                        defaultItems={medicineOptions}
                        selectedKey={painMedsName}
                        onSelectionChange={setPainMedsName}
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

                    <AnimateBlock
                        animateCondition={headache === HeadacheVariants.Yes}
                    >
                        <RadioGroup
                            label="Помогло?"
                            orientation="horizontal"
                            size="lg"
                            value={painMedsHelped}
                            onValueChange={setPainMedsHelped}
                        >
                            {renderRadioOptions(PainMedsHelpedVariants)}
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
                        {renderRadioOptions(MenstrualVariants)}
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
