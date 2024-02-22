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

const parser: Markdown_Parser = () => [
	[{type: 'fake'}],
	{line: 1, column: 1, offset: 0, index: 0},
	0,
];

const test__position = suite('parse-positions');

test__position('tracks the location of expression nodes', () => {
	const {parsed} = parse_node(`{hail}`, parser, true)!;

	assert.equal(parsed, {
		type: 'svelte_dynamic_content',
		expression: {
			type: 'svelte_expression',
			value: 'hail',
			position: {
				start: {line: 1, column: 2, offset: 1},
				end: {line: 1, column: 6, offset: 5},
			},
		},
		position: {
			start: {line: 1, column: 1, offset: 0},
			end: {line: 1, column: 7, offset: 6},
		},
	});
});

test__position('tracks the location of expression nodes in attributes', () => {
	const {parsed} = parse_node(`<input thing={hail} />`, parser, true)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'input',
		properties: [
			{
				type: 'svelte_property',
				name: 'thing',
				value: [
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: 'hail',
							position: {
								start: {line: 1, column: 15, offset: 14},
								end: {line: 1, column: 19, offset: 18},
							},
						},
						position: {
							start: {line: 1, column: 14, offset: 13},
							end: {line: 1, column: 20, offset: 19},
						},
					},
				],
				modifiers: [],
				shorthand: 'none',
				position: {
					start: {line: 1, column: 8, offset: 7},
					end: {line: 1, column: 20, offset: 19},
				},
			},
		],
		selfclosing: true,
		children: [],
		position: {
			start: {line: 1, column: 1, offset: 0},
			end: {line: 1, column: 23, offset: 22},
		},
	});
});

test__position('tracks the location of multiple expression nodes in attributes', () => {
	const {parsed} = parse_node(`<input thing="{hail} {haip}" />`, parser, true)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'input',
		properties: [
			{
				type: 'svelte_property',
				name: 'thing',
				value: [
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: 'hail',
							position: {
								start: {line: 1, column: 16, offset: 15},
								end: {line: 1, column: 20, offset: 19},
							},
						},
						position: {
							start: {line: 1, column: 15, offset: 14},
							end: {line: 1, column: 21, offset: 20},
						},
					},
					{
						type: 'text',
						value: ' ',
						position: {
							start: {
								line: 1,
								column: 21,
								offset: 20,
							},
							end: {line: 1, column: 22, offset: 21},
						},
					},
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: 'haip',
							position: {
								start: {line: 1, column: 23, offset: 22},
								end: {line: 1, column: 27, offset: 26},
							},
						},
						position: {
							start: {line: 1, column: 22, offset: 21},
							end: {line: 1, column: 28, offset: 27},
						},
					},
				],
				modifiers: [],
				shorthand: 'none',
				position: {
					start: {line: 1, column: 8, offset: 7},
					end: {line: 1, column: 29, offset: 28},
				},
			},
		],
		selfclosing: true,
		children: [],
		position: {
			start: {line: 1, column: 1, offset: 0},
			end: {line: 1, column: 32, offset: 31},
		},
	});
});

test__position(
	'tracks the location of multiple expression nodes in attributes: extra spaces',
	() => {
		const {parsed} = parse_node(`<input thing="{hail}   {haip}" />`, parser, true)!;

		assert.equal(parsed, {
			type: 'svelte_element',
			tag: 'input',
			properties: [
				{
					type: 'svelte_property',
					name: 'thing',
					value: [
						{
							type: 'svelte_dynamic_content',
							expression: {
								type: 'svelte_expression',
								value: 'hail',
								position: {
									start: {line: 1, column: 16, offset: 15},
									end: {line: 1, column: 20, offset: 19},
								},
							},
							position: {
								start: {line: 1, column: 15, offset: 14},
								end: {line: 1, column: 21, offset: 20},
							},
						},
						{
							type: 'text',
							value: '   ',
							position: {
								start: {
									line: 1,
									column: 21,
									offset: 20,
								},
								end: {line: 1, column: 24, offset: 23},
							},
						},
						{
							type: 'svelte_dynamic_content',
							expression: {
								type: 'svelte_expression',
								value: 'haip',
								position: {
									start: {line: 1, column: 25, offset: 24},
									end: {line: 1, column: 29, offset: 28},
								},
							},
							position: {
								start: {line: 1, column: 24, offset: 23},
								end: {line: 1, column: 30, offset: 29},
							},
						},
					],
					modifiers: [],
					shorthand: 'none',
					position: {
						start: {line: 1, column: 8, offset: 7},
						end: {line: 1, column: 31, offset: 30},
					},
				},
			],
			selfclosing: true,
			children: [],
			position: {
				start: {line: 1, column: 1, offset: 0},
				end: {line: 1, column: 34, offset: 33},
			},
		});
	},
);

test__position('tracks the location of self-closing elements', () => {
	const {parsed} = parse_node(`<svelte:options />`, parser, true)!;

	assert.equal(parsed, {
		type: 'svelte_meta',
		tag: 'options',
		properties: [],
		selfclosing: true,
		children: [],
		position: {
			start: {line: 1, column: 1, offset: 0},
			end: {line: 1, column: 19, offset: 18},
		},
	});
});

test__position('tracks the location of attributes', () => {
	const {parsed} = parse_node(`<svelte:options tag={null} />`, parser, true)!;

	assert.equal(parsed, {
		type: 'svelte_meta',
		tag: 'options',
		properties: [
			{
				type: 'svelte_property',
				name: 'tag',
				value: [
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: 'null',
							position: {
								start: {line: 1, column: 22, offset: 21},
								end: {line: 1, column: 26, offset: 25},
							},
						},
						position: {
							start: {line: 1, column: 21, offset: 20},
							end: {line: 1, column: 27, offset: 26},
						},
					},
				],
				shorthand: 'none',
				modifiers: [],
				position: {
					start: {line: 1, column: 17, offset: 16},
					end: {line: 1, column: 27, offset: 26},
				},
			},
		],
		selfclosing: true,
		children: [],
		position: {
			start: {line: 1, column: 1, offset: 0},
			end: {line: 1, column: 30, offset: 29},
		},
	});
});

test__position('tracks the location of boolean attributes', () => {
	const {parsed} = parse_node(`<div test/>`, parser, true)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'div',
		properties: [
			{
				type: 'svelte_property',
				name: 'test',
				value: [],
				shorthand: 'boolean',
				modifiers: [],
				position: {
					start: {line: 1, column: 6, offset: 5},
					end: {line: 1, column: 10, offset: 9},
				},
			},
		],
		selfclosing: true,
		children: [],
		position: {
			start: {line: 1, column: 1, offset: 0},
			end: {line: 1, column: 12, offset: 11},
		},
	});
});

test__position('tracks the location of shorthand directives', () => {
	const {parsed} = parse_node(`<div test:boo />`, parser, true)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'div',
		properties: [
			{
				type: 'svelte_directive',
				name: 'test',
				value: [],
				shorthand: 'none',
				specifier: 'boo',
				modifiers: [],
				position: {
					start: {line: 1, column: 6, offset: 5},
					end: {line: 1, column: 14, offset: 13},
				},
			},
		],
		selfclosing: true,
		children: [],
		position: {
			start: {line: 1, column: 1, offset: 0},
			end: {line: 1, column: 17, offset: 16},
		},
	});
});

test__position('tracks the location of text nodes', () => {
	const {parsed} = parse_node(`hail`, parser, true)!;

	assert.equal(parsed, {
		type: 'text',
		value: 'hail',
		position: {
			start: {line: 1, column: 1, offset: 0},
			end: {line: 1, column: 5, offset: 4},
		},
	});
});

test__position('tracks the location of void blocks', () => {
	const {parsed} = parse_node(`{@html somehtml}`, parser, true)!;

	assert.equal(parsed, {
		type: 'svelte_void_block',
		name: 'html',
		expression: {
			type: 'svelte_expression',
			value: 'somehtml',
			position: {
				start: {line: 1, column: 8, offset: 7},
				end: {line: 1, column: 16, offset: 15},
			},
		},
		position: {
			start: {line: 1, column: 1, offset: 0},
			end: {line: 1, column: 17, offset: 16},
		},
	});
});

test__position('tracks the location of branching blocks', () => {
	const parsed = parse_markdown(`{#if expression}hi{/if}`, true);

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
						children: [
							{
								type: 'text',
								value: 'hi',
								position: {
									start: {line: 1, column: 17, offset: 16},
									end: {line: 1, column: 19, offset: 18},
								},
							},
						],
						expression: {
							type: 'svelte_expression',
							value: 'expression',
							position: {
								start: {line: 1, column: 6, offset: 5},
								end: {line: 1, column: 16, offset: 15},
							},
						},
						position: {
							start: {line: 1, column: 1, offset: 0},
							end: {line: 1, column: 19, offset: 18},
						},
					},
				],
				position: {
					start: {line: 1, column: 1, offset: 0},
					end: {line: 1, column: 24, offset: 23},
				},
			},
		],
		position: {
			start: {line: 1, column: 1, offset: 0},
			end: {line: 1, column: 24, offset: 23},
		},
	});
});

test__position('tracks the location of branching blocks', () => {
	const parsed = parse_markdown(`{#if expression}hi{:else}hi{/if}`, true);

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
						children: [
							{
								type: 'text',
								value: 'hi',
								position: {
									start: {line: 1, column: 17, offset: 16},
									end: {line: 1, column: 19, offset: 18},
								},
							},
						],
						expression: {
							type: 'svelte_expression',
							value: 'expression',
							position: {
								start: {line: 1, column: 6, offset: 5},
								end: {line: 1, column: 16, offset: 15},
							},
						},
						position: {
							start: {line: 1, column: 1, offset: 0},
							end: {line: 1, column: 19, offset: 18},
						},
					},
					{
						type: 'svelte_branch',
						name: 'else',
						children: [
							{
								type: 'text',
								value: 'hi',
								position: {
									start: {line: 1, column: 26, offset: 25},
									end: {line: 1, column: 28, offset: 27},
								},
							},
						],
						expression: {
							type: 'svelte_expression',
							value: '',
						},
						position: {
							start: {line: 1, column: 19, offset: 18},
							end: {line: 1, column: 28, offset: 27},
						},
					},
				],
				position: {
					start: {line: 1, column: 1, offset: 0},
					end: {line: 1, column: 33, offset: 32},
				},
			},
		],
		position: {
			start: {line: 1, column: 1, offset: 0},
			end: {line: 1, column: 33, offset: 32},
		},
	});
});

test__position('tracks the location of comments', () => {
	const {parsed} = parse_node(`<!-- hello world -->`, parser, true)!;

	assert.equal(parsed, {
		type: 'comment',
		value: ' hello world ',
		position: {
			start: {line: 1, column: 1, offset: 0},
			end: {line: 1, column: 21, offset: 20},
		},
	});
});

test__position('tracks the location of a complex node', () => {
	const parsed = parse_markdown(
		`<script>123</script>
		
<div>
  hello
</div>`,
		true,
	);

	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelteScript',
				tag: 'script',
				properties: [],
				selfclosing: false,
				children: [
					{
						type: 'text',
						value: '123',
						position: {
							start: {line: 1, column: 9, offset: 8},
							end: {line: 1, column: 12, offset: 11},
						},
					},
				],
				position: {
					start: {line: 1, column: 1, offset: 0},
					end: {line: 1, column: 21, offset: 20},
				},
			},
			{
				type: 'text',
				value: '\n\t\t\n',
				position: {
					start: {line: 1, column: 21, offset: 20},
					end: {line: 3, column: 1, offset: 24},
				},
			},
			{
				type: 'svelte_element',
				tag: 'div',
				properties: [],
				selfclosing: false,
				children: [
					{
						type: 'text',
						value: '\n  hello\n',
						position: {
							start: {line: 3, column: 6, offset: 29},
							end: {line: 5, column: 1, offset: 38},
						},
					},
				],
				position: {
					start: {line: 3, column: 1, offset: 24},
					end: {line: 5, column: 7, offset: 44},
				},
			},
		],
		position: {
			start: {line: 1, column: 1, offset: 0},
			end: {line: 5, column: 7, offset: 44},
		},
	});
});

test__position.run();
