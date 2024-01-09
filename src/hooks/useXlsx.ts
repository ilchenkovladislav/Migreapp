import { utils, writeFile } from 'xlsx';

import { PainRecord } from '../types/types.ts';

export const useXlsx = () => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const exportFile = (data: PainRecord[]) => {
        const ws = utils.json_to_sheet(data);
        const wb = utils.book_new();
        utils.book_append_sheet(wb, ws, 'Data');
        writeFile(wb, 'ГоловнаяБоль.xlsx');
    };

    return { exportFile };
};
