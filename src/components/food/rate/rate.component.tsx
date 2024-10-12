import Star from '@/assets/icons/star-2.svg';
import { cn } from '@/utils/cn';

export interface RateProps {
  rate: string;
  className?: string;
}

export default function Rate(props: RateProps) {
  return (
    <div
      className='mr-auto mt-[2px] flex flex-row gap-[2px] self-end'
      dir='ltr'
    >
      <p className='type-3r text-secondary-60'>{props.rate}</p>
      <Star className={cn('mt-[1px] text-star-100', props.className)} />
    </div>
  );
}
