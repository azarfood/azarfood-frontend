import dayjs from 'dayjs';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

import { Button } from '@/components/button/button.component';
import { SelectInput } from '@/components/select-input/select-input.component';
import { useI18n } from '@/locales/client';
import { useCart } from '@/stores/providers/cart-provider/cart-provider';
import { cn } from '@/utils/cn';

const addToCartVariants = {
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
} satisfies Variants;

const deliveryTimes = [
  { value: '11:45-12:30' },
  { value: '12:30-13:15' },
  { value: '13:15-14:00' },
  { value: '19:00-19:45' },
  { value: '19:45-20:30' },
  { value: '20:30-21:30' },
];

export interface AddToCartModalProps {
  onClose?(): void;
}
export function AddToCartModal({ onClose }: AddToCartModalProps) {
  const router = useRouter();
  const { cartMoveToReceipt, receipts } = useCart();
  const t = useI18n();
  const dates = useMemo(() => {
    const now = dayjs(new Date());
    return Array.from({ length: 5 }, (_, index) => {
      const date = now.add(index, 'day');
      return {
        value: date.toISOString(),
        title: date.format('ddd YYYY/MM/DD'),
      };
    });
  }, []);

  const [date, setDate] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');

  function submitReceipt() {
    cartMoveToReceipt({
      date,
      delivery_time: deliveryTime,
      delivery_location: deliveryLocation,
      id: (+(receipts.at(-1)?.id ?? 0) + 1).toString(),
    });
    router.push('/cart/receipt');
    onClose?.();
  }

  return (
    <motion.div
      className={cn(
        'fixed inset-0 z-20 flex items-center justify-center bg-secondary-20 backdrop-blur-sm',
      )}
      variants={addToCartVariants}
      initial='exit'
      exit='exit'
      animate='enter'
    >
      <button className='absolute inset-0' onClick={onClose}></button>
      <div className='relative flex flex-col items-center gap-2 rounded-lg bg-foreground-100 p-4'>
        <div className='flex gap-8'>
          <div className='flex gap-1'>
            <label>{t('receipts.date')}</label>
            <SelectInput onChange={(e) => setDate(e.target.value)}>
              {dates.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </SelectInput>
          </div>
          <div className='flex gap-1'>
            <label>{t('receipts.delivery_time')}</label>
            <SelectInput onChange={(e) => setDeliveryTime(e.target.value)}>
              {deliveryTimes.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.value}
                </option>
              ))}
            </SelectInput>
          </div>
        </div>
        <div className='mb-4 ml-auto flex gap-1'>
          <label>{t('receipts.delivery_place')}</label>
          <SelectInput onChange={(e) => setDeliveryLocation(e.target.value)}>
            <option value='olum_paye'>
              {t('delivery_locations.olum_paye')}
            </option>
            <option value='adabiat'>{t('delivery_locations.adabiat')}</option>
          </SelectInput>
        </div>
        <Button
          onClick={submitReceipt}
          className='dark mt-auto w-full bg-success-100 text-foreground-100'
        >
          {t('receipts.confirm')}
        </Button>
      </div>
    </motion.div>
  );
}
