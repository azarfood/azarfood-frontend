import Image from 'next/image';

import Plus from '@/assets/icons/plus.svg';
import { Button } from '@/components/button/button.component';
import Discount from '@/components/food/discount/discount.component';
import Rate from '@/components/food/rate/rate.component';
import { useI18n } from '@/locales/client';
import type { FoodDto } from '@/services/food/dtos/food.dto';

export default function Food(params: FoodDto) {
  const t = useI18n();

  let finalPrice = params.price;

  function handleParentOnClick(id: string) {
    console.log(`parent ${id}`);
  }

  function handleChildOnClick(id: string) {
    console.log(`child ${id}`);
  }

  if (params.discount) {
    finalPrice = params.price - (params.discount * params.price) / 100;
  }

  return (
    <button
      id={params.id}
      className='min-w-40 max-w-40 items-center rounded-lg border border-secondary-40 bg-foreground-100 px-3 py-2 text-center shadow-simple-02'
      onClick={() => handleParentOnClick(params.id)}
    >
      <p className='type-3r text-secondary-60'>{params.restaurant.name}</p>
      <Image  //todo: ficx the size
        src={params.image_url}
        width={103}
        height={86}
        alt='i'
        className='object-contain mx-auto my-1'
      />

      <div className='mt-2 flex h-auto flex-row items-center text-center'>
        {params.discount && <Discount discount={params.discount} />}
        <Rate rate={params.rating} />
      </div>

      <p className='type-3-5r my-1 text-start text-secondary-100'>
        {params.name}
      </p>

      <div className='mb-[2px] flex min-h-9 flex-row'>
        <div className='text-right'>

          {params.discount && (
            <p className='type-2-5r relative text-secondary-40 mt-1'>
              <hr className='z-100 absolute mt-[6px] w-[60px] -rotate-6 border-error-80'></hr>
              {params.price} {t('general.toman')}
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
            handleChildOnClick(params.id);
          }}
        >
          <Plus className='size-3' />
        </Button>
      </div>
    </button>
  );
}
