import type { useTranslations } from 'next-intl';

export const translateKey = <NameSpace extends keyof IntlMessages>(
	key: Parameters<ReturnType<typeof useTranslations<NameSpace>>>[0],
) => key;
