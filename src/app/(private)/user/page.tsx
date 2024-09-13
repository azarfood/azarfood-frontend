'use client'

import Calculator from '@/assets/icons/user-panel/calculator.svg'
import Calendar  from '@/assets/icons/user-panel/calendar.svg'
import CalendarDays  from '@/assets/icons/user-panel/calendar-days.svg'
import Button from '@/components/user-panel/button/button.component'
import PersonalInfo from '@/components/user-panel/personal-info-frame/personal-info-frame.component'
import { useScopedI18n } from '@/locales/client'

export default function UserPanel(){ 

    const t = useScopedI18n("personal_info")

    return(
        <div className="w-[310px] mt-12 mx-auto">
            <PersonalInfo />

            <Button icon={<Calculator className='size-5 mr-3'/>}
                    context={t('button.transaction_history')}/>

            <Button icon={<Calendar className='size-5 mr-3'/>}
                    context={t('button.order_history')}/>

            <Button icon={<CalendarDays className='size-5 mr-3'/>}
                    context={t('button.reservation_history')}/>

            <button className='flex flex-row w-full bg-success-100 rounded-lg pr-4 my-4 h-10 drop-shadow-simple-01
                               items-center text-foreground-100 text-[14px]'>
                {t('button.support')}
            </button>
        </div>
    )
}
