import { useScopedI18n } from '@/locales/client';

export interface DiscountProps {
  discount: number;
}

export default function Discount(params: DiscountProps) {
  const t = useScopedI18n('general');

  return (
    <div className='rounded bg-success-80 px-1 pb-[1.5px] pt-[3px]'>
      <p className='type-2r text-foreground-100'>
        {params.discount + '%'} {t('discount')}
      </p>
    </div>
  );
}
