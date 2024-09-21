'use client';

import Search from '@/assets/icons/search.svg';
import { useScopedI18n } from '@/locales/client';
import { cn } from '@/utils/cn';

export default function Searchbar() {
  const t = useScopedI18n('searchbar');

  return (
    <div
      className={cn(
        'relative mt-6 flex flex-row items-center overflow-hidden rounded-lg shadow-sm transition hover:shadow-simple-02',
      )}
    >
      <input
        className='peer type-3-5r h-10 w-full pl-11 rounded-lg border-[1.5px] border-primary-40 pr-3 text-secondary-80 outline-none transition focus:border-primary-100'
        type='text'
        placeholder={t('what_you_want')}
      ></input>

      <button className={cn(
            'pointer-events-none absolute left-0 top-1/2 ml-3 size-6 -translate-y-1/2 opacity-40 transition peer-focus:opacity-100',
          )}>
        <Search/>
      </button>
    </div>
  );
}
