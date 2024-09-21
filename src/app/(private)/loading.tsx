import SpinnerIcon from '@/assets/icons/spinner.svg';

export default function PrivatePageLoading() {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <SpinnerIcon className='mx-auto animate-spin fill-secondary-100' />
    </div>
  );
}
