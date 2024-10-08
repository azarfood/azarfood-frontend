'use client';

import dayjs from 'dayjs';
import type { Variants } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';
import { type PropsWithChildren } from 'react';

import ChevronDownIcon from '@/assets/icons/chevron-down.svg';
import SeparatorTriangle from '@/assets/icons/food-history/separator-triangle.svg';
import { Button } from '@/components/button/button.component';
import { useScopedI18n } from '@/locales/client';
import type { OrderHistoryDto } from '@/services/user/dtos/order-history.dto';
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
const chevronVariants = {
  up: {
    rotate: 180,
    y: '-50%',
    transition: { type: 'tween' },
  },
  down: {
    rotate: 0,
    y: '-50%',
    transition: { type: 'tween' },
  },
  initial: {},
};

export interface FoodRowProps extends PropsWithChildren {
  isOpen?: boolean;
  toggleIsOpen(open: boolean): void;
  order: OrderHistoryDto;
}

// TODO: implement reserve cancelation
export function FoodRow({ order, isOpen, toggleIsOpen }: FoodRowProps) {
  const canCancelReserve = order.status === 'reserved'; // we should also check the time range
  const t = useScopedI18n('order_history');

  const date = dayjs(order.date);
  const values = [
    { value: order.id },
    { value: date.format('YYYY/MM/DD') },
    { value: date.format('ddd') },
    { value: priceFormatter.format(+order.total_cost) },
  ];

  return (
    <>
      <motion.div
        data-status={order.status}
        className='type-3r relative min-h-10 overflow-hidden rounded-lg border border-solid border-transparent bg-success-5 transition data-[active=true]:border-success-100 data-[status=canceled]:data-[active=true]:border-error-100 data-[status=reserved]:data-[active=true]:border-transparent data-[status=canceled]:bg-error-5 data-[status=reserved]:bg-secondary-5'
        data-active={isOpen}
      >
        <motion.div
          animate={isOpen ? 'up' : 'down'}
          variants={chevronVariants}
          initial={false}
          className='pointer-events-none absolute left-3 top-5 -translate-y-1/2'
        >
          <ChevronDownIcon
            className='text-secondary-40 transition data-[active=true]:text-secondary-100'
            data-active={isOpen}
          />
        </motion.div>
        <button
          onClick={() => toggleIsOpen(!isOpen)}
          className='flex min-h-10 w-full items-center pl-6 pr-4'
        >
          {values.map(({ value }) => (
            <div key={value} className='flex-1 text-center'>
              {value}
            </div>
          ))}
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className='flex flex-col px-2'
              variants={foodRowVariants}
              exit='exit'
              animate='enter'
              initial={['exit', 'initial']}
            >
              <motion.div
                variants={separatorLineVariants}
                className='flex h-[1px] items-center bg-secondary-100'
              >
                <SeparatorTriangle />
              </motion.div>
              <div className='pl-3 pr-1'>
                <motion.table
                  variants={innerTableVariants}
                  className='mt-5 w-full text-center'
                >
                  <tbody>
                    {order.orderProducts.map((product, index) => (
                      <tr key={index}>
                        <td className='px-2'>{index + 1}</td>
                        <td className='px-2 text-right'>{product.name}</td>
                        <td className='px-2'>
                          {priceFormatter.format(+product.cost)}
                        </td>
                        <td className='px-2'>x{product.count}</td>
                        <td className='px-2'>
                          {priceFormatter.format(product.count * +product.cost)}
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
                    <span className='block flex-1'>{t('total_sum')}:</span>
                    <span className='block flex-1'>
                      {priceFormatter.format(
                        order.orderProducts.reduce(
                          (sum, product) => sum + +product.cost * product.count,
                          0,
                        ),
                      )}
                    </span>
                  </div>

                  <div className='py-2'>
                    {t('total_price')}:{' '}
                    <span className='rounded bg-primary-60 px-3 text-foreground-100'>
                      {priceFormatter.format(+order.total_cost)}
                    </span>{' '}
                    {t('currency_toman')}
                  </div>
                  {canCancelReserve && (
                    <div className='mr-auto pb-2'>
                      <Button
                        onClick={(e) => e.stopPropagation()}
                        className='!type-3r min-h-0 rounded bg-error-100 text-foreground-100'
                      >
                        {t('cancel_reservation')}
                      </Button>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
