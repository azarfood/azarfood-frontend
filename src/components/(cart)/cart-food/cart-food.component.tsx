import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import AddIcon from '@/assets/icons/add.svg';
import MinusIcon from '@/assets/icons/minus.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import { Button } from '@/components/button/button.component';
import { useI18n } from '@/locales/client';
import { useCart } from '@/stores/providers/cart-provider/cart-provider';
import type { CartItem } from '@/stores/providers/cart-provider/cart-provider.types';
import { imageToUrl } from '@/utils/image-to-url';
import { priceFormatter } from '@/utils/price-formatter';

import { CartCounter } from '../cart-counter/cart-counter.component';

export interface CartFoodProps {
  cartItem: CartItem;
}
export function CartFood({ cartItem }: CartFoodProps) {
  const t = useI18n();
  const dragX = useMotionValue(0);
  const [isDragFinished, setIsDragFinished] = useState(true);
  const [isDeleting, setIsDeleting] = useState(true);
  const trashScale = useMotionValue(1);
  const trashScaleSpring = useSpring(trashScale);
  const trashWidth = useTransform(dragX, (latest) => {
    if (!isDragFinished) {
      const tmp = latest > 30;
      if (tmp !== isDeleting) {
        setIsDeleting(tmp);
      }
    }
    if (isDeleting) {
      trashScale.set(1);
    } else if (latest < 30) {
      trashScale.set(Math.max((latest - 15) / 20, 0));
    }
    return Math.max(latest, 0);
  });
  const trashOpacity = useTransform(dragX, [0, 30], [0, 1]);
  const food = cartItem.food;
  const { cartChangeFoodCount, cartDeleteItem } = useCart();

  return (
    <div className='relative overflow-hidden rounded-lg shadow-sm'>
      <motion.div
        drag='x'
        dragConstraints={{
          right: 0,
          left: 0,
        }}
        dragElastic={{
          right: 0.5,
        }}
        style={{ x: dragX }}
        onDragStart={() => setIsDragFinished(false)}
        onDragEnd={() => {
          setIsDragFinished(true);
          if (isDeleting) {
            cartDeleteItem(food.id);
          }
        }}
        className='flex w-full cursor-grab flex-col items-center bg-secondary-5 py-3 pb-2 text-secondary-60 active:cursor-grabbing'
      >
        <figure className='relative size-[86px]'>
          <Image
            src={imageToUrl(food.image)}
            className='object-contain'
            fill
            alt={food.name}
          />
        </figure>
        <h2 className='type-3-5r mt-2 text-secondary-100'>{food.name}</h2>
        <p className='type-3r'>{food.restaurant.name}</p>
        <p className='type-3r'>
          {priceFormatter.format(+food.price)} {t('food_detail.unit_toman')}
        </p>
        <div className='flex items-center gap-3 pt-2'>
          <Button
            onClick={() => cartChangeFoodCount(food.id, cartItem.count + 1)}
            className='dark size-[26px] min-h-0 border border-secondary-100 bg-foreground-100 p-0 text-secondary-100 shadow-none transition hover:bg-secondary-100 hover:text-foreground-100'
          >
            <AddIcon />
          </Button>
          <CartCounter value={cartItem.count} />
          <Button
            onClick={() => cartChangeFoodCount(food.id, cartItem.count - 1)}
            className='dark size-[26px] min-h-0 border border-secondary-100 bg-foreground-100 p-0 text-secondary-100 shadow-none transition hover:bg-secondary-100 hover:text-foreground-100'
          >
            <MinusIcon />
          </Button>
        </div>
      </motion.div>
      <motion.div
        style={{
          width: trashWidth,
          opacity: trashOpacity,
        }}
        className='absolute left-0 top-0 flex h-full flex-col items-center justify-center bg-error-100'
      >
        <motion.div
          style={{
            scale: trashScaleSpring,
            opacity: trashOpacity,
          }}
          className='flex h-full min-w-0 items-center justify-center'
        >
          <TrashIcon />
        </motion.div>
      </motion.div>
    </div>
  );
}
