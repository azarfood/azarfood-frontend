'use client';
import { ls } from './localstorage.service';
import { ss } from './sessionstorage.service';

const get = (key: string): unknown => ls.get(key) ?? ss.get(key);

const set = (key: string, value: unknown, persistent?: boolean): void => {
	if (persistent) {
		ss.remove(key);
		ls.set(key, value);
	} else {
		ls.remove(key);
		ss.set(key, value);
	}
};

const remove = (key: string) => {
	ls.remove(key);
	ss.remove(key);
};
const clearAll = () => {
	ss.clearAll();
	ls.clearAll();
};

export const storage = {
	get,
	set,
	remove,
	clearAll,
};
