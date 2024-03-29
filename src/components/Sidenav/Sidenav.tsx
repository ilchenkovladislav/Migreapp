import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@nextui-org/react';
import { Fragment } from 'react';
import { RxCross2 } from 'react-icons/rx';

import { useXlsx } from '../../hooks/useXlsx.ts';
import { useAppStore } from '../../store/store.ts';
import { FileUploader } from '../FileUploader/FileUploader.tsx';
import { ThemeSwitcher } from '../ThemeSwitcher/ThemeSwitcher.tsx';

type SidenavProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

export function Sidenav({ open, setOpen }: SidenavProps) {
    const { painRecords } = useAppStore();
    const { exportFile } = useXlsx();

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-[21]" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-[250px]">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-500"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                            <button
                                                type="button"
                                                className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                onClick={() => setOpen(false)}
                                            >
                                                <span className="absolute -inset-2.5" />
                                                <span className="sr-only">
                                                    Close panel
                                                </span>
                                                <RxCross2
                                                    className="h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex h-full flex-col overflow-y-scroll bg-background py-6 shadow-xl">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="text-base text-center font-semibold leading-6 text-foreground">
                                                Синоним красоты и стиля
                                            </Dialog.Title>
                                        </div>
                                        <div className="relative mt-6 flex-1 px-4 sm:px-6 flex flex-col">
                                            <FileUploader />
                                            <Button
                                                className="mt-2"
                                                radius="sm"
                                                onClick={() =>
                                                    exportFile(painRecords)
                                                }
                                            >
                                                Экспорт
                                            </Button>
                                            <ThemeSwitcher className="mt-auto self-end" />
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
