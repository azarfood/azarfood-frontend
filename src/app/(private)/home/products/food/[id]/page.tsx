'use client';
import { useRouter } from 'next/navigation';

import AddIcon from '@/assets/icons/add.svg';
import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import StarIcon from '@/assets/icons/star.svg';
import { Button } from '@/components/button/button.component';
import { useScopedI18n } from '@/locales/client';
import { priceFormatter } from '@/utils/price-formatter';

export default function FoodDetailPage() {
  const st = useScopedI18n('food_detail');
  const router = useRouter();
  return (
    <main className='text-secondary-100'>
      <div className='type-sb mt-4 flex items-center rounded-lg bg-primary-100 text-foreground-100'>
        <span className='px-3'>{st('food_detail')}</span>
        <Button
          className='dark mr-auto bg-transparent shadow-none'
          onClick={router.back}
        >
          <ArrowLeftIcon />
        </Button>
      </div>
      <section className='mt-8 flex flex-col'>
        <header className='flex justify-between'>
          <div>
            <h1 className='type-6r text-secondary-100'>pitza makhlut</h1>
            <p className='type-3r text-secondary-60'>resturane berke</p>
            <p className='type-3r flex items-center gap-1 text-secondary-60'>
              <StarIcon />
              <span>3.4</span>
            </p>
          </div>
          <div className='flex items-start'>
            <button className='type-4r flex items-center gap-1 text-secondary-100'>
              <div className='flex size-6 items-center justify-center rounded-full bg-success-100'>
                <AddIcon />
              </div>
              <span>{st('add_to_cart')}</span>
            </button>
          </div>
        </header>
        <figure className='mx-auto -mt-6 aspect-square w-full max-w-[288px] rounded-full bg-secondary-100'></figure>
        <div className='type-3r mt-5'>
          {st('price')} {priceFormatter.format(114000)} {st('unit_toman')}
        </div>

        <div className='type-3r mt-4 w-full rounded-lg px-[10px] py-2 shadow shadow-primary-20'>
          <h2 className='border-b border-b-primary-80 pb-2'>
            {st('ingredients')}
          </h2>
          <p className='pt-4 text-secondary-60'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut, odio!
          </p>
        </div>
      </section>
    </main>
  );
}
