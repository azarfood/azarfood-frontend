'use client'
import { button } from 'framer-motion/client'

import Button from '@/components/user-panel/button/button.component'
import PersonalInfo from '@/components/user-panel/personal-info-frame.component'
import { useScopedI18n } from '@/locales/client'

export default function UserPanel(){ 

    const t = useScopedI18n("personal_info")
    
    return(
        <div className="w-[310px] mt-[68px] mx-auto">
            <PersonalInfo />

            <Button iconCode={1} context={t('button.transaction_history')}/>
            <Button iconCode={2} context={t('button.order_history')}/>
            <Button iconCode={3} context={t('button.reservation_history')}/>

            <button className='flex flex-row w-full bg-success-100 rounded-lg pr-4 my-4 h-10 drop-shadow-simple-01
                               items-center text-foreground-100 text-[14px]'>
                {t('button.support')}
            </button>
        </div>
    )
}
