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

import {parse_node, void_els, type Markdown_Parser} from '$lib/parse_markdown.js';

const parser: Markdown_Parser = () => [
	[{type: 'fake'}],
	{line: 1, column: 1, offset: 0, index: 0},
	0,
];

const test__element = suite('parse-element');

test__element('parses a self closing tag without attributes', () => {
	const {parsed} = parse_node(`<input />`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'input',
		selfclosing: true,
		children: [],
		properties: [],
	});
});

test__element('parses self closing elements with no whistespace after tag', () => {
	const {parsed} = parse_node(`<div/>`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'div',
		selfclosing: true,
		children: [],
		properties: [],
	});
});

test__element('parses a self closing tag without attributes: space before name', () => {
	const {parsed} = parse_node(`<       input />`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'input',
		selfclosing: true,
		children: [],
		properties: [],
	});
});

test__element('parses a self closing tag without attributes: space after name', () => {
	const {parsed} = parse_node(`<       input       />`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'input',
		selfclosing: true,
		children: [],
		properties: [],
	});
});

test__element('parses a self closing tag without attributes: space after closeing slash', () => {
	const {parsed} = parse_node(`<       input       /                >`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'input',
		selfclosing: true,
		children: [],
		properties: [],
	});
});

test__element('parses a self closing component without attributes', () => {
	const {parsed} = parse_node(`<HelloFriend />`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_component',
		tag: 'HelloFriend',
		selfclosing: true,
		children: [],
		properties: [],
	});
});

Object.keys(void_els).forEach((el) => {
	test__element(`parses all void tags without attributes: < ${el} >`, () => {
		const {parsed} = parse_node(`<${el} >`, parser, false)!;

		assert.equal(parsed, {
			type: 'svelte_element',
			tag: el,
			selfclosing: true,
			children: [],
			properties: [],
		});
	});
});

test__element('parses attribute values containing colons', () => {
	const {parsed} = parse_node(`<a href=https://www.google.com />`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'a',
		selfclosing: true,
		children: [],
		properties: [
			{
				type: 'svelte_property',
				name: 'href',
				value: [
					{
						type: 'text',
						value: 'https://www.google.com',
					},
				],
				modifiers: [],
				shorthand: 'none',
			},
		],
	});
});

test__element('parses a self closing tag with shorthand boolean attribute', () => {
	const {parsed} = parse_node(`<input hello />`, parser, false)!;

	assert.equal(parsed, {
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
		],
	});
});

test__element('parses a self closing tag with shorthand boolean attribute: weird spacing', () => {
	const {parsed} = parse_node(`<input         hello         /        >`, parser, false)!;

	assert.equal(parsed, {
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
		],
	});
});

test__element(
	'parses a self closing tag with shorthand boolean attribute: no trailing space',
	() => {
		const {parsed} = parse_node(`<input hello/>`, parser, false)!;

		assert.equal(parsed, {
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
			],
		});
	},
);

test__element('parses a void tag with shorthand boolean attribute: no trailing space', () => {
	const {parsed} = parse_node(`<input hello>`, parser, false)!;

	assert.equal(parsed, {
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
		],
	});
});

test__element(
	'parses a self-closing tag with multiple shorthand boolean attributes: trailing space',
	() => {
		const {parsed} = parse_node(`<input hello goodbye />`, parser, false)!;

		assert.equal(parsed, {
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
		});
	},
);

test__element(
	'parses a self-closing tag with multiple shorthand boolean attributes: weird spacing',
	() => {
		const {parsed} = parse_node(
			`<         input         hello           goodbye       /           >`,
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
		});
	},
);

test__element(
	'parses a self-closing tag with multiple shorthand boolean attributes: no trailing space',
	() => {
		const {parsed} = parse_node(`<input hello goodbye/>`, parser, false)!;

		assert.equal(parsed, {
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
		});
	},
);

test__element(
	'parses a void tag with multiple shorthand boolean attributes: no trailing space',
	() => {
		const {parsed} = parse_node(`<input hello goodbye>`, parser, false)!;

		assert.equal(parsed, {
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
		});
	},
);

test__element(
	'parses a void tag with multiple shorthand boolean attributes: trailing space',
	() => {
		const {parsed} = parse_node(`<input hello goodbye >`, parser, false)!;

		assert.equal(parsed, {
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
		});
	},
);

test__element('parses a self-closing tag with an unquoted attribute: trailing space', () => {
	const {parsed} = parse_node(`<input hello=value />`, parser, false)!;

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
						value: 'value',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a self-closing tag with an unquoted attribute: no trailing space', () => {
	const {parsed} = parse_node(`<input hello=value/>`, parser, false)!;

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
						value: 'value',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a void tag with an unquoted attribute: trailing space', () => {
	const {parsed} = parse_node(`<input hello=value >`, parser, false)!;

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
						value: 'value',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a self-closing tag with an unquoted attribute: no trailing space', () => {
	const {parsed} = parse_node(`<input hello=value>`, parser, false)!;

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
						value: 'value',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a self-closing tag with a double-quoted attribute: trailing space', () => {
	const {parsed} = parse_node(`<input hello="value" />`, parser, false)!;

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
						value: 'value',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a self-closing tag with a double-quoted attribute: no trailing space', () => {
	const {parsed} = parse_node(`<input hello="value"/>`, parser, false)!;

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
						value: 'value',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a void tag with a double-quoted attribute: trailing space', () => {
	const {parsed} = parse_node(`<input hello="value" >`, parser, false)!;

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
						value: 'value',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a void tag with a double-quoted attribute: no trailing space', () => {
	const {parsed} = parse_node(`<input hello="value">`, parser, false)!;

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
						value: 'value',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element(
	'parses a self-closing tag with double-quoted attributes: many values, trailing whitespace',
	() => {
		const {parsed} = parse_node(`<input hello="value valuetwo" />`, parser, false)!;

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
							value: 'value',
						},
						{
							type: 'text',
							value: ' ',
						},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	},
);

test__element(
	'parses a self-closing tag with double-quoted attributes: many values, no trailing whitespace',
	() => {
		const {parsed} = parse_node(`<input hello="value valuetwo"/>`, parser, false)!;

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
							value: 'value',
						},
						{type: 'text', value: ' '},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	},
);

test__element(
	'parses a void tag with double-quoted attributes: many values, trailing whitespace',
	() => {
		const {parsed} = parse_node(`<input hello="value valuetwo" >`, parser, false)!;

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
							value: 'value',
						},
						{type: 'text', value: ' '},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	},
);

test__element(
	'parses a void tag with double-quoted attributes: many values, no trailing whitespace',
	() => {
		const {parsed} = parse_node(`<input hello="value valuetwo">`, parser, false)!;

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
							value: 'value',
						},
						{type: 'text', value: ' '},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	},
);

test__element('parses a self-closing tag with a single-quoted attribute: trailing space', () => {
	const {parsed} = parse_node(`<input hello='value' />`, parser, false)!;

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
						value: 'value',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a self-closing tag with a single-quoted attribute: no trailing space', () => {
	const {parsed} = parse_node(`<input hello='value'/>`, parser, false)!;

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
						value: 'value',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a void tag with a single-quoted attribute: trailing space', () => {
	const {parsed} = parse_node(`<input hello='value' >`, parser, false)!;

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
						value: 'value',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a void tag with a single-quoted attribute: no trailing space', () => {
	const {parsed} = parse_node(`<input hello='value'>`, parser, false)!;

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
						value: 'value',
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element(
	'parses a self-closing tag with single-quoted attributes: many values, trailing whitespace',
	() => {
		const {parsed} = parse_node(`<input hello='value valuetwo' />`, parser, false)!;

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
							value: 'value',
						},
						{type: 'text', value: ' '},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	},
);

test__element(
	'parses a self-closing tag with single-quoted attributes: many values, no trailing whitespace',
	() => {
		const {parsed} = parse_node(`<input hello='value valuetwo'/>`, parser, false)!;

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
							value: 'value',
						},
						{type: 'text', value: ' '},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	},
);

test__element(
	'parses a void tag with single-quoted attributes: many values, trailing whitespace',
	() => {
		const {parsed} = parse_node(`<input hello='value valuetwo' >`, parser, false)!;

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
							value: 'value',
						},
						{type: 'text', value: ' '},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	},
);

test__element(
	'parses a void tag with single-quoted attributes: many values, no trailing whitespace',
	() => {
		const {parsed} = parse_node(`<input hello='value valuetwo'>`, parser, false)!;

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
							value: 'value',
						},
						{type: 'text', value: ' '},
						{
							type: 'text',
							value: 'valuetwo',
						},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	},
);

test__element('parses a void tag with a directive', () => {
	const {parsed} = parse_node(`<input hello:world >`, parser, false)!;

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
				value: [],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a self-closing tag with a directive', () => {
	const {parsed} = parse_node(`<input hello:world />`, parser, false)!;

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
				value: [],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a self-closing tag with two directives', () => {
	const {parsed} = parse_node(`<input hello:world goodbye:friends />`, parser, false)!;

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
				value: [],
				shorthand: 'none',
				modifiers: [],
			},
			{
				type: 'svelte_directive',
				name: 'goodbye',
				specifier: 'friends',
				value: [],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a tag with a directive an a directive value: double-quoted', () => {
	const {parsed} = parse_node(`<input hello:world="cheese" />`, parser, false)!;

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
				value: [{type: 'text', value: 'cheese'}],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element(
	'parses a tag with a directive an a directive value: double-quoted, two values',
	() => {
		const {parsed} = parse_node(`<input hello:world="cheese strings" />`, parser, false)!;

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
					value: [
						{type: 'text', value: 'cheese'},
						{type: 'text', value: ' '},
						{type: 'text', value: 'strings'},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	},
);

test__element(
	'parses a tag with a directive an a directive value: single-quoted, two values',
	() => {
		const {parsed} = parse_node(`<input hello:world='cheese strings' />`, parser, false)!;

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
					value: [
						{type: 'text', value: 'cheese'},
						{type: 'text', value: ' '},
						{type: 'text', value: 'strings'},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	},
);

test__element(
	'parses a tag with a directive an a directive value: single-quoted, two values, many spaces',
	() => {
		const {parsed} = parse_node(`<input hello:world='cheese      strings' />`, parser, false)!;

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
					value: [
						{type: 'text', value: 'cheese'},
						{type: 'text', value: '      '},
						{type: 'text', value: 'strings'},
					],
					shorthand: 'none',
					modifiers: [],
				},
			],
		});
	},
);

test__element('parses a tag with a directive an a directive value: unquoted', () => {
	const {parsed} = parse_node(`<input hello:world="cheese" />`, parser, false)!;

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
				value: [{type: 'text', value: 'cheese'}],
				shorthand: 'none',
				modifiers: [],
			},
		],
	});
});

test__element('parses a tag with a directive with modifiers', () => {
	const {parsed} = parse_node(`<input hello:world|modifierval />`, parser, false)!;

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
				value: [],
				shorthand: 'none',
				modifiers: [{type: 'modifier', value: 'modifierval'}],
			},
		],
	});
});

test__element('parses a tag with a directive with modifier but no value', () => {
	const {parsed} = parse_node(`<a on:click|preventDefault booleanAttribute/>`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'a',
		selfclosing: true,
		children: [],
		properties: [
			{
				type: 'svelte_directive',
				name: 'on',
				specifier: 'click',
				value: [],
				shorthand: 'none',
				modifiers: [{type: 'modifier', value: 'preventDefault'}],
			},
			{
				type: 'svelte_property',
				name: 'booleanAttribute',
				value: [],
				shorthand: 'boolean',
				modifiers: [],
			},
		],
	});
});

test__element('parses a tag with a directive with multiple modifiers', () => {
	const {parsed} = parse_node(`<input hello:world|modifierval|modifierval2 />`, parser, false)!;

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
				value: [],
				shorthand: 'none',
				modifiers: [
					{type: 'modifier', value: 'modifierval'},
					{type: 'modifier', value: 'modifierval2'},
				],
			},
		],
	});
});

test__element('parses a tag with a directive with modifiers', () => {
	const {parsed} = parse_node(`<input hello|modifierval />`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'input',
		selfclosing: true,
		children: [],
		properties: [
			{
				type: 'svelte_property',
				name: 'hello',
				value: [],
				shorthand: 'none',
				modifiers: [{type: 'modifier', value: 'modifierval'}],
			},
		],
	});
});

test__element('parses a tag with a directive with multiple modifiers', () => {
	const {parsed} = parse_node(`<input hello|modifierval|modifierval2 />`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'input',
		selfclosing: true,
		children: [],
		properties: [
			{
				type: 'svelte_property',
				name: 'hello',
				value: [],
				shorthand: 'none',
				modifiers: [
					{type: 'modifier', value: 'modifierval'},
					{type: 'modifier', value: 'modifierval2'},
				],
			},
		],
	});
});

test__element('parses a tag with an attribute with multiple modifiers and a value', () => {
	const {parsed} = parse_node(
		`<input hello:world|modifierval|modifierval2=someval />`,
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
});

test__element(
	'parses a tag with an attribute with multiple modifiers and a value: weird spacing',
	() => {
		const {parsed} = parse_node(
			`<      input      hello:world|modifierval|modifierval2   =   someval    /    >`,
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

test__element(
	'parses a tag with an attribute with multiple modifiers and a value: weird spacing, double-quotes',
	() => {
		const {parsed} = parse_node(
			`<      input      hello:world|modifierval|modifierval2   =   "someval"    /    >`,
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

test__element(
	'parses a tag with an attribute with multiple modifiers and a value: weird spacing and newlines',
	() => {
		const {parsed} = parse_node(
			`<      
			input      
			
			hello:world|modifierval|modifierval2   
			=   
			"someval"    
			/    
			>`,
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

test__element('parses text', () => {
	const {parsed} = parse_node(`hail`, parser, false)!;

	assert.equal(parsed, {
		type: 'text',
		value: 'hail',
	});
});

test__element('parses quoted attribute expressions with space', () => {
	const {parsed} = parse_node(`<button disabled="{!first || !last}" />`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_element',
		tag: 'button',
		properties: [
			{
				type: 'svelte_property',
				name: 'disabled',
				value: [
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: '!first || !last',
						},
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
		selfclosing: true,
		children: [],
	});
});

test__element('parses svelte special elements', () => {
	const {parsed} = parse_node(`<svelte:options tag={null} />`, parser, false)!;

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
						},
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
		selfclosing: true,
		children: [],
	});
});

test__element('parses svelte special elements', () => {
	const {parsed} = parse_node(`<svelte:options tag={null} />`, parser, false)!;

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
						},
					},
				],
				shorthand: 'none',
				modifiers: [],
			},
		],
		selfclosing: true,
		children: [],
	});
});

test__element('parses html comments: no spaces', () => {
	const {parsed} = parse_node(`<!--comment text-->`, parser, false)!;

	assert.equal(parsed, {
		type: 'comment',
		value: 'comment text',
	});
});

test__element('parses html comments: spaces and newlines', () => {
	const {parsed} = parse_node(
		`<!--


		comment text  
		
		
-->`,
		parser,
		false,
	)!;

	assert.equal(parsed, {
		type: 'comment',
		value: '\n\n\n\t\tcomment text  \n\t\t\n\t\t\n',
	});
});

//

test__element('parses shorthand expressions: failing test case', () => {
	const {parsed} = parse_node(`<Avatar alt="{initials}" {size}></Avatar>`, parser, false)!;

	assert.equal(parsed, {
		type: 'svelte_component',
		tag: 'Avatar',
		properties: [
			{
				type: 'svelte_property',
				name: 'alt',
				modifiers: [],
				shorthand: 'none',
				value: [
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: 'initials',
						},
					},
				],
			},
			{
				type: 'svelte_property',
				name: 'size',
				modifiers: [],
				shorthand: 'expression',
				value: [
					{
						type: 'svelte_dynamic_content',
						expression: {
							type: 'svelte_expression',
							value: 'size',
						},
					},
				],
			},
		],
		children: [{type: 'fake'}],
		selfclosing: false,
	});
});

test__element.run();
