import Image from 'next/image';
import { useRouter } from 'next/navigation';

import AltRestaurant from '@/assets/images/alts/restaurant.png';
import { cn } from '@/utils/cn';

import RatingGroup from './rating-group/rating-group.component';

interface RestaurantProps {
  id: string;
  name: string;
  rating?: string;
  image: string;
  className?: string;
}
export default function Restaurant(props: RestaurantProps) {
  const router = useRouter();

  return (
    <button
      id={props.id}
      className={cn(
        'min-w-40 max-w-40 rounded-lg border border-secondary-40 bg-foreground-100 py-3 shadow-simple-02',
        props.className,
      )}
      onClick={() => router.push(`/products/restaurant/${props.id}`)}
    >
      <Image
        className='mx-auto'
        src={AltRestaurant}
        width={80}
        height={75}
        alt=''
      />
      <p className='type-4sb text-secondary-100 my-1 overflow-hidden whitespace-nowrap text-ellipsis'>{props.name}</p>

      <div className='min-h-[10px]'>{props.rating && <RatingGroup rate={props.rating} />}</div>
    </button>
  );
}
