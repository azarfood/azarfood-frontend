'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { AddToCartModal } from '@/components/(cart)/add-to-cart-modal/add-to-cart-modal.component';
import { CartFood } from '@/components/(cart)/cart-food/cart-food.component';
import { CartUndo } from '@/components/(cart)/cart-undo/cart-undo.component';
import { Button } from '@/components/button/button.component';
import { useScopedI18n } from '@/locales/client';
import { useCart } from '@/stores/providers/cart-provider/cart-provider';

export default function BlankPage() {
  const { cart } = useCart();
  const router = useRouter();
  const st = useScopedI18n('cart');
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      <AnimatePresence>
        {isModalOpen && (
          <AddToCartModal onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
      <div className='mt-auto pb-4 pt-4'>
        <Button
          onClick={() =>
            cart.length !== 0 ? setIsModalOpen(true) : router.push('/receipt')
          }
          className='dark w-full bg-success-100 text-foreground-100'
        >
          {st('confirm')}
        </Button>
      </div>
    </main>
  );
}
