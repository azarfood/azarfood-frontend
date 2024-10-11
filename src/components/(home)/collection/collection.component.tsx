'use client';

import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';

import { allCollections } from '@/configs/constants/collectios.constants';
import { useI18n, useScopedI18n } from '@/locales/client';

export default function Collecttion() {
  const t = useI18n();
  const st = useScopedI18n('collection');

  function handleOnClick() {
    console.log('see all');
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  } satisfies Variants;

  // const itemVariants = {
  //   hidden: { opacity: 0, x: -5 }, // Start hidden and moved left by 5px
  //   visible: { opacity: 1, x: 0 }, // Fade in and move to original position
  // } satisfies Variants;

  return (
    <>
      {allCollections.map((item) => (
        <>
          <section className='-ml-5 mb-1 mt-4'>
            <header className='mb-5 flex flex-row items-center justify-between text-center'>
              <p className='type-4-5b'>{st(item)}</p>
              <button
                className='type-3r ml-2 border-b-[1px] border-b-secondary-100 px-[1.5px]'
                onClick={handleOnClick}
              >
                {t('general.all')}
              </button>
            </header>

            <motion.div
              className='flex flex-row gap-5 overflow-y-hidden overflow-x-scroll pb-3 pl-3'
              variants={containerVariants}
            ></motion.div>
          </section>
        </>
      ))}
    </>
  );
}
