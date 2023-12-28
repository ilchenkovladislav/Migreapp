import { Key } from '@react-types/shared';
import { useEffect, useState } from 'react';

import { Day } from '../../../types/types.ts';

export const useAccordion = (selectedDay: Day) => {
    const [selectedKeys, setSelectedKeys] = useState<'all' | Set<Key>>(
        new Set([]),
    );

    useEffect(() => {
        setSelectedKeys(new Set([]));
    }, [selectedDay]);

    return { selectedKeys, setSelectedKeys };
};
