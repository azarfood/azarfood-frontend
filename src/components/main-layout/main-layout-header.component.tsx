import SecondaryLogo from '@/assets/icons/secondary-logo.svg';

export function MainLayoutHeader() {
  return (
    <header className='sticky top-0 flex h-16 w-full flex-shrink-0 justify-end bg-secondary-100 px-6 py-5'>
      <SecondaryLogo className='h-full w-fit' />
    </header>
  );
}
