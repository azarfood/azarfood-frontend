import HalfStar from '@/assets/icons/half-star.svg';
import Star from '@/assets/icons/star.svg';

interface RatingGroupProps {
  rate: string;
}
export default function RatingGroup(_props: RatingGroupProps) {
  return (
    <div className='flex flex-row justify-center'>
      <Star className='size-[10px]' />
      <Star className='size-[10px]' />
      <Star className='size-[10px]' />
      <HalfStar />
    </div>
  );
}
