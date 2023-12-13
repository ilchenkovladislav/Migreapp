import { utils, writeFile } from 'xlsx';

export const useXlsx = () => {
    const exportFile = (data: any) => {
        const ws = utils.json_to_sheet(data);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Data');
        writeFile(wb, 'ГоловнаяБоль.xlsx');
    };

    return { exportFile };
};
