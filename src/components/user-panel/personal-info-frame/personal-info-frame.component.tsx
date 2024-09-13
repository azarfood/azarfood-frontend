'use client'
import { useQuery } from '@tanstack/react-query'

import NationalCode from'@/assets/icons/user-panel/credit-card.svg'
import User from '@/assets/icons/user-panel/user.svg'
import UserCircle from '@/assets/icons/user-panel/user-circle.svg'
import MaleAvatar from '@/assets/images/avatars/male.svg'
import Information from '@/components/user-panel/information/information.component'
import { useScopedI18n } from '@/locales/client'
import { UserService } from '@/services/user/user.service'

export default function PersonalInfo(){

    const t = useScopedI18n("personal_info")   //we have only access to personal info, not other datas

    const { isPending, isError, data } = useQuery({
        queryKey: ['/user/me'],
        queryFn: UserService.getMe,
      });

    if (isPending) {
        return <></>
      }
    if (isError) {
        return <div>error</div>;
      }

    const name = data.result.first_name + data.result.last_name 

    return(
      <div className='bg-foreground-100 w-full rounded-lg border-2 border-primary-100
                      drop-shadow-simple text-center text-xs text-secondary-100 mb-3'>

        <MaleAvatar className='h-[123px] w-[123px] rounded-full mx-auto mt-8 drop-shadow-md'/>
      
        <p className='text-base mt-4'>دانشجو</p>
        
        <hr className='border-primary-80 h-px mx-6 my-6 rounded-xl'></hr>

        <Information icon = {<User className='w-5 h-5 mt-1'/>} 
                     title= {t('fullname')} 
                     value = {name}/>

        <Information icon = {<UserCircle className='w-5 h-5 mt-1 '/>} 
                     title= {t('username')} 
                     value = {data.result.student_id}/>

        <Information icon = {<NationalCode className='w-5 h-5 mt-1 '/>} 
                     title= {t('national_code')}
                     value = {data.result.national_code}/>

        <button className='bg-foreground-100 w-full h-7 rounded-b-[6px] border-t-2 border-t-primary-100
                             duration-100
                           active:bg-primary-100 active:text-foreground-100'>
          {t('change_password')}
        </button>

      </div>
    )

}
