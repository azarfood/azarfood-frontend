import HalfStar from '@/assets/icons/half-star.svg';
import Star from '@/assets/icons/star.svg';

interface RatingGroupProps {
  rate: string;
}
export default function RatingGroup(props: RatingGroupProps) {
  const rating = Number(props.rate);
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={i} className='size-[10px]' />);
  }

  if (hasHalfStar) {
    stars.push(<HalfStar key={fullStars} />);
  }

  return <div className='flex flex-row justify-center'>{stars}</div>;
}
