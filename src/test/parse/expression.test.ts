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

const test__expression = suite('parse-expression');

test__expression('parses a simple expression', () => {
	const {parsed} = parse_node(`{hello}`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_dynamic_content',
		expression: {type: 'svelte_expression', value: 'hello'},
	});
});

test__expression('parses nested braces', () => {
	const {parsed} = parse_node(`{{{{hello}}}}`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_dynamic_content',
		expression: {
			type: 'svelte_expression',
			value: '{{{hello}}}',
		},
	});
});

test__expression('parses nested braces: while ignoring quoted braces: single', () => {
	const {parsed} = parse_node(`{{{{'}'}}}}`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_dynamic_content',
		expression: {
			type: 'svelte_expression',
			value: "{{{'}'}}}",
		},
	});
});

test__expression('handles escaped single-quotes', () => {
	const {parsed} = parse_node("{{{{'}\\''}}}}", parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_dynamic_content',
		expression: {
			type: 'svelte_expression',
			value: "{{{'}\\''}}}",
		},
	});
});

test__expression('parses nested braces: while ignoring quoted braces: double', () => {
	const {parsed} = parse_node(`{{{{"}"}}}}`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_dynamic_content',
		expression: {
			type: 'svelte_expression',
			value: `{{{"}"}}}`,
		},
	});
});

test__expression('handles escaped double-quotes', () => {
	const {parsed} = parse_node('{{{{"}\\""}}}}', parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_dynamic_content',
		expression: {
			type: 'svelte_expression',
			value: '{{{"}\\""}}}',
		},
	});
});

test__expression('parses nested braces: while ignoring quoted braces: backtick', () => {
	const {parsed} = parse_node('{{{{`}`}}}}', parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_dynamic_content',
		expression: {
			type: 'svelte_expression',
			value: '{{{`}`}}}',
		},
	});
});

test__expression('handles escaped backticks', () => {
	const {parsed} = parse_node('{{{{`}\\``}}}}', parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_dynamic_content',
		expression: {
			type: 'svelte_expression',
			value: '{{{`}\\``}}}',
		},
	});
});

test__expression.skip('parses nested braces: while ignoring regex', () => {
	const {parsed} = parse_node('{(/}/gi)}', parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_dynamic_content',
		expression: {
			type: 'svelte_expression',
			value: '(/}/gi)',
		},
	});
});

test__expression.skip('parses nested braces: while ignoring regex', () => {
	const {parsed} = parse_node(`{(/\\/}/gi)}`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_dynamic_content',
		expression: {
			type: 'svelte_expression',
			value: `(/\\/}/gi)`,
		},
	});
});

test__expression('handles quoted slashes', () => {
	const {parsed} = parse_node('{"/}/gi"}', parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_dynamic_content',
		expression: {
			type: 'svelte_expression',
			value: '"/}/gi"',
		},
	});
});

test__expression('ignores nested quotes', () => {
	const {parsed} = parse_node('{{{{`"}`}}}}', parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_dynamic_content',
		expression: {
			type: 'svelte_expression',
			value: '{{{`"}`}}}',
		},
	});
});

test__expression('parses expressions as attribute values', () => {
	const {parsed} = parse_node(`<input hello={value} />`, parser, false)!;

	assert.equal(parsed, {
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
	});
});

test__expression('parses expressions as attribute values: more fancy', () => {
	const {parsed} = parse_node('<input hello={{{{`"}`}}}} />', parser, false)!;

	assert.equal(parsed, {
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
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: '{{{`"}`}}}',
						},
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__expression('parses expressions as attribute values: functions', () => {
	const {parsed} = parse_node('<input hello={() => console.log("hello world")} />', parser, false)!;

	assert.equal(parsed, {
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
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: '() => console.log("hello world")',
						},
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__expression('parses expressions as attribute values: more functions', () => {
	const {parsed} = parse_node(
		'<input hello={(e) => val = val.filter(v => v.map(x => x*2)).reduce(absolutelywhat is this i have no idea) * 2735262 + 123.something("hey")} />',
		parser,
		false,
	)!;

	assert.equal(parsed, {
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
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value:
								'(e) => val = val.filter(v => v.map(x => x*2)).reduce(absolutelywhat is this i have no idea) * 2735262 + 123.something("hey")',
						},
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__expression('parses expressions as attribute values in quotes', () => {
	const {parsed} = parse_node(`<input hello="{value}" />`, parser, false)!;

	assert.equal(parsed, {
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
	});
});

test__expression('parses expressions as attribute values in quotes: many expressions', () => {
	const {parsed} = parse_node(`<input hello="{value}{value}" />`, parser, false)!;

	assert.equal(parsed, {
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
	});
});

test__expression(
	'parses expressions as attribute values in quotes: many expressions with weird spaces',
	() => {
		const {parsed} = parse_node(`<input hello="   {value}   {value}    " />`, parser, false)!;

		assert.equal(parsed, {
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
							value: '   ',
						},
						{
							type: 'svelte_dynamic_content',
							expression: {
								type: 'svelte_expression',
								value: 'value',
							},
						},
						{
							type: 'text',
							value: '   ',
						},
						{
							type: 'svelte_dynamic_content',
							expression: {
								type: 'svelte_expression',
								value: 'value',
							},
						},
						{
							type: 'text',
							value: '    ',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	},
);

test__expression('parses complex attribute values: mix of text and expression', () => {
	const parsed = parse_markdown(`<div style='color: {color};'>{color}</div>`);

	assert.equal(parsed, {
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
				selfclosing: false,
				children: [
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: 'color',
						},
					},
				],
			},
		],
	});
});

test__expression('parses shorthand attribute expressions', () => {
	const {parsed} = parse_node(`<input {value} />`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'input',
		selfclosing: true,
		children: [],
		properties: [
			{
				type: 'svelte_property',
				name: 'value',
				value: [
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: 'value',
						},
					},
				],
				shorthand: 'expression',
				modifiers: [],
			},
		],
	});
});

test__expression('parses many shorthand attribute expressions', () => {
	const {parsed} = parse_node(
		`<input {value} {value_2} val=123 {value_3} on:click={poo} {value_4} />`,
		parser,
		false,
	)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'input',
		selfclosing: true,
		children: [],
		properties: [
			{
				type: 'svelte_property',
				name: 'value',
				value: [
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: 'value',
						},
					},
				],
				shorthand: 'expression',
				modifiers: [],
			},
			{
				type: 'svelte_property',
				name: 'value_2',
				value: [
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: 'value_2',
						},
					},
				],
				shorthand: 'expression',
				modifiers: [],
			},
			{
				type: 'svelte_property',
				name: 'val',
				value: [
					{
						type: 'text',
						value: '123',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
			{
				type: 'svelte_property',
				name: 'value_3',
				value: [
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: 'value_3',
						},
					},
				],
				shorthand: 'expression',
				modifiers: [],
			},
			{
				type: 'svelte_directive',
				name: 'on',
				specifier: 'click',
				value: [
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: 'poo',
						},
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
			{
				type: 'svelte_property',
				name: 'value_4',
				value: [
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: 'value_4',
						},
					},
				],
				shorthand: 'expression',
				modifiers: [],
			},
		],
	});
});

test__expression('parses expressions containing slashes', () => {
	const parsed = parse_markdown(`<text x="{barWidth/2}" y="-4" />`);

	assert.equal(parsed, {
		type: 'root',
		children: [
			{
				type: 'svelte_element',
				tag: 'text',
				properties: [
					{
						type: 'svelte_property',
						name: 'x',
						value: [
							{
								type: 'svelte_dynamic_content',
								expression: {
									type: 'svelte_expression',
									value: 'barWidth/2',
								},
							},
						],
						modifiers: [],
						shorthand: 'none',
					},
					{
						type: 'svelte_property',
						name: 'y',
						value: [
							{
								type: 'text',
								value: '-4',
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
	});
});

test__expression.run();
