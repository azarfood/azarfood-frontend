'use client';

import { cn } from '@/utils/cn';
import { shadowTransitions } from '@/configs/constants';
import { useRipple } from '@/hooks/use-ripple';
import type { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {}

export function Button({ children, className, ...rest }: ButtonProps) {
	const { onMouseDown, ripples } = useRipple();
	return (
		<button
			className={cn(
				'relative overflow-hidden rounded bg-white p-3 font-semibold text-black outline-none disabled:cursor-not-allowed',
				shadowTransitions,
				className,
			)}
			onMouseDown={onMouseDown}
			{...rest}
		>
			{children}
			{ripples}
		</button>
	);
}
