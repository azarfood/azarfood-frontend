'use client';

const get = (key: string): unknown => {
	try {
		const item: unknown = sessionStorage.getItem(key);
		if (typeof item === 'string') return JSON.parse(item);
	} catch (error) {
		return undefined;
	}
};

const set = (key: string, value: unknown): void => {
	try {
		sessionStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		return undefined;
	}
};

const remove = (key: string) => {
	sessionStorage.removeItem(key);
};
const clearAll = () => {
	sessionStorage.clear();
};

export const ss = {
	get,
	set,
	remove,
	clearAll,
};
