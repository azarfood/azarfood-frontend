import { useRouter } from 'next/navigation';

import ArrowLeftIcon from '@/assets/icons/arrow-left.svg';
import { Button } from '@/components/button/button.component';
import { cn } from '@/utils/cn';

interface HeadingProps {
  className?: string;
  children: React.ReactNode;
}

export default function Heading({ className, children }: HeadingProps) {
  const router = useRouter();
  return (
    <div
      className={cn(
        'type-sb mt-4 flex items-center rounded-lg bg-secondary-100 text-foreground-100',
        className,
      )}
    >
      <span className='px-3'>{children}</span>
      <Button
        className='dark mr-auto bg-transparent shadow-none'
        onClick={router.back}
      >
        <ArrowLeftIcon />
      </Button>
    </div>
  );
}
