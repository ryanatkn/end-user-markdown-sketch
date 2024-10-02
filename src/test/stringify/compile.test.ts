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

import {table_without_positions} from './fixtures/table_without_positions.js';
import {table_output} from './fixtures/table_output.js';
import type {Markdown_Root} from '$lib/markdown.js';
import {stringify_markdown} from '$lib/old_stringify_markdown.js';

const test__stringify_markdown = suite('compile-tree');

test__stringify_markdown('throws without a root node root', () => {
	const node = {
		type: 'hi',
	};

	// @ts-expect-error
	assert.throws(() => stringify_markdown(node));
});

test__stringify_markdown('compiles a text node', () => {
	const tree: Markdown_Root = {
		type: 'root',
		children: [
			{
				type: 'text',
				value: 'hi',
			},
		],
	};

	assert.is(stringify_markdown(tree), 'hi');
});

test__stringify_markdown('compiles a expression node', () => {
	const tree: Markdown_Root = {
		type: 'root',
		children: [
			{
				type: 'svelte_dynamic_content',
				expression: {
					type: 'svelte_expression',
					value: 'console.log("boo")',
				},
			},
		],
	};

	assert.is(stringify_markdown(tree), '{console.log("boo")}');
});

test__stringify_markdown('compiles a void block', () => {
	const tree: Markdown_Root = {
		type: 'root',
		children: [
			{
				type: 'svelte_void_block',
				name: 'html',
				expression: {
					type: 'svelte_expression',
					value: '`hello i am an expression`',
				},
			},
		],
	};

	assert.is(stringify_markdown(tree), '{@html `hello i am an expression`}');
});

test__stringify_markdown('compiles a self-closing html element', () => {
	const tree: Markdown_Root = {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'input',
				selfclosing: true,
				children: [],
				properties: [],
			},
		],
	};

	assert.is(stringify_markdown(tree), '<input />');
});

test__stringify_markdown(
	'compiles a self-closing html element with short hand boolean attributes',
	() => {
		const tree: Markdown_Root = {
			type: 'root',
			children: [
				{
					type: 'svelte_element',
					tag: 'input',
					selfclosing: true,
					children: [],
					properties: [
						{
							type: 'svelte_property',
							name: 'hello',
							value: [],
							shorthand: 'boolean',
							modifiers: [],
						},
						{
							type: 'svelte_property',
							name: 'goodbye',
							value: [],
							shorthand: 'boolean',
							modifiers: [],
						},
					],
				},
			],
		};

		assert.is(
			stringify_markdown(tree),
			`<input 
hello
goodbye
/>`,
		);
	},
);

test__stringify_markdown('compiles a self-closing html element with props and a value', () => {
	const tree: Markdown_Root = {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'input',
				selfclosing: true,
				children: [],
				properties: [
					{
						type: 'svelte_property',
						name: 'hello',
						value: [
							{
								type: 'text',
								value: 'value',
							},
						],
						shorthand: 'none',
						modifiers: [],
					},
				],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`<input 
hello="value"
/>`,
	);
});

test__stringify_markdown('compiles a self-closing html element with props and values', () => {
	const tree: Markdown_Root = {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'input',
				selfclosing: true,
				children: [],
				properties: [
					{
						type: 'svelte_property',
						name: 'hello',
						value: [
							{
								type: 'text',
								value: 'value',
							},
							{type: 'text', value: ' '},
							{
								type: 'text',
								value: 'value',
							},
						],
						shorthand: 'none',
						modifiers: [],
					},
				],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`<input 
hello="value value"
/>`,
	);
});

test__stringify_markdown(
	'compiles a self-closing html element with props and expression values',
	() => {
		const tree: Markdown_Root = {
			type: 'root',
			children: [
				{
					type: 'svelte_element',
					tag: 'input',
					selfclosing: true,
					children: [],
					properties: [
						{
							type: 'svelte_property',
							name: 'hello',
							value: [
								{
									type: 'text',
									value: 'value',
								},
								{
									type: 'text',
									value: ' ',
								},
								{
									type: 'text',
									value: 'value',
								},
								{
									type: 'svelte_dynamic_content',
									expression: {
										type: 'svelte_expression',
										value: 'value',
									},
								},
							],
							shorthand: 'none',
							modifiers: [],
						},
					],
				},
			],
		};

		assert.is(
			stringify_markdown(tree),
			`<input 
hello="value value{value}"
/>`,
		);
	},
);

test__stringify_markdown(
	'compiles a self-closing html element with props and expression values, with empty attr text nodes',
	() => {
		const tree: Markdown_Root = {
			type: 'root',
			children: [
				{
					type: 'svelte_element',
					tag: 'input',
					selfclosing: true,
					children: [],
					properties: [
						{
							type: 'svelte_property',
							name: 'hello',
							value: [
								{
									type: 'text',
									value: 'value',
								},
								{
									type: 'text',
									value: ' ',
								},
								{
									type: 'text',
									value: 'value',
								},
								{
									type: 'text',
									value: ' ',
								},
								{
									type: 'svelte_dynamic_content',
									expression: {
										type: 'svelte_expression',
										value: 'value',
									},
								},
							],
							shorthand: 'none',
							modifiers: [],
						},
					],
				},
			],
		};

		assert.is(
			stringify_markdown(tree),
			`<input 
hello="value value {value}"
/>`,
		);
	},
);

test__stringify_markdown(
	'compiles a self-closing html element with props and expression values, with empty attr text nodes',
	() => {
		const tree: Markdown_Root = {
			type: 'root',
			children: [
				{
					type: 'svelte_element',
					tag: 'input',
					selfclosing: true,
					children: [],
					properties: [
						{
							type: 'svelte_property',
							name: 'hello',
							value: [
								{
									type: 'text',
									value: 'value',
								},
								{
									type: 'svelte_dynamic_content',
									expression: {
										type: 'svelte_expression',
										value: 'value',
									},
								},
								{
									type: 'svelte_dynamic_content',
									expression: {
										type: 'svelte_expression',
										value: 'value',
									},
								},
								{
									type: 'svelte_dynamic_content',
									expression: {
										type: 'svelte_expression',
										value: 'value',
									},
								},
							],
							shorthand: 'none',
							modifiers: [],
						},
					],
				},
			],
		};

		assert.is(
			stringify_markdown(tree),
			`<input 
hello="value{value}{value}{value}"
/>`,
		);
	},
);

test__stringify_markdown('handle a realword set of attrs', () => {
	const tree: Markdown_Root = {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'div',
				properties: [
					{
						type: 'svelte_property',
						name: 'style',
						value: [
							{
								type: 'text',
								value: 'color:',
							},
							{
								type: 'text',
								value: ' ',
							},
							{
								type: 'svelte_dynamic_content',
								expression: {
									type: 'svelte_expression',
									value: 'color',
								},
							},
							{
								type: 'text',
								value: ';',
							},
						],
						modifiers: [],
						shorthand: 'none',
					},
				],
				selfclosing: true,
				children: [],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`<div 
style="color: {color};"
/>`,
	);
});

test__stringify_markdown('handle a realword set of attrs: more whitespace', () => {
	const tree: Markdown_Root = {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'div',
				properties: [
					{
						type: 'svelte_property',
						name: 'style',
						value: [
							{
								type: 'text',
								value: 'color:',
							},
							{
								type: 'text',
								value: '      			',
							},
							{
								type: 'svelte_dynamic_content',
								expression: {
									type: 'svelte_expression',
									value: 'color',
								},
							},
							{
								type: 'text',
								value: ';',
							},
						],
						modifiers: [],
						shorthand: 'none',
					},
				],
				selfclosing: true,
				children: [],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`<div 
style="color:      			{color};"
/>`,
	);
});

test__stringify_markdown('compiles directives', () => {
	const tree: Markdown_Root = {
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
						value: [],
						shorthand: 'none',
						modifiers: [],
					},
				],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`<input 
hello:world
/>`,
	);
});

test__stringify_markdown('compiles directive with a value', () => {
	const tree: Markdown_Root = {
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
						value: [{type: 'text', value: 'cheese'}],
						shorthand: 'none',
						modifiers: [],
					},
				],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`<input 
hello:world="cheese"
/>`,
	);
});

test__stringify_markdown('compiles directive with a value', () => {
	const tree: Markdown_Root = {
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
						value: [
							{type: 'text', value: 'cheese'},
							{type: 'text', value: ' '},
							{type: 'text', value: 'strings'},
						],
						shorthand: 'none',
						modifiers: [],
					},
				],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`<input 
hello:world="cheese strings"
/>`,
	);
});

test__stringify_markdown('compiles directive with a value', () => {
	const tree: Markdown_Root = {
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
						value: [
							{
								type: 'text',
								value: 'color:',
							},
							{
								type: 'text',
								value: ' ',
							},
							{
								type: 'svelte_dynamic_content',
								expression: {
									type: 'svelte_expression',
									value: 'color',
								},
							},
							{
								type: 'text',
								value: ';',
							},
						],
						shorthand: 'none',
						modifiers: [],
					},
				],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`<input 
hello:world="color: {color};"
/>`,
	);
});

test__stringify_markdown('compiles directive with a value', () => {
	const tree: Markdown_Root = {
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
						value: [],
						shorthand: 'none',
						modifiers: [
							{type: 'modifier', value: 'modifierval'},
							{type: 'modifier', value: 'modifierval2'},
						],
					},
				],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`<input 
hello:world|modifierval|modifierval2
/>`,
	);
});

test__stringify_markdown('compiles svelte meta tags', () => {
	const tree: Markdown_Root = {
		type: 'root',
		children: [
			{
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
								},
							},
						],
						shorthand: 'none',
						modifiers: [],
					},
				],
				selfclosing: true,
				children: [],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`<svelte:options 
tag="{null}"
/>`,
	);
});

test__stringify_markdown('compiles sibling nodes', () => {
	const tree: Markdown_Root = {
		type: 'root',
		children: [
			{
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
								},
							},
						],
						shorthand: 'none',
						modifiers: [],
					},
				],
				selfclosing: true,
				children: [],
			},
			{type: 'text', value: '\n\n'},
			{
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
								},
							},
						],
						shorthand: 'none',
						modifiers: [],
					},
				],
				selfclosing: true,
				children: [],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`<svelte:options 
tag="{null}"
/>

<svelte:options 
tag="{null}"
/>`,
	);
});

test__stringify_markdown('compiles child nodes: svelte_meta', () => {
	const tree: Markdown_Root = {
		type: 'root',
		children: [
			{
				type: 'svelte_meta',
				tag: 'self',
				properties: [],
				selfclosing: false,
				children: [
					{type: 'text', value: '\n\t'},
					{
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
										},
									},
								],
								shorthand: 'none',
								modifiers: [],
							},
						],
						selfclosing: true,
						children: [],
					},
					{type: 'text', value: '\n\n'},
					{
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
										},
									},
								],
								shorthand: 'none',
								modifiers: [],
							},
						],
						selfclosing: true,
						children: [],
					},
				],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`<svelte:self >
	<svelte:options 
tag="{null}"
/>

<svelte:options 
tag="{null}"
/></svelte:self>`,
	);
});

test__stringify_markdown('compiles child nodes: svelte_element', () => {
	const tree: Markdown_Root = {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'div',
				properties: [],
				selfclosing: false,
				children: [
					{type: 'text', value: '\n\t'},
					{
						type: 'svelte_element',
						tag: 'input',
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
										},
									},
								],
								shorthand: 'none',
								modifiers: [],
							},
						],
						selfclosing: true,
						children: [],
					},
					{type: 'text', value: '\n\n'},
					{
						type: 'svelte_element',
						tag: 'input',
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
										},
									},
								],
								shorthand: 'none',
								modifiers: [],
							},
						],
						selfclosing: true,
						children: [],
					},
				],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`<div >
	<input 
tag="{null}"
/>

<input 
tag="{null}"
/></div>`,
	);
});

test__stringify_markdown('compiles branching blocks', () => {
	const tree: Markdown_Root = {
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
							value: 'x > 10',
						},
						children: [
							{
								type: 'text',
								value: '\n\t',
							},
							{
								type: 'svelte_element',
								tag: 'p',
								properties: [],
								selfclosing: false,
								children: [
									{
										type: 'text',
										value: 'x is greater than 10',
									},
								],
							},
							{
								type: 'text',
								value: '\n',
							},
						],
					},
					{
						type: 'svelte_branch',
						name: 'else if',
						expression: {
							type: 'svelte_expression',
							value: 'x < 5',
						},
						children: [
							{
								type: 'text',
								value: '\n\t',
							},
							{
								type: 'svelte_element',
								tag: 'p',
								properties: [],
								selfclosing: false,
								children: [
									{
										type: 'text',
										value: 'x is less than 5',
									},
								],
							},
							{
								type: 'text',
								value: '\n',
							},
						],
					},
				],
			},
		],
	};

	assert.is(
		stringify_markdown(tree),
		`{#if x > 10}
	<p >x is greater than 10</p>
{:else if x < 5}
	<p >x is less than 5</p>
{/if}`,
	);
});

test__stringify_markdown('compiles a big thingy', () => {
	const component = stringify_markdown(table_without_positions as Markdown_Root);
	assert.is(component, table_output);
});
test__stringify_markdown.run();
