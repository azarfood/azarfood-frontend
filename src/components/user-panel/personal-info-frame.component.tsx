'use client'
import { useQuery } from '@tanstack/react-query'

import NationalCode from'@/assets/icons/user-panel/credit-card.svg'
import User from '@/assets/icons/user-panel/user.svg'
import UserCircle from '@/assets/icons/user-panel/user-circle.svg'
import MaleAvatar from '@/assets/images/avatars/male.svg'
import { useScopedI18n } from '@/locales/client'
import { UserService } from '@/services/user/user.service'

export default function PersonalInfo(){

    const t = useScopedI18n("personal_info")   //we have only access to personal info, not other datas

    const { isPending, isError, data } = useQuery({
        queryKey: ['/user/me'],
        queryFn: UserService.getMe,
      });
    
    if (isPending) {
        return <div className='m-auto'>...loading</div>
      }
    if (isError) {
        return <div>error</div>;
      }

    return(
      <div className='bg-foreground-100 w-full rounded-lg border-2 border-primary-100
                      drop-shadow-3xl text-center'>

        <MaleAvatar className='h-[123px] w-[123px] rounded-full mx-auto mt-8 drop-shadow-md'/>
        <p className='text-base mt-4'>دانشجو</p>
        
        <hr className='border-primary-80 h-px mx-6 mt-8 rounded-xl'></hr>

        <div className='flex flex-row mx-5 mt-5'>
          <User className='w-5 h-5 mt-1 text-secondary-100'/>

          <div className='mr-2 text-xs text-right'>
            <p>{t('fullname')}</p>
            <p>{data.result.first_name} {data.result.last_name}</p>
          </div>
        </div>


        <div className='flex flex-row mx-5 mt-4'>
          <UserCircle className='w-5 h-5 mt-1 text-secondary-100'/>
  
          <div className='mr-2 text-xs text-right'>
            <p>{t('username')}</p>
            <p>{data.result.student_id}</p>
          </div>
        </div>


        <div className='flex flex-row mx-5 my-4 text-secondary-100'>
          <NationalCode className='w-5 h-5 mt-1'/>
    
          <div className='mr-2 text-xs text-right'>
            <p>{t('national_code')}</p>
            <p>{data.result.national_code}</p>
          </div>
        </div>

        <button className='bg-foreground-100 w-full text-xs h-7 rounded-b-[6px] border-t-2 border-t-primary-100
                             duration-150
                           active:bg-primary-100 active:text-foreground-100'>
          {t('change_password')}
        </button>

      </div>
    )

}
