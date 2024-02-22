import type {EntryGenerator} from './$types';

export const entries: EntryGenerator = async () => {
	return [{slug: 'root'}, {slug: 'root/link'}];
};
