// TODO this is just a hacky proof of concept

import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {todo_hacky_parse} from '$lib/todo_hacky_parse.js';

// TODO merge these tests with the main parser in `$lib/parse_markdown.ts`

/* test__hacky_parse */
const test__hacky_parse = suite('parse_fast');

test__hacky_parse('parses a normal FAST', async () => {
	const parsed = todo_hacky_parse('<Tag1><Tag2 /></Tag1 />');
	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_component',
				tag: 'Tag1',
				properties: [],
				selfclosing: false,
				children: [
					{
						type: 'svelte_component',
						tag: 'Tag2',
						properties: [],
						selfclosing: true,
						children: [],
					},
				],
			},
		],
	});
});

test__hacky_parse('parses https:// links', async () => {
	const parsed = todo_hacky_parse('https://felt.dev/some_link');
	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_component',
				tag: 'Link',
				properties: [
					{
						type: 'svelte_property',
						name: 'href',
						value: [{type: 'text', value: 'https://felt.dev/some_link'}],
						modifiers: [],
						shorthand: 'none',
					},
				],
				selfclosing: false,
				children: [{type: 'text', value: 'https://felt.dev/some_link'}],
			},
		],
	});
});

test__hacky_parse('parses http:// links', async () => {
	const parsed = todo_hacky_parse('http://felt.dev/some_link');
	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_component',
				tag: 'Link',
				properties: [
					{
						type: 'svelte_property',
						name: 'href',
						value: [{type: 'text', value: 'http://felt.dev/some_link'}],
						modifiers: [],
						shorthand: 'none',
					},
				],
				selfclosing: false,
				children: [{type: 'text', value: 'http://felt.dev/some_link'}],
			},
		],
	});
});

test__hacky_parse('parses // global links as https:', async () => {
	const parsed = todo_hacky_parse('//felt.dev/some_link');
	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_component',
				tag: 'Link',
				properties: [
					{
						type: 'svelte_property',
						name: 'href',
						value: [{type: 'text', value: 'https://felt.dev/some_link'}],
						modifiers: [],
						shorthand: 'none',
					},
				],
				selfclosing: false,
				children: [{type: 'text', value: '//felt.dev/some_link'}],
			},
		],
	});
});

test__hacky_parse('parses absolute links relative to the host root', async () => {
	const parsed = todo_hacky_parse('/felt/some_link');
	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_component',
				tag: 'Link',
				properties: [
					{
						type: 'svelte_property',
						name: 'href',
						value: [{type: 'text', value: '/felt/some_link'}],
						modifiers: [],
						shorthand: 'none',
					},
				],
				selfclosing: false,
				children: [{type: 'text', value: '/felt/some_link'}],
			},
		],
	});
});

test__hacky_parse('parses a FAST with links and preserves whitespace', async () => {
	const parsed = todo_hacky_parse(
		'<Tag1>link to <p>/several/sliding/penguins\n<span>https://several.more</span></p> in\nplain   text  \n  </Tag1 />',
	);
	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_component',
				tag: 'Tag1',
				properties: [],
				selfclosing: false,
				children: [
					{type: 'text', value: 'link to '},
					{
						type: 'svelte_element',
						tag: 'p',
						properties: [],
						selfclosing: false,
						children: [
							{
								type: 'svelte_element',
								tag: 'span',
								properties: [],
								selfclosing: false,
								children: [
									{
										type: 'svelte_component',
										tag: 'Link',
										properties: [
											{
												type: 'svelte_property',
												name: 'href',
												value: [{type: 'text', value: '/several/sliding/penguins'}],
												modifiers: [],
												shorthand: 'none',
											},
										],
										selfclosing: false,
										children: [{type: 'text', value: '/several/sliding/penguins'}],
									},
									{type: 'text', value: '\n'},
								],
							},
							{
								type: 'svelte_element',
								tag: 'span',
								properties: [],
								selfclosing: false,
								children: [
									{
										type: 'svelte_component',
										tag: 'Link',
										properties: [
											{
												type: 'svelte_property',
												name: 'href',
												value: [{type: 'text', value: 'https://several.more'}],
												modifiers: [],
												shorthand: 'none',
											},
										],
										selfclosing: false,
										children: [{type: 'text', value: 'https://several.more'}],
									},
								],
							},
						],
					},
					{type: 'text', value: ' in\nplain   text  \n  '},
				],
			},
		],
	});
});

test__hacky_parse('does not parse https:// links in properties', async () => {
	const parsed = todo_hacky_parse('<a href="https://felt.dev/some_link" />');
	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'a',
				properties: [
					{
						type: 'svelte_property',
						name: 'href',
						value: [{type: 'text', value: 'https://felt.dev/some_link'}],
						modifiers: [],
						shorthand: 'none',
					},
				],
				selfclosing: true,
				children: [],
			},
		],
	});
});

test__hacky_parse('parses a word in backticks', async () => {
	const parsed = todo_hacky_parse('`some-code`');
	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'code',
				properties: [],
				selfclosing: false,
				children: [{type: 'text', value: 'some-code'}],
			},
		],
	});
});

test__hacky_parse('parses a word in backticks', async () => {
	const parsed = todo_hacky_parse('*some-text*');
	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'strong',
				properties: [],
				selfclosing: false,
				children: [{type: 'text', value: 'some-text'}],
			},
		],
	});
});

test__hacky_parse('parses a word in underscores', async () => {
	const parsed = todo_hacky_parse('_some-text_');
	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'em',
				properties: [],
				selfclosing: false,
				children: [{type: 'text', value: 'some-text'}],
			},
		],
	});
});

// TODO rewrite `parseSvelteText` to handle this test
// test__hacky_parse('parses a phrase in backticks', async () => {
// 	const parsed = parse_fast({
// 		value: '`some phrase with many words`',
//
// 	});
// 	assert.equal(parsed, {
// 		type: 'root',
// 		children: [
// 			{
// 				type: 'svelte_element',
// 				tag: 'code',
// 				properties: [],
// 				selfclosing: false,
// 				children: [{type: 'text', value: 'some phrase with many words'}],
// 			},
// 		],
// 	});
// });

test__hacky_parse.run();
/* test__hacky_parse */
