import { LayoutGroup, motion } from 'framer-motion';

import type { ButtonProps } from '@/components/button/button.component';
import { Button } from '@/components/button/button.component';
import { cn } from '@/utils/cn';

interface ButtonItem extends ButtonProps {
  isActive: boolean;
}

interface ButtonGroupProps {
  items: ButtonItem[];
  className?: string;
}

export function ButtonGroup({ className, items }: ButtonGroupProps) {
  return (
    <LayoutGroup>
      <div className={cn('flex rounded bg-secondary-60 shadow', className)}>
        {items.map(({ className, isActive, children, ...rest }, index) => (
          <Button
            key={index}
            className={cn(
              'dark type-control min-h-6 overflow-visible rounded bg-transparent px-2 shadow-none',
              className,
            )}
            {...rest}
          >
            {isActive && (
              <motion.div
                className='absolute inset-0 rounded bg-secondary-100'
                layoutId='filter-highlight'
              ></motion.div>
            )}
            <div className='relative inset-0 z-10'>{children}</div>
          </Button>
        ))}
      </div>
    </LayoutGroup>
  );
}
