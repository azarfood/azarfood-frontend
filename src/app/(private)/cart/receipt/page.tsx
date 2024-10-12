'use client';
import dayjs from 'dayjs';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { type PropsWithChildren, useMemo } from 'react';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import SeparatorTriangle from '@/assets/icons/food-history/separator-triangle.svg';
import PayAllIcon from '@/assets/icons/pay-all.svg';
import TrashIcon from '@/assets/icons/trash.svg';
import { Button } from '@/components/button/button.component';
import { SelectInput } from '@/components/select-input/select-input.component';
import { useI18n, useScopedI18n } from '@/locales/client';
import { useCart } from '@/stores/providers/cart-provider/cart-provider';
import type { ReceiptItem } from '@/stores/providers/cart-provider/cart-provider.types';
import { priceFormatter } from '@/utils/price-formatter';

const foodRowVariants = {
  exit: {
    height: 0,
  },
  enter: {
    height: 'auto',
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
} satisfies Variants;
const separatorLineVariants = {
  exit: { opacity: 0, x: 40, transition: { duration: 0.1 } },
  enter: { opacity: 1, x: 0, transition: { duration: 0.1 } },
} satisfies Variants;
const innerTableVariants = {
  exit: {
    opacity: 0,
    y: 5,
  },
  enter: {
    opacity: 1,
    y: 1,
  },
  initial: {
    y: -5,
  },
} satisfies Variants;

const deliveryTimes = [
  { value: '11:45-12:30' },
  { value: '12:30-13:15' },
  { value: '13:15-14:00' },
  { value: '19:00-19:45' },
  { value: '19:45-20:30' },
  { value: '20:30-21:30' },
];
export interface FoodRowProps extends PropsWithChildren {
  receipt: ReceiptItem;
}

function Receipt({ receipt }: FoodRowProps) {
  const t = useI18n();
  const { receiptDeleteItem } = useCart();

  const totalCost = priceFormatter.format(
    +receipt.products.reduce((a, b) => a + +b.food.price, 0),
  );
  const { receiptUpdateItem } = useCart();
  const dates = useMemo(() => {
    const now = dayjs(new Date()).startOf('day');
    return Array.from({ length: 5 }, (_, index) => {
      const date = now.add(index, 'day');
      return {
        value: date.toISOString(),
        title: date.format('ddd YYYY/MM/DD'),
      };
    });
  }, []);

  return (
    <>
      <motion.div
        className='flex flex-col rounded-lg bg-secondary-5 px-2 shadow-simple-02'
        variants={foodRowVariants}
        exit='exit'
        animate='enter'
        initial={['exit', 'initial']}
      >
        <div className='pl-3 pr-1'>
          <motion.table
            variants={innerTableVariants}
            className='mt-5 w-full text-center'
          >
            <tbody>
              {receipt.products.map((product, index) => (
                <tr key={index}>
                  <td className='px-2'>{index + 1}</td>
                  <td className='px-2 text-right'>{product.food.name}</td>
                  <td className='px-2'>
                    {priceFormatter.format(+product.food.price)}
                  </td>
                  <td className='px-2'>x{product.count}</td>
                  <td className='px-2'>
                    {priceFormatter.format(product.count * +product.food.price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </motion.table>
          <motion.div
            variants={separatorLineVariants}
            className='mt-2 flex h-[1px] items-center bg-secondary-40'
          ></motion.div>
          <motion.div
            variants={innerTableVariants}
            className='flex flex-col pb-2'
          >
            <div className='mr-auto flex w-1/2 justify-between pt-1 text-center'>
              <span className='block flex-1'>
                {t('order_history.total_sum')}:
              </span>
              <span className='block flex-1'>
                {priceFormatter.format(
                  receipt.products.reduce(
                    (sum, product) => sum + +product.food.price * product.count,
                    0,
                  ),
                )}
              </span>
            </div>

            <div className='py-2'>
              {t('order_history.total_price')}:{' '}
              <span className='rounded bg-primary-60 px-3 text-foreground-100'>
                {totalCost}
              </span>{' '}
              {t('order_history.currency_toman')}
            </div>
          </motion.div>
        </div>
        <motion.div
          variants={separatorLineVariants}
          className='flex h-[1px] items-center bg-secondary-100'
        >
          <SeparatorTriangle />
        </motion.div>
        <div className='flex flex-col gap-2 py-2'>
          <div className='flex gap-1'>
            <label>{t('receipts.date')}</label>
            <SelectInput
              onChange={(e) =>
                receiptUpdateItem(receipt.id, { date: e.target.value })
              }
              value={receipt.date}
            >
              {dates.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.title}
                </option>
              ))}
            </SelectInput>
          </div>
          <div className='flex gap-1'>
            <label>{t('receipts.delivery_time')}</label>
            <SelectInput
              onChange={(e) =>
                receiptUpdateItem(receipt.id, { delivery_time: e.target.value })
              }
              value={receipt.delivery_time}
            >
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
          <SelectInput
            onChange={(e) =>
              receiptUpdateItem(receipt.id, {
                delivery_location: e.target.value,
              })
            }
            value={receipt.delivery_location}
          >
            <option value='olum_paye'>
              {t('delivery_locations.olum_paye')}
            </option>
            <option value='olum_adabiat'>
              {t('delivery_locations.adabiat')}
            </option>
          </SelectInput>
        </div>
        <div className='ml-2 mr-auto flex gap-2 pb-4 pt-4'>
          <Button className='h-[27px] min-h-0 w-[70px] rounded bg-success-100 px-1 py-0'>
            {t('receipts.pay')}
          </Button>
          <Button
            onClick={() => receiptDeleteItem(receipt.id)}
            className='h-[27px] min-h-0 w-[70px] rounded bg-error-100 px-1 py-0'
          >
            {t('general.delete')}
          </Button>
        </div>
      </motion.div>
    </>
  );
}
export default function ReceiptPage() {
  const { receipts, receiptDeleteAll } = useCart();
  const router = useRouter();
  const st = useScopedI18n('receipts');

  return (
    <main>
      <div className='type-sb mt-4 flex items-center rounded-lg bg-secondary-100 text-foreground-100'>
        <span className='px-3'>{st('receipts')}</span>
        <Button
          className='dark mr-auto bg-transparent shadow-none'
          onClick={router.back}
        >
          <ArrowLeftIcon />
        </Button>
      </div>
      {receipts.length !== 0 && (
        <div className='flex gap-2 pb-4 pt-4'>
          <Button className='h-[27px] min-h-0 rounded bg-success-100 px-2 py-0'>
            <PayAllIcon className='ml-2' />
            {st('pay_all')}
          </Button>
          <Button
            onClick={receiptDeleteAll}
            className='h-[27px] min-h-0 rounded bg-error-100 px-2 py-0'
          >
            <TrashIcon className='ml-2' />
            {st('delete_all')}
          </Button>
        </div>
      )}
      <div className='flex flex-col gap-4 pb-4'>
        {receipts.map((receipt) => (
          <Receipt receipt={receipt} key={receipt.id} />
        ))}
      </div>
    </main>
  );
}
