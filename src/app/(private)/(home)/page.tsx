'use client';
import { useQuery } from '@tanstack/react-query';

import { useI18n } from '@/locales/client';
import { UserService } from '@/services/user/user.service';

export default function Home() {
  const t = useI18n();

  const { isLoading, isError, data } = useQuery({
    queryKey: ['todos'],
    queryFn: UserService.getMe,
  });

  if (isLoading) {
    return <div>loading...</div>;
  }
  if (isError || !data) {
    return <div>error</div>;
  }

  return (
    <main className='flex h-full w-full items-center justify-center gap-4'>
      <div className='text-secondary-100'>
        {t('hello', {
          first_name: data.result.first_name,
          last_name: data.result.last_name,
        })}
      </div>
      <span className='block h-fit w-fit -rotate-90 text-primary-100'>:-)</span>
    </main>
  );
}
