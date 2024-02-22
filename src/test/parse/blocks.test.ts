/*

Adapted from MDsveX: <https://github.com/pngwn/MDsveX>

MIT License

Copyright (c) 2020 pngwn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

import {suite} from 'uvu';
import * as assert from 'uvu/assert';

import {parse_node, parse_markdown, type Markdown_Parser} from '$lib/parse_markdown.js';

const test__block = suite('parse-block');

const parser: Markdown_Parser = () => [
	[{type: 'fake'}],
	{line: 1, column: 1, offset: 0, index: 0},
	0,
];

test__block('parses a simple void block', () => {
	const {parsed} = parse_node(`{@html boo}`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_void_block',
		name: 'html',
		expression: {
			type: 'svelte_expression',
			value: 'boo',
		},
	});
});

test__block('parses a more complex expression within a void block', () => {
	const {parsed} = parse_node(
		`{@html (e) => val = val.filter(v => v.map(x => x*2)).reduce(absolutelywhat is this i have no idea) * 2735262 + 123.something("hey")}`,
		parser,
		false,
	)!;

	assert.equal(parsed, {
		type: 'svelte_void_block',
		name: 'html',
		expression: {
			type: 'svelte_expression',
			value:
				'(e) => val = val.filter(v => v.map(x => x*2)).reduce(absolutelywhat is this i have no idea) * 2735262 + 123.something("hey")',
		},
	});
});

test__block('parses a void Element without an expression', () => {
	const {parsed} = parse_node(`{@htmlfoo}`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_void_block',
		name: 'htmlfoo',
		expression: {
			type: 'svelte_expression',
			value: '',
		},
	});
});

test__block('parses a simple if block', () => {
	const parsed = parse_markdown(`{#if condition}hello{/if}`);

	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_branching_block',
				name: 'if',
				branches: [
					{
						type: 'svelte_branch',
						name: 'if',
						expression: {
							type: 'svelte_expression',
							value: 'condition',
						},
						children: [{type: 'text', value: 'hello'}],
					},
				],
			},
		],
	});
});

test__block('parses an if block with an else', () => {
	const parsed = parse_markdown(`{#if condition}hello{:else}hello2{/if}`);

	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_branching_block',
				name: 'if',
				branches: [
					{
						type: 'svelte_branch',
						name: 'if',
						expression: {
							type: 'svelte_expression',
							value: 'condition',
						},
						children: [{type: 'text', value: 'hello'}],
					},
					{
						type: 'svelte_branch',
						name: 'else',
						expression: {
							type: 'svelte_expression',
							value: '',
						},
						children: [{type: 'text', value: 'hello2'}],
					},
				],
			},
		],
	});
});

test__block('parses an if block with an if else and else', () => {
	const parsed = parse_markdown(
		`{#if condition}hello{:else if condition2}hello2{:else}hello3{/if}`,
	);

	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_branching_block',
				name: 'if',
				branches: [
					{
						type: 'svelte_branch',
						name: 'if',
						expression: {
							type: 'svelte_expression',
							value: 'condition',
						},
						children: [{type: 'text', value: 'hello'}],
					},
					{
						type: 'svelte_branch',
						name: 'else if',
						expression: {
							type: 'svelte_expression',
							value: 'condition2',
						},
						children: [{type: 'text', value: 'hello2'}],
					},
					{
						type: 'svelte_branch',
						name: 'else',
						expression: {
							type: 'svelte_expression',
							value: '',
						},
						children: [{type: 'text', value: 'hello3'}],
					},
				],
			},
		],
	});
});

test__block('parses an if block with many if else branches', () => {
	const parsed = parse_markdown(
		`{#if condition}hello{:else if condition2}hello2{:else if condition2}hello2{:else if condition2}hello2{:else if condition2}hello2{/if}`,
	);

	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_branching_block',
				name: 'if',
				branches: [
					{
						type: 'svelte_branch',
						name: 'if',
						expression: {
							type: 'svelte_expression',
							value: 'condition',
						},
						children: [{type: 'text', value: 'hello'}],
					},
					{
						type: 'svelte_branch',
						name: 'else if',
						expression: {
							type: 'svelte_expression',
							value: 'condition2',
						},
						children: [{type: 'text', value: 'hello2'}],
					},
					{
						type: 'svelte_branch',
						name: 'else if',
						expression: {
							type: 'svelte_expression',
							value: 'condition2',
						},
						children: [{type: 'text', value: 'hello2'}],
					},
					{
						type: 'svelte_branch',
						name: 'else if',
						expression: {
							type: 'svelte_expression',
							value: 'condition2',
						},
						children: [{type: 'text', value: 'hello2'}],
					},
					{
						type: 'svelte_branch',
						name: 'else if',
						expression: {
							type: 'svelte_expression',
							value: 'condition2',
						},
						children: [{type: 'text', value: 'hello2'}],
					},
				],
			},
		],
	});
});

test__block('parses an await block with all branches', () => {
	const parsed = parse_markdown(
		`{#await somePromise}loading{:then value}{value}{:catch e}{e.value}{/await}`,
	);

	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_branching_block',
				name: 'await',
				branches: [
					{
						type: 'svelte_branch',
						name: 'await',
						expression: {
							type: 'svelte_expression',
							value: 'somePromise',
						},
						children: [{type: 'text', value: 'loading'}],
					},
					{
						type: 'svelte_branch',
						name: 'then',
						expression: {
							type: 'svelte_expression',
							value: 'value',
						},
						children: [
							{
								type: 'svelte_dynamic_content',
								expression: {type: 'svelte_expression', value: 'value'},
							},
						],
					},
					{
						type: 'svelte_branch',
						name: 'catch',
						expression: {
							type: 'svelte_expression',
							value: 'e',
						},
						children: [
							{
								type: 'svelte_dynamic_content',
								expression: {type: 'svelte_expression', value: 'e.value'},
							},
						],
					},
				],
			},
		],
	});
});

test__block('parses an await block with a shorthand `await then` and a catch', () => {
	const parsed = parse_markdown(
		`{#await somePromise then value}{value}{:catch e}{e.value}{/await}`,
	);

	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_branching_block',
				name: 'await',
				branches: [
					{
						type: 'svelte_branch',
						name: 'await',
						expression: {
							type: 'svelte_expression',
							value: 'somePromise then value',
						},
						children: [
							{
								type: 'svelte_dynamic_content',
								expression: {type: 'svelte_expression', value: 'value'},
							},
						],
					},
					{
						type: 'svelte_branch',
						name: 'catch',
						expression: {
							type: 'svelte_expression',
							value: 'e',
						},
						children: [
							{
								type: 'svelte_dynamic_content',
								expression: {type: 'svelte_expression', value: 'e.value'},
							},
						],
					},
				],
			},
		],
	});
});

test__block('parses an await block with a shorthand `await then` and no catch', () => {
	const parsed = parse_markdown(`{#await somePromise then value}{value}{/await}`);

	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_branching_block',
				name: 'await',
				branches: [
					{
						type: 'svelte_branch',
						name: 'await',
						expression: {
							type: 'svelte_expression',
							value: 'somePromise then value',
						},
						children: [
							{
								type: 'svelte_dynamic_content',
								expression: {type: 'svelte_expression', value: 'value'},
							},
						],
					},
				],
			},
		],
	});
});

test__block('parses an each block correctly', () => {
	const parsed = parse_markdown(
		`{#each array.filter(1, 2, 3, 4) as {hello: {world}}, index (key(23))}{value}{/each}`,
	);

	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_branching_block',
				name: 'each',
				branches: [
					{
						type: 'svelte_branch',
						name: 'each',
						expression: {
							type: 'svelte_expression',
							value: 'array.filter(1, 2, 3, 4) as {hello: {world}}, index (key(23))',
						},
						children: [
							{
								type: 'svelte_dynamic_content',
								expression: {type: 'svelte_expression', value: 'value'},
							},
						],
					},
				],
			},
		],
	});
});

test__block('parses an if block with a trailing space character', () => {
	const parsed = parse_markdown(
		`{ #if Data.length <= 0 && !isLoading } 
{ /if }`,
	);

	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_branching_block',
				name: 'if',
				branches: [
					{
						type: 'svelte_branch',
						name: 'if',
						expression: {
							type: 'svelte_expression',
							value: 'Data.length <= 0 && !isLoading ',
						},
						children: [
							{
								type: 'text',
								value: ' \n',
							},
						],
					},
				],
			},
		],
	});
});

test__block.run();
