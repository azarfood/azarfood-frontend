import Calculator from '@/assets/icons/user-panel/calculator.svg'

export interface ButtonProps{
    iconCode: number,
    context: string
}

export default function Button({iconCode , context}: ButtonProps){
    
    return(
        <button className='flex flex-row w-full bg-primary-100 rounded-lg my-4 h-10 drop-shadow-simple-01
                           items-center text-foreground-100 text-[14px]'>

            {iconCode === 1 && <>
                              <Calculator className='w-5 h-5 mr-3'/>
                              <p className='mr-2'>{context}</p>
                             </>}

            {iconCode === 2 && <>
                              <Calculator className='w-5 h-5 mr-3'/>
                              <p className='mr-2'>{context}</p>
                             </>}

            {iconCode === 3 && <>
                              <Calculator className='w-5 h-5 mr-3'/>
                              <p className='mr-2'>{context}</p>
                             </>}
        </button>
    )
}