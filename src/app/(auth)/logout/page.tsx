'use client';
import { AUTH_TOKEN_STORAGE_KEY } from '@/configs/constants';
import { deleteUser } from '@/store/redux/slices/user-slice';
import { storage } from '@/services/storage.service';
import { useAppDispatch } from '@/store/redux/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
	const dispatch = useAppDispatch();
	const router = useRouter();
	useEffect(() => {
		if (window) {
			storage.remove(AUTH_TOKEN_STORAGE_KEY);
			dispatch(deleteUser());
			router.replace('/login');
		}
	}, [dispatch, router]);

	return null;
}
