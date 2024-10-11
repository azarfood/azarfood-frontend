'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Plus from '@/assets/icons/plus.svg';
import { Button } from '@/components/button/button.component';
import Discount from '@/components/discount/discount.component';
import Rate from '@/components/food/rate/rate.component';
import { useI18n } from '@/locales/client';
import type { FoodDto } from '@/services/food/dtos/food.dto';
import { cn } from '@/utils/cn';

interface FoodProps extends FoodDto {
  className?: string;
}

export default function Food(props: FoodProps) {
  const t = useI18n();
  const router = useRouter();

  let finalPrice = props.price;

  function handleChildOnClick(id: string) {
    console.log(`child ${id}`);
  }

  if (props.discount) {
    finalPrice = props.price - (props.discount * props.price) / 100;
  }

  return (
    <button
      id={props.id}
      className={cn(
        'max-h-[224px] min-w-40 max-w-40 items-center rounded-lg border border-secondary-40 bg-foreground-100 px-3 py-2 text-center shadow-simple-02',
         props.className,
      )}
      onClick={() => router.push(`/products/food/${props.id}`)}
    >
      <button
        className='type-3r text-secondary-60'
        onClick={(event) => {
          event.stopPropagation();
          router.push(`/products/restaurant/${props.restaurant.id}`);
        }}
      ></button>
      <Image //todo: fix the size
        src={props.image}
        width={103}
        height={86}
        alt='i'
        className='mx-auto my-1 object-contain'
      />

      <div className='mt-2 flex h-auto flex-row items-center text-center'>
        {props.discount && <Discount discount={props.discount} />}
        <Rate rate={props.rating} />
      </div>

      <p className='type-3-5r my-1 text-start text-secondary-100'>
        {props.name}
      </p>

      <div className='mb-[2px] flex min-h-9 flex-row'>
        <div className='text-right'>
          {props.discount && (
            <p className='type-2-5r relative mt-1 text-secondary-40'>
              <hr className='z-100 absolute mt-[6px] w-[60px] -rotate-6 border-error-80'></hr>
              {props.price} {t('general.toman')}
            </p>
          )}

          <p className='type-3r text-secondary-60'>
            {finalPrice} {t('general.toman')}
          </p>
        </div>

        <Button
          className='dark mr-auto size-[26px] min-h-0 self-end rounded bg-success-100 p-0 shadow-none transition'
          onClick={(event) => {
            event.stopPropagation();
            handleChildOnClick(props.id);
          }}
        >
          <Plus className='size-3' />
        </Button>
      </div>
    </button>
  );
}
