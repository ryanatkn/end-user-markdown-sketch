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

import {
	type Parse_Result,
	parse_node,
	parse_markdown,
	type Markdown_Parser,
} from '$lib/parse_markdown.js';

const parser: Markdown_Parser = () => [
	[{type: 'fake'}],
	{line: 1, column: 1, offset: 0, index: 0},
	0,
];

const test__siblings = suite<{parse_node_1: Parse_Result}>('parse-siblings');

test__siblings.before((ctx) => {
	ctx.parse_node_1 = parse_node(
		'<input hello:world|modifierval|modifierval2=someval /><input2 hello2:world2|modifierval2|modifierval3=someval2 />',
		parser,
		false,
	)!;
});

test__siblings(
	'parse_node partially parses sibling nodes returning the first parsed node',
	({parse_node_1: {parsed}}) => {
		assert.equal(parsed, {
			type: 'svelte_element',
			tag: 'input',
			selfclosing: true,
			children: [],
			properties: [
				{
					type: 'svelte_directive',
					name: 'hello',
					specifier: 'world',
					value: [{type: 'text', value: 'someval'}],
					shorthand: 'none',
					modifiers: [
						{type: 'modifier', value: 'modifierval'},
						{type: 'modifier', value: 'modifierval2'},
					],
				},
			],
		});
	},
);

test__siblings(
	'parse_node partially parses sibling nodes returning the chomped string',
	({parse_node_1: {chomped}}) => {
		assert.is(chomped, '<input hello:world|modifierval|modifierval2=someval />');
	},
);

test__siblings(
	'parse_node partially parses sibling nodes returning the chomped string',
	({parse_node_1: {unchomped}}) => {
		assert.is(unchomped, '<input2 hello2:world2|modifierval2|modifierval3=someval2 />');
	},
);

test__siblings(
	'parse_node partially parses sibling nodes returning the current location in the document',
	({parse_node_1: {position}}) => {
		assert.equal(position, {
			line: 1,
			column: 55,
			offset: 54,
			index: 54,
		});
	},
);

test__siblings('parse_node should continue from the position initially passed', () => {
	const {position} = parse_node(
		'<input2 hello2:world2|modifierval2|modifierval3=someval2 />',
		parser,
		false,
		{
			line: 1,
			column: 55,
			offset: 54,
		},
	)!;

	assert.equal(position, {
		line: 1,
		column: 114,
		offset: 113,
		index: 59,
	});
});

test__siblings('parse should parse sibling nodes', () => {
	const contents = parse_markdown(
		'<input hello:world|modifierval|modifierval2=someval /><input2 hello2:world2|modifierval2|modifierval3=someval2 />',
	);

	assert.equal(contents, {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'input',
				selfclosing: true,
				children: [],
				properties: [
					{
						type: 'svelte_directive',
						name: 'hello',
						specifier: 'world',
						value: [{type: 'text', value: 'someval'}],
						shorthand: 'none',
						modifiers: [
							{type: 'modifier', value: 'modifierval'},
							{type: 'modifier', value: 'modifierval2'},
						],
					},
				],
			},
			{
				type: 'svelte_element',
				tag: 'input2',
				selfclosing: true,
				children: [],
				properties: [
					{
						type: 'svelte_directive',
						name: 'hello2',
						specifier: 'world2',
						value: [{type: 'text', value: 'someval2'}],
						shorthand: 'none',
						modifiers: [
							{type: 'modifier', value: 'modifierval2'},
							{type: 'modifier', value: 'modifierval3'},
						],
					},
				],
			},
		],
	});
});

test__siblings('parse should parse nested self-closing elements', () => {
	const contents = parse_markdown('<div><input /></div>');

	assert.equal(contents, {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'div',
				properties: [],
				selfclosing: false,
				children: [
					{
						type: 'svelte_element',
						tag: 'input',
						properties: [],
						selfclosing: true,
						children: [],
					},
				],
			},
		],
	});
});

test__siblings('parse should parse nested void elements', () => {
	const contents = parse_markdown('<div><input ></div>');

	assert.equal(contents, {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'div',
				properties: [],
				selfclosing: false,
				children: [
					{
						type: 'svelte_element',
						tag: 'input',
						properties: [],
						selfclosing: true,
						children: [],
					},
				],
			},
		],
	});
});

test__siblings('parse should parse deeply nested void elements', () => {
	const contents = parse_markdown('<  div><div><div><div><input></div></div></div></div>');

	assert.equal(contents, {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'div',
				properties: [],
				selfclosing: false,
				children: [
					{
						type: 'svelte_element',
						tag: 'div',
						properties: [],
						selfclosing: false,
						children: [
							{
								type: 'svelte_element',
								tag: 'div',
								properties: [],
								selfclosing: false,
								children: [
									{
										type: 'svelte_element',
										tag: 'div',
										properties: [],
										selfclosing: false,
										children: [
											{
												type: 'svelte_element',
												tag: 'input',
												properties: [],
												selfclosing: true,
												children: [],
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	});
});

test__siblings('parse should parse sibling nodes', () => {
	const contents = parse_markdown('<input hello:world|modifierval|modifierval2=someval />Hail');

	assert.equal(contents, {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'input',
				selfclosing: true,
				children: [],
				properties: [
					{
						type: 'svelte_directive',
						name: 'hello',
						specifier: 'world',
						value: [{type: 'text', value: 'someval'}],
						shorthand: 'none',
						modifiers: [
							{type: 'modifier', value: 'modifierval'},
							{type: 'modifier', value: 'modifierval2'},
						],
					},
				],
			},
			{
				type: 'text',
				value: 'Hail',
			},
		],
	});
});

test__siblings('parse should parse deeply nested void elements', () => {
	const contents = parse_markdown('<  div><div><div><div>Hail</div></div></div></div>');

	assert.equal(contents, {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'div',
				properties: [],
				selfclosing: false,
				children: [
					{
						type: 'svelte_element',
						tag: 'div',
						properties: [],
						selfclosing: false,
						children: [
							{
								type: 'svelte_element',
								tag: 'div',
								properties: [],
								selfclosing: false,
								children: [
									{
										type: 'svelte_element',
										tag: 'div',
										properties: [],
										selfclosing: false,
										children: [
											{
												type: 'text',
												value: 'Hail',
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	});
});

test__siblings('parse should parse deeply nested void elements', () => {
	const contents = parse_markdown(
		'<  div><div><div>hail<div>Hail</div></div></div><span>hail</span></div>',
	);

	assert.equal(contents, {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'div',
				properties: [],
				selfclosing: false,
				children: [
					{
						type: 'svelte_element',
						tag: 'div',
						properties: [],
						selfclosing: false,
						children: [
							{
								type: 'svelte_element',
								tag: 'div',
								properties: [],
								selfclosing: false,
								children: [
									{
										type: 'text',
										value: 'hail',
									},
									{
										type: 'svelte_element',
										tag: 'div',
										properties: [],
										selfclosing: false,
										children: [
											{
												type: 'text',
												value: 'Hail',
											},
										],
									},
								],
							},
						],
					},
					{
						type: 'svelte_element',
						tag: 'span',
						properties: [],
						selfclosing: false,
						children: [
							{
								type: 'text',
								value: 'hail',
							},
						],
					},
				],
			},
		],
	});
});

test__siblings('parses script tags ignoring the contents', () => {
	const contents = parse_markdown(`<script>Hello friends</script>`);

	assert.equal(contents, {
		type: 'root',
		children: [
			{
				type: 'svelteScript',
				tag: 'script',
				properties: [],
				selfclosing: false,
				children: [{type: 'text', value: 'Hello friends'}],
			},
		],
	});
});

test__siblings('parses script tags with attributes ignoring the contents', () => {
	const contents = parse_markdown(`<script hello:world='cheese strings'>


Hello friends</script>`);

	assert.equal(contents, {
		type: 'root',
		children: [
			{
				type: 'svelteScript',
				tag: 'script',
				properties: [
					{
						type: 'svelte_directive',
						name: 'hello',
						specifier: 'world',
						value: [
							{type: 'text', value: 'cheese'},
							{type: 'text', value: ' '},
							{type: 'text', value: 'strings'},
						],
						shorthand: 'none',
						modifiers: [],
					},
				],
				selfclosing: false,
				children: [{type: 'text', value: '\n\n\nHello friends'}],
			},
		],
	});
});

test__siblings('parses style tags ignoring the contents', () => {
	const contents = parse_markdown(`<style hello:world='cheese strings'>


Hello friends</style>`);

	assert.equal(contents, {
		type: 'root',
		children: [
			{
				type: 'svelteStyle',
				tag: 'style',
				properties: [
					{
						type: 'svelte_directive',
						name: 'hello',
						specifier: 'world',
						value: [
							{type: 'text', value: 'cheese'},
							{type: 'text', value: ' '},
							{type: 'text', value: 'strings'},
						],
						shorthand: 'none',
						modifiers: [],
					},
				],
				selfclosing: false,
				children: [{type: 'text', value: '\n\n\nHello friends'}],
			},
		],
	});
});

test__siblings('parses style tags ignoring the contents', () => {
	const contents = parse_markdown(`<svelte:head hello:world='cheese strings'>
<meta description="boo" />
</svelte:head>`);

	assert.equal(contents, {
		type: 'root',
		children: [
			{
				type: 'svelte_meta',
				tag: 'head',
				properties: [
					{
						type: 'svelte_directive',
						name: 'hello',
						specifier: 'world',
						value: [
							{type: 'text', value: 'cheese'},
							{type: 'text', value: ' '},
							{type: 'text', value: 'strings'},
						],
						shorthand: 'none',
						modifiers: [],
					},
				],
				selfclosing: false,
				children: [
					{type: 'text', value: '\n'},
					{
						type: 'svelte_element',
						tag: 'meta',
						selfclosing: true,
						children: [],
						properties: [
							{
								type: 'svelte_property',
								name: 'description',
								value: [{type: 'text', value: 'boo'}],
								shorthand: 'none',
								modifiers: [],
							},
						],
					},
					{type: 'text', value: '\n'},
				],
			},
		],
	});
});

test__siblings.run();
