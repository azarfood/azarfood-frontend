'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { CartFood } from '@/components/(cart)/cart-food/cart-food.component';
import { CartUndo } from '@/components/(cart)/cart-undo/cart-undo.component';
import { Button } from '@/components/button/button.component';
import { useScopedI18n } from '@/locales/client';
import { useCart } from '@/stores/providers/cart-provider/cart-provider';

export default function BlankPage() {
  const { cart } = useCart();
  const router = useRouter();
  const st = useScopedI18n('cart');
  return (
    <main className='flex h-full flex-col pb-4'>
      <div className='type-sb mt-4 flex items-center rounded-lg bg-secondary-100 text-foreground-100'>
        <span className='px-3'>{st('cart')}</span>
        <Button
          className='dark mr-auto bg-transparent shadow-none'
          onClick={router.back}
        >
          <ArrowLeftIcon />
        </Button>
      </div>
      <ul className='grid grid-cols-2 gap-x-9 gap-y-7 pt-4'>
        <AnimatePresence mode='popLayout'>
          {cart.map((item) => (
            <motion.li
              exit={{
                opacity: 0,
              }}
              layout
              key={item.food.id}
            >
              <CartFood cartItem={item} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <CartUndo />
      {cart.length !== 0 && (
        <div className='mt-auto pt-7'>
          <Button className='dark w-full bg-success-100 text-foreground-100'>
            {st('confirm')}
          </Button>
        </div>
      )}
    </main>
  );
}
