import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const variants = {
    open: {
        opacity: 1,
        height: 'auto',
        display: 'grid',
    },
    closed: {
        opacity: 0,
        height: 0,
        transitionEnd: {
            display: 'none',
        },
    },
};

type AnimateBlockProps = {
    children: ReactNode;
    animateCondition: boolean;
};

export const AnimateBlock = ({
    children,
    animateCondition,
}: AnimateBlockProps) => {
    return (
        <motion.div
            className="overflow-hidden hidden grid-cols-1 grow mt-auto gap-x-8 gap-y-6"
            initial={false}
            animate={animateCondition ? 'open' : 'closed'}
            variants={variants}
        >
            {children}
        </motion.div>
    );
};
