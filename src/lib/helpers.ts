// TODO this is just a hacky proof of concept

import {plural} from '@ryanatkn/belt/string.js';

// TODO misses a lot of cases, need a regexp or proper parsing
export const is_path_valid = (p: string): boolean => {
	const parts = p.split('/').filter(Boolean);
	if (!parts.length) return false;
	for (const part of parts) {
		if (!ACTOR_NAME_CHARACTER_MATCHER.test(part)) return false;
	}
	return true;
};

export const is_network_relative_path = (p: string): boolean => {
	if (p[0] !== '/' || p[1] !== '/') return false;
	const p2 = p[2];
	return !!p2 && p2 !== '/';
};
export const is_network_relative_path_valid = (_p: string): boolean => true; // TODO hmm - any chars? escaping?

export const is_host_relative_path = (p: string): boolean => p[0] === '/' && p[1] !== '/';
export const is_host_relative_path_valid = is_path_valid;

/**
 * Same restrictions as Mastodon.
 */
export const ACTOR_NAME_CHARACTER_MATCHER = /^[a-z\d_]+$/iu;
const ACTOR_NAME_MAX_LENGTH = 30;
const ACTOR_NAME_MIN_LENGTH = 1;

/**
 * Checks if a actor name is valid.
 * @param name - A actor name value that may be invalid
 * @returns `null` if valid, otherwise an error message
 */
export const check_actor_name = (name: string): string | null => {
	if (name.length > ACTOR_NAME_MAX_LENGTH) {
		return `name must be no longer than ${ACTOR_NAME_MAX_LENGTH} characters`;
	}
	if (name.length < ACTOR_NAME_MIN_LENGTH) {
		return `name must be at least ${ACTOR_NAME_MIN_LENGTH} character${plural(
			ACTOR_NAME_MIN_LENGTH,
		)}`;
	}
	if (!ACTOR_NAME_CHARACTER_MATCHER.test(name)) {
		return 'name must contain only letters, numbers, and underscores';
	}
	if (name.includes('__')) {
		return 'name must not contain consecutive underscores';
	}
	if (name[0] === '_') {
		return 'name must not start with an underscore';
	}
	if (name[name.length - 1] === '_') {
		return 'name must not end with an underscore';
	}
	return null;
};

export const check_hashtag = (_name: string): string | null => {
	// TODO ?
	return null;
};
