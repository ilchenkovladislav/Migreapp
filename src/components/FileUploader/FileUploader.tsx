import { Button } from '@nextui-org/react';
import { useFileUploader } from './useFileUploader/useFileUploader.ts';

export const FileUploader = () => {
    const { readUploadFile } = useFileUploader();

    return (
        <form className="">
            <label htmlFor="uploader">
                <Button as="div" variant="bordered">
                    Импорт
                </Button>
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
