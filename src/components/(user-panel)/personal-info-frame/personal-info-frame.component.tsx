'use client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import SpinnerIcon from '@/assets/icons/spinner.svg';
import NationalCode from '@/assets/icons/user-panel/credit-card.svg';
import User from '@/assets/icons/user-panel/user.svg';
import UserCircle from '@/assets/icons/user-panel/user-circle.svg';
import MaleAvatar from '@/assets/images/avatars/male.svg';
import ChangePassword from '@/components/(user-panel)/change-password/change-password.component';
import Information from '@/components/(user-panel)/information/information.component';
import { useScopedI18n } from '@/locales/client';
import { UserService } from '@/services/user/user.service';

export default function PersonalInfo() {
  const t = useScopedI18n('personal_info'); //we have only access to personal info, not other datas

  const [showChangePassword, setShowChangePassword] = useState(false);

  const { isPending, isError, data } = useQuery({
    queryKey: ['/user/me'],
    queryFn: UserService.getMe,
  });

  if (isPending) {
    return (
      <div className='mb-3 h-[419.43px] w-full rounded-lg border-2 border-primary-100 bg-foreground-100 text-center text-xs text-secondary-100 shadow-simple'>
        <div className='flex h-full w-full items-center justify-center'>
          <SpinnerIcon className='mx-auto animate-spin fill-primary-20' />
        </div>
      </div>
    );
  }

  if (isError) {
    return <div>error</div>;
  }

  const name = data.result.first_name + data.result.last_name;

  return (
    <>
    <div className='mb-3 w-full rounded-lg border-2 border-primary-100 bg-foreground-100 text-center text-xs text-secondary-100 shadow-simple'>
      <MaleAvatar className='mx-auto mt-8 h-[123px] w-[123px] rounded-full drop-shadow-md' />

      <p className='mt-4 text-base'>{t('student')}</p>

      <hr className='mx-6 my-6 h-px rounded-xl border-primary-80'></hr>

      <Information
        icon={<User className='mt-1 h-5 w-5' />}
        title={t('fullname')}
        value={name}
      />

      <Information
        icon={<UserCircle className='mt-1 h-5 w-5' />}
        title={t('username')}
        value={data.result.student_id}
      />

      <Information
        icon={<NationalCode className='mt-1 h-5 w-5' />}
        title={t('national_code')}
        value={data.result.national_code}
      />

      <button
        className='h-7 w-full rounded-b-[6px] border-t-2 border-t-primary-100 bg-foreground-100 duration-100 active:bg-primary-100 active:text-foreground-100'
        onClick={() => setShowChangePassword(true)}
      >
        {t('change_password')}
      </button>
    </div>
    
    <ChangePassword show={showChangePassword}
                      onClose={() => setShowChangePassword(false)}/>
    </>
  );
}
