import { ReduxProvider } from './redux-provider';
import { Toaster } from 'react-hot-toast';
import React from 'react';
import type { PropsWithChildren } from 'react';

export const Providers = ({ children }: PropsWithChildren) => (
	<>
		<ReduxProvider>{children}</ReduxProvider>
		<Toaster />
	</>
);
