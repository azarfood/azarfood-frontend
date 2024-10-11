import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import SpinnerIcon from '@/assets/icons/spinner.svg';
import { usePrevious } from '@/hooks/use-previous';
import { useScopedI18n } from '@/locales/client';
import { useCart } from '@/stores/providers/cart-provider/cart-provider';

const buttonVariants = {
  enter: { opacity: 1 },
  exit: { opacity: 0 },
} satisfies Variants;

export function CartUndo() {
  const { cartCanUndoDeleteItem, cartUndoDeleteItem, cartCleareDeleteHistory } =
    useCart();
  const prevCanUndo = usePrevious(cartCanUndoDeleteItem, [
    cartCanUndoDeleteItem,
  ]);
  const [timer, setTimer] = useState(0);
  const st = useScopedI18n('cart');

  useEffect(() => {
    if (prevCanUndo !== cartCanUndoDeleteItem && cartCanUndoDeleteItem) {
      setTimer(5);
    } else if (timer > 0) {
      const timeout = setTimeout(() => setTimer((prev) => prev - 1), 1000);

      return () => clearTimeout(timeout);
    } else {
      cartCleareDeleteHistory();
    }
  }, [timer, cartCleareDeleteHistory, prevCanUndo, cartCanUndoDeleteItem]);
  return (
    <AnimatePresence>
      {cartCanUndoDeleteItem && (
        <motion.button
          className='fixed bottom-14 left-1/2 z-10 flex h-8 -translate-x-1/2 items-center gap-2 rounded-lg bg-secondary-60 px-2 text-foreground-100 shadow-lg'
          onClick={cartUndoDeleteItem}
          variants={buttonVariants}
          initial='exit'
          exit='exit'
          animate='enter'
        >
          <div>{st('undo')}</div>
          <div className='relative flex size-[22px] translate-y-0.5'>
            <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px]'>
              {timer}
            </div>
            <SpinnerIcon
              className='absolute inset-0 -translate-y-0.5'
              width={22}
              height={22}
            />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
