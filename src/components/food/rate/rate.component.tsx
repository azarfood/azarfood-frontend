import Star from '@/assets/icons/star.svg';

export interface RateProps {
  rate: number;
}

export default function Rate(params: RateProps) {
  return (
    <div
      className='mr-auto mt-[2px] flex flex-row gap-[2px] self-end'
      dir='ltr'
    >
      <p className='type-3r text-secondary-60'>{params.rate}</p>
      <Star className='mt-[1px]' />
    </div>
  );
}
