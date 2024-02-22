// TODO this is just a hacky proof of concept

import {walk} from 'estree-walker';

import {parse_markdown} from '$lib/parse_markdown.js';
import type {Svelte_Tag, Text} from '$lib/markdown.js';
import {
	is_host_relative_path,
	is_host_relative_path_valid,
	is_network_relative_path,
	is_network_relative_path_valid,
	check_actor_name,
	check_hashtag,
} from '$lib/helpers.js';

// TODO HACK remove this and use just the main parser in `$lib/parse_markdown.ts`

// TODO remove this, wraps `parse_markdown` with hacks to get links and mentions
export const todo_hacky_parse: typeof parse_markdown = (content, opts) => {
	const ast = parse_markdown(content, opts);
	walk(ast as any, {
		enter(node, parent) {
			if ((node as any)[CUSTOM_HACK]) return;
			if ((node as any).type === 'text') {
				// Parse text and replace extended syntax with new nodes.
				// This is a temporary implementation until Pfm is ready and we write a proper plugin.
				const {type: t} = parent as any;
				if (t !== 'root' && t !== 'svelte_element' && t !== 'svelte_component') return;
				const newNode = todo_hacky_parse_text(node as any) as any;
				if (newNode !== node) this.replace(newNode);
			}
		},
	});
	return ast;
};

// TODO this is hacky and temporary
const todo_hacky_parse_text = (node: Text): Svelte_Tag => {
	const words = node.value.split(MATCH_WHITESPACE);
	let plain_text = '';
	let children: Svelte_Tag[] | undefined;
	const flush_plain_text = () => {
		if (!plain_text) return;
		(children || (children = [])).push({
			[CUSTOM_HACK as any]: true,
			type: 'text',
			value: plain_text,
		});
		plain_text = '';
	};
	let word: string;
	let last_char_index: number;
	let first_char: string;
	let rest_str: string;
	let last_char: string;
	for (let i = 0; i < words.length; i++) {
		word = words[i];
		if (MATCH_WHITESPACE.test(word)) {
			plain_text += word;
			continue;
		}
		last_char_index = word.length - 1;
		first_char = word[0];
		last_char = word[last_char_index];
		if (
			(is_network_relative_path(word) && is_network_relative_path_valid(word)) ||
			(is_host_relative_path(word) && is_host_relative_path_valid(word)) ||
			word.startsWith('https://') ||
			word.startsWith('http://')
		) {
			// linkify text:
			// - /this becomes $HOST/$HUB/this
			// - ./there becomes $HOST/$HUB/$SPACE/there
			// - //that.net become https://that.net
			flush_plain_text();
			const final_word = is_network_relative_path(word) ? 'https:' + word : word;
			(children || (children = [])).push({
				[CUSTOM_HACK as any]: true,
				type: 'svelte_component',
				tag: 'Link',
				properties: [
					{
						type: 'svelte_property',
						name: 'href',
						value: [{[CUSTOM_HACK as any]: true, type: 'text', value: final_word}],
						modifiers: [],
						shorthand: 'none',
					},
				],
				selfclosing: false,
				children: [{[CUSTOM_HACK as any]: true, type: 'text', value: word}],
			});
		} else if (first_char === '`' && last_char === '`') {
			// `code` tags
			flush_plain_text();
			(children || (children = [])).push({
				[CUSTOM_HACK as any]: true,
				type: 'svelte_element',
				tag: 'code',
				properties: [],
				selfclosing: false,
				children: [
					{
						[CUSTOM_HACK as any]: true,
						type: 'text',
						value: word.substring(1, last_char_index),
					},
				],
			});
		} else if (first_char === '*' && last_char === '*') {
			// *strong* tags
			flush_plain_text();
			(children || (children = [])).push({
				[CUSTOM_HACK as any]: true,
				type: 'svelte_element',
				tag: 'strong',
				properties: [],
				selfclosing: false,
				children: [
					{
						[CUSTOM_HACK as any]: true,
						type: 'text',
						value: word.substring(1, last_char_index),
					},
				],
			});
		} else if (first_char === '_' && last_char === '_') {
			// _em_ tags
			flush_plain_text();
			(children || (children = [])).push({
				[CUSTOM_HACK as any]: true,
				type: 'svelte_element',
				tag: 'em',
				properties: [],
				selfclosing: false,
				children: [
					{
						[CUSTOM_HACK as any]: true,
						type: 'text',
						value: word.substring(1, last_char_index),
					},
				],
			});
		} else if (first_char === '@' && !check_actor_name((rest_str = word.substring(1)))) {
			// `@actor` mentions
			flush_plain_text();
			(children || (children = [])).push({
				[CUSTOM_HACK as any]: true,
				type: 'svelte_component',
				tag: 'Mention',
				properties: [
					{
						type: 'svelte_property',
						name: 'name',
						value: [{[CUSTOM_HACK as any]: true, type: 'text', value: rest_str}],
						modifiers: [],
						shorthand: 'none',
					},
				],
				selfclosing: false,
				children: [],
			});
		} else if (first_char === '#' && !check_hashtag((rest_str = word.substring(1)))) {
			// `#hashtags`
			flush_plain_text();
			(children || (children = [])).push({
				[CUSTOM_HACK as any]: true,
				type: 'svelte_component',
				tag: 'Hashtag',
				properties: [
					{
						type: 'svelte_property',
						name: 'name',
						value: [{[CUSTOM_HACK as any]: true, type: 'text', value: rest_str}],
						modifiers: [],
						shorthand: 'none',
					},
				],
				selfclosing: false,
				children: [],
			});
		} else {
			plain_text += word;
		}
	}
	if (!children) return node; // nothing special was parsed
	flush_plain_text();
	return children.length === 1
		? children[0]
		: {
				[CUSTOM_HACK as any]: true,
				type: 'svelte_element',
				tag: 'span',
				properties: [],
				selfclosing: false,
				children,
			};
};

// avoids infinite loops because newly added children get walked
const CUSTOM_HACK = Symbol();

const MATCH_WHITESPACE = /(\s+)/u;
