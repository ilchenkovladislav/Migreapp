import { useEffect, useState } from 'react';
import { Key } from '@react-types/shared';
import { CalendarDay } from '../../../types/types.ts';

export const useAccordion = (selectedDay: CalendarDay) => {
    const [selectedKeys, setSelectedKeys] = useState<'all' | Set<Key>>(
        new Set([]),
    );

    useEffect(() => {
        setSelectedKeys(new Set([]));
    }, [selectedDay]);

    return { selectedKeys, setSelectedKeys };
};
