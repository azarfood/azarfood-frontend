'use client';

import { useState } from 'react';

import { useScopedI18n } from '@/locales/client';
import type { OrderHistoryDto } from '@/services/user/dtos/order-history.dto';
import { cn } from '@/utils/cn';

import { FoodRow } from './food-row.component';

export interface FoodTableProps {
  orders: OrderHistoryDto[];
  className?: string;
}
export function FoodTable({ orders, className }: FoodTableProps) {
  const [openRow, setOpenRow] = useState('');
  const t = useScopedI18n('order_history');
  return (
    <section className={cn('type-4r flex flex-col gap-2', className)}>
      <header className='flex justify-between border-b border-secondary-100 px-4 pb-3 pl-6 text-center'>
        <div className='flex-1'>{t('order_code')}</div>
        <div className='flex-1'>{t('order_date')}</div>
        <div className='flex-1'>{t('day')}</div>
        <div className='flex-1'>{t('price')}</div>
      </header>
      {orders.map((order) => (
        <FoodRow
          order={order}
          toggleIsOpen={(shouldOpen) => setOpenRow(shouldOpen ? order.id : '')}
          isOpen={openRow === order.id}
          key={order.id}
        />
      ))}
    </section>
  );
}
