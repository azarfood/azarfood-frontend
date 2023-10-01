'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import NotFoundIcon from '@/assets/images/not-found.svg';
import ReversedRadius from '@/assets/images/reversed-radius.svg';
import type { Variants } from 'framer-motion';

const messageVariants = {
	initial: { opacity: 0, y: 50 },
	animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
} satisfies Variants;

export default function NotFound() {
	const t = useTranslations('error');
	return (
		<section className="full-bleed min-h-[100dvh]">
			<ReversedRadius className="absolute left-0 top-0" />
			<ReversedRadius className="absolute bottom-0 right-0 rotate-180" />
			<motion.figure className="flex h-full w-full  flex-col items-center justify-center rounded-[5rem] bg-white">
				<figcaption className="text-5xl font-medium">
					<motion.div
						initial="initial"
						animate="animate"
						variants={messageVariants}
					>
						{t('page_not_found')}
					</motion.div>
				</figcaption>
				<NotFoundIcon />
			</motion.figure>
		</section>
	);
}
