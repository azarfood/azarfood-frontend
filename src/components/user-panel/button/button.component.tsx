export interface ButtonProps{
    icon: React.ReactNode,
    context: string
}

export default function Button({icon , context}: ButtonProps){
    
    return(
        <button className='flex flex-row w-full bg-primary-100 rounded-lg my-4 h-10 drop-shadow-simple-01
                           items-center text-foreground-100 text-[14px] gap-2'>
            {icon}
            <p>{context}</p>                     
        </button>
    )
}