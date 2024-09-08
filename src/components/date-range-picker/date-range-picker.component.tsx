import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, CalendarProvider } from 'zaman';
import type {
  CalendarBaseProps,
  CalendarRangeProps,
} from 'zaman/dist/packages/Calendar/Calendar.types';

import { cn } from '@/utils/cn';

const calendarVariants = {
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
} satisfies Variants;

export interface DateRangePickerProps
  extends Omit<CalendarRangeProps, 'range'>,
    CalendarBaseProps {
  show?: boolean;
  onClose?(): void;
}

export function DateRangePicker({
  show,
  onClose,
  onChange,
  className,
  ...rest
}: DateRangePickerProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={cn(
            'fixed inset-0 z-20 flex items-center justify-center bg-secondary-20 backdrop-blur-sm',
            className,
          )}
          variants={calendarVariants}
          initial='exit'
          exit='exit'
          animate='enter'
        >
          <button className='absolute inset-0' onClick={onClose}></button>
          <CalendarProvider locale='fa' round='x1' accentColor='#000022'>
            <Calendar
              className='relative'
              onChange={(e) => {
                onChange?.(e);
                onClose?.();
              }}
              range
              {...rest}
            />
          </CalendarProvider>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
