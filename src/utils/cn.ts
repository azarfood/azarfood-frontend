import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-family': [
        'type-2r',
        'type-2-5r',
        'type-3r',
        'type-3-5r',
        'type-4r',
        'type-5r',
        'type-6r',
        'type-3m',
        'type-3-5m',
        'type-4m',
        'type-3sb',
        'type-sb',
        'type-4-5b',
        'type-h1',
        'type-h2',
        'type-h3',
        'type-h4',
        'type-h5',
        'type-h6',
        'type-body',
        'type-control',
        'type-footnote',
        'type-control-label',
      ],
    },
  },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
