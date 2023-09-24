import { wordDictionary } from '@/configs/word-dictionary';

export function translate(...words: Array<unknown>) {
	return words
		.map(String)
		.map(word => wordDictionary[word] ?? word)
		.join(' ');
}
