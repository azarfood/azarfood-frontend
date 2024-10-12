'use client';

import { useQueries } from '@tanstack/react-query';
import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import Food from '@/components/food/food.component';
import { allCollections } from '@/configs/constants/collectios.constants';
import { useI18n, useScopedI18n } from '@/locales/client';
import { FoodService } from '@/services/food/food.service';

export default function Collecttion() {
  const t = useI18n();
  const st = useScopedI18n('collection');
  const router = useRouter();

  const data = useQueries({
    queries: allCollections.map((item) => ({
      queryKey: ['/food', item, { short_list: true }],
      queryFn: async () => {
        const response = await FoodService.getFoodSearch({
          collection: item,
          page: 1,
          per_page: 5,
        });
        return response.result;
      },
    })),
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  } satisfies Variants;

  /*const itemVariants = {
    hidden: { opacity: 0, x: -5 }, // Start hidden and moved left by 5px

    visible: { opacity: 1, x: 0 }, // Fade in and move to original position
  } satisfies Variants;*/

  return (
    <>
      {data.map((item, index) => (
        <Fragment key={index}>
          <section className='-ml-5 mb-1 mt-4'>
            <header className='mb-5 flex flex-row items-center justify-between text-center'>
              <p className='type-4-5b'>{st(allCollections[index])}</p>
              <button
                className='type-3r ml-2 border-b-[1px] border-b-secondary-100 px-[1.5px] text-secondary-100 transition hover:border-b-primary-100 hover:text-primary-100 active:border-b-primary-100 active:text-primary-100'
                onClick={() => {
                  router.push(`/${allCollections[index]}`);
                }}
              >
                {t('general.all')}
              </button>
            </header>

            <motion.div
              className='flex flex-row gap-5 overflow-y-hidden overflow-x-scroll pb-3 pl-3'
              variants={containerVariants}
            >
              {item.data?.map((food) => <Food props={food} key={food.id} />)}
            </motion.div>
          </section>
        </Fragment>
      ))}
    </>
  );
}
