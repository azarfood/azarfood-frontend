'use client';

import { AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { type ComponentProps, forwardRef, useId } from 'react';
import { motion } from 'framer-motion';
import { shadowTransitions } from '@/configs/constants';

interface TextFieldProps extends ComponentProps<'input'> {
	title?: string;
	error?: string;
	isTouched?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	function TextField({ className, id, title, error, isTouched, ...rest }, ref) {
		const generatedId = useId();
		const inputId = id ?? generatedId;
		const isTitleProvided = typeof title !== 'undefined';
		const isValid = !error;
		return (
			<div className="group flex flex-col" data-valid={isValid}>
				{isTitleProvided && (
					<label className="mb-2 font-semibold" htmlFor={inputId}>
						{title}
					</label>
				)}
				<div className="relative">
					<input
						ref={ref}
						id={inputId}
						type="text"
						className={cn(
							'w-full rounded bg-[#f0f0f0] p-2 outline-none',
							shadowTransitions,
							className,
						)}
						{...rest}
					/>
					<AnimatePresence>
						{isTouched && (
							<motion.div
								className="pointer-events-none absolute left-0 top-0 h-full w-3
                        rounded-l bg-red-700 transition group-data-[valid=true]:bg-green-700"
							/>
						)}
					</AnimatePresence>
				</div>
			</div>
		);
	},
);
