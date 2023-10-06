'use client';

import { AUTH_TOKEN_STORAGE_KEY } from '@/configs/constants';
import { ls } from '@/services/localstorage.service';
import { type PropsWithChildren, useEffect } from 'react';
import { setUser } from '../redux/slices/user-slice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useIsHydrated } from '@/hooks/use-is-hydrated';
import { useRouter } from 'next/navigation';

export const AuthGuard = ({ children }: PropsWithChildren) => {
	const isHydrated = useIsHydrated();
	const router = useRouter();
	const user = useAppSelector(state => state.user.user);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (isHydrated && !user) {
			const access_token = ls.get(AUTH_TOKEN_STORAGE_KEY);
			if (typeof access_token === 'string') {
				dispatch(setUser({ access_token }));
				return;
			}
			router.push('/login');
		}
	}, [isHydrated, router, user, dispatch]);
	if (!isHydrated) {
		return null;
	}
	if (user) {
		return children;
	} else {
		return null;
	}
};
