import { ChangeEvent } from 'react';
import { read, utils } from 'xlsx';
import { Button } from '@nextui-org/react';

type Xlsx = Record<string, string>;

export const FileUploader = () => {
    const readUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const data = e.target.result;
                const workbook = read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = utils.sheet_to_json<Xlsx>(worksheet);

                const parsedData: any[] = [];

                json.forEach((el) => {
                    const res: string[] = [];
                    const dayData: any = {};

                    const days = Object.entries(el);

                    days.forEach(([key, value]) => {
                        switch (key) {
                            case 'Дата': {
                                dayData.date = value;
                                break;
                            }
                            case 'Головная боль': {
                                dayData.pain = value;
                                break;
                            }
                            case 'Менструальный цикл': {
                                dayData.menstrual = value;
                                break;
                            }
                            case 'Принятые медикаменты': {
                                const arr = value.split(',');
                                if (arr.length > 1) {
                                    const [medicine, didHelp] = arr;
                                    dayData.medicine = medicine;
                                    switch (didHelp.trim().toLowerCase()) {
                                        case 'да':
                                        case 'помогло': {
                                            dayData.didHelp = 'Да';
                                            break;
                                        }
                                        case 'не помогло':
                                        case 'нет': {
                                            dayData.didHelp = 'Нет';
                                            break;
                                        }
                                        case 'немного': {
                                            dayData.didHelp = 'Немного';
                                            break;
                                        }
                                    }
                                } else {
                                    dayData.medicine = value;
                                }
                                break;
                            }
                            case 'Время': {
                                break;
                            }
                            default: {
                                res.push(`${key}: ${value}`);
                            }
                        }
                    });

                    const comment = res.join(';\n');
                    if (comment) {
                        dayData.comment = comment;
                    }
                    parsedData.push(dayData);
                });
            };
            reader.readAsArrayBuffer(e.target.files[0]);
        }
    };

    return (
        <form>
            <label htmlFor="uploader">
                <Button as="div">Импорт</Button>
                <input
                    type="file"
                    id="uploader"
                    className="hidden"
                    accept=".xlsx"
                    onChange={readUploadFile}
                />
            </label>
        </form>
    );
};
