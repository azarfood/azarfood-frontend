'use client';

import { useTranslations } from 'next-intl';
import NotFoundIcon from '@/assets/images/not-found.svg';
import ReversedRadius from '@/assets/images/reversed-radius.svg';

export default function NotFound() {
	const t = useTranslations('error');
	return (
		<section className="full-bleed min-h-[100dvh]">
			<ReversedRadius className="absolute left-0 top-0" />
			<ReversedRadius className="absolute bottom-0 right-0 rotate-180" />
			<figure className="flex h-full w-full  flex-col items-center justify-center rounded-[5rem] bg-white">
				<figcaption className="text-5xl font-medium">
					{t('page_not_found')}
				</figcaption>
				<NotFoundIcon />
			</figure>
		</section>
	);
}
