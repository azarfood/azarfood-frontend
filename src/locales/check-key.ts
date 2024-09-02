import { useI18n } from './client';

export const translationKey = ((key: string) => key) as unknown as ReturnType<
  typeof useI18n
>;

export const useUnsafeI18n = useI18n as unknown as () => (t: string) => string;
