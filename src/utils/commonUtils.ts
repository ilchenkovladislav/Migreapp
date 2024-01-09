import toast from 'react-hot-toast';

export function handleError(error: unknown) {
    let message = '';
    if (typeof error === 'string') {
        message = error;
    } else if (error instanceof Error) {
        message = error.message;
    }

    toast.error(`Ошибка чтения файла: ${message}`);
}
