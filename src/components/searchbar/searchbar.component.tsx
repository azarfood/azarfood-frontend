'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Search from '@/assets/icons/search.svg';
import { useScopedI18n } from '@/locales/client';
import { cn } from '@/utils/cn';

export default function Searchbar() {
  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const t = useScopedI18n('searchbar');
  const router = useRouter();
  useEffect(() => {
    setSearch(searchParams.get('search') ?? '');
  }, [searchParams]);

  return (
    <form
      className={cn(
        'relative mt-6 flex flex-row items-center overflow-hidden rounded-lg bg-transparent shadow-sm transition hover:shadow-simple-02',
      )}
      onSubmit={(e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams);
        params.set('search', search);
        router.push('/search-result?' + params.toString());
      }}
    >
      <input
        className='peer type-3-5r h-10 w-full rounded-lg border-[1.5px] border-primary-40 bg-transparent pl-11 pr-3 text-secondary-80 outline-none transition focus:border-primary-100'
        type='text'
        placeholder={t('what_you_want')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      ></input>

      <button
        type='button'
        className={cn(
          'pointer-events-none absolute left-0 top-1/2 ml-3 size-6 -translate-y-1/2 opacity-40 transition peer-focus:opacity-100',
        )}
      >
        <Search />
      </button>
    </form>
  );
}
