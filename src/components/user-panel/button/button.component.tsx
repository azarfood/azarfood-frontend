'use client'

import type { ComponentProps } from 'react'

import { useRipple } from '@/hooks/use-ripple'
import { cn } from '@/utils/cn';

export interface ButtonProps extends ComponentProps<'button'>{
    icon?: React.ReactNode,
    context: string,
}

export default function Button({icon , context , className}: ButtonProps){

    const { onMouseDown, ripples } = useRipple();

    return(
        <button className={cn('dark flex flex-row w-full bg-primary-100 rounded-lg my-4 h-10 drop-shadow-simple-01 items-center text-foreground-100 text-[14px] gap-2 overflow-hidden relative',
                               className)}
                onMouseDown={onMouseDown}>

            {icon}
            <p className='pointer-events-none'>{context}</p>    
            {ripples}
        </button>
    )
}