'use client';

import { AUTH_TOKEN_STORAGE_KEY } from '@/configs/constants';
import { type PropsWithChildren, useEffect } from 'react';
import { setUser } from '../redux/slices/user-slice';
import { storage } from '@/services/storage.service';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useIsHydrated } from '@/hooks/use-is-hydrated';
import { useRouter } from 'next/navigation';

export const ReverseAuthGuard = ({ children }: PropsWithChildren) => {
	const isHydrated = useIsHydrated();
	const router = useRouter();
	const user = useAppSelector(state => state.user.user);
	const dispatch = useAppDispatch();
	useEffect(() => {
		if (!isHydrated) return;
		if (!user) {
			const access_token = storage.get(AUTH_TOKEN_STORAGE_KEY);
			if (typeof access_token === 'string') {
				dispatch(setUser({ access_token }));
				return;
			}
		} else {
			router.push('/private');
		}
	}, [isHydrated, router, user, dispatch]);
	return children;
};
