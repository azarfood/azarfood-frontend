'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import CartIcon from '@/assets/icons/cart.svg';
import HomeIcon from '@/assets/icons/home.svg';
import UserProfileIcon from '@/assets/icons/user-profile.svg';
import { Button } from '@/components/button/button.component';

const footerRoutes = [
  {
    icon: UserProfileIcon,
    href: '/user',
  },
  {
    icon: HomeIcon,
    href: '/',
  },
  {
    icon: CartIcon,
    href: '/cart',
  },
];

export function MainLayoutFooter() {
  const pathname = usePathname();
  const barePathName = pathname.split('?')[0];
  const isOnRoot = barePathName === '/';
  return (
    <footer className='flex h-12 w-full flex-shrink-0 items-center justify-around bg-secondary-100'>
      {footerRoutes.map((route) => (
        <Link href={route.href} key={route.href}>
          <Button
            className='shadown-none dark h-10 min-h-0 w-10 rounded-full bg-transparent p-0 transition data-[active=true]:text-primary-100'
            data-active={
              route.href === '/'
                ? isOnRoot
                : barePathName.startsWith(route.href)
            }
          >
            <route.icon className='' />
          </Button>
        </Link>
      ))}
    </footer>
  );
}
