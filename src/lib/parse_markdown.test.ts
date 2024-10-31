import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {parse_markdown} from './parse_markdown.js';

test('parses bold italics and code', () => {
	assert.equal(parse_markdown('*bold* _italics_ `code`\n\n'), [
		{
			type: 'Bold',
			children: [{type: 'Text', content: 'bold', start: 1, end: 5}],
			start: 0,
			end: 6,
		},
		{type: 'Text', content: ' ', start: 6, end: 7},
		{
			type: 'Italic',
			children: [{type: 'Text', content: 'italics', start: 8, end: 15}],
			start: 7,
			end: 16,
		},
		{type: 'Text', content: ' ', start: 16, end: 17},
		{type: 'Code', content: 'code', start: 17, end: 23},
		{type: 'Text', content: '\n\n', start: 23, end: 25},
	]);
});

test('parses hashtags and mentions', () => {
	assert.equal(parse_markdown('#hashtag and @mention\n\n'), [
		{type: 'Hashtag', name: 'hashtag', start: 0, end: 8},
		{type: 'Text', content: ' and ', start: 8, end: 13},
		{type: 'Mention', name: 'mention', start: 13, end: 21},
		{type: 'Text', content: '\n\n', start: 21, end: 23},
	]);
});

test('parses absolute links, relative to the current root /', () => {
	assert.equal(parse_markdown('/root/link\n\n'), [
		{type: 'Absolute_Link', href: '/root/link', start: 0, end: 10},
		{type: 'Text', content: '\n\n', start: 10, end: 12},
	]);
});

test('parses relative links, relative to the current path /', () => {
	assert.equal(parse_markdown('./relative/link\n\n'), [
		{type: 'Relative_Link', href: './relative/link', start: 0, end: 15},
		{type: 'Text', content: '\n\n', start: 15, end: 17},
	]);
});

// TODO terminology - network or global? I think I chose "network" for "network-relative" consistency with other kinds
test('parses a `//`-prefixed link at the network level', () => {
	assert.equal(
		parse_markdown('network link - //github.com/ryanatkn/end-user-markdown-sketch\n\n'),
		[
			{type: 'Text', content: 'network link - ', start: 0, end: 15},
			{
				type: 'Global_Link',
				href: '//github.com/ryanatkn/end-user-markdown-sketch',
				start: 15,
				end: 61,
			},
			{type: 'Text', content: '\n\n', start: 61, end: 63},
		],
	);
});

test('parses an `https://`-prefixed link at the network level', () => {
	assert.equal(
		parse_markdown(
			'literal network link - https://github.com/ryanatkn/end-user-markdown-sketch\n\n',
		),
		[
			{
				type: 'Text',
				content: 'literal network link - ',
				start: 0,
				end: 23,
			},
			{
				type: 'Global_Link',
				href: 'https://github.com/ryanatkn/end-user-markdown-sketch',
				start: 23,
				end: 75,
			},
			{type: 'Text', content: '\n\n', start: 75, end: 77},
		],
	);
});

test('parses an `http://`-prefixed link at the network level', () => {
	assert.equal(
		parse_markdown(
			'literal network link - http://github.com/ryanatkn/end-user-markdown-sketch\n\n',
		),
		[
			{
				type: 'Text',
				content: 'literal network link - ',
				start: 0,
				end: 23,
			},
			{
				type: 'Global_Link',
				href: 'http://github.com/ryanatkn/end-user-markdown-sketch',
				start: 23,
				end: 74,
			},
			{type: 'Text', content: '\n\n', start: 74, end: 76},
		],
	);
});

test('parses markdown links', () => {
	assert.equal(parse_markdown('[markdown link](/root/link)\n\n'), [
		{
			type: 'Markdown_Link',
			text: [{type: 'Text', content: 'markdown link', start: 1, end: 14}],
			href: '/root/link',
			start: 0,
			end: 27,
		},
		{type: 'Text', content: '\n\n', start: 27, end: 29},
	]);
});

test('parses an aside element with an anchor link', () => {
	assert.equal(
		parse_markdown(
			'<aside>basic safe <a href="https://wikipedia.org/wiki/HTML">html</a> works</aside>\n\n',
		),
		[
			{
				type: 'Element',
				name: 'aside',
				attributes: [],
				children: [
					{type: 'Text', content: 'basic safe ', start: 7, end: 18},
					{
						type: 'Element',
						name: 'a',
						attributes: [
							{
								type: 'Attribute',
								name: 'href',
								value: [
									{type: 'Text', content: 'https://wikipedia.org/wiki/HTML', start: 27, end: 58},
								],
								start: 21,
								end: 59,
								parent: null,
							},
						],
						children: [{type: 'Text', content: 'html', start: 60, end: 64}],
						start: 18,
						end: 68,
						self_closing: false,
						self_closing_space: null,
						original_syntax: 'html',
					},
					{type: 'Text', content: ' works', start: 68, end: 74},
				],
				start: 0,
				end: 82,
				self_closing: false,
				self_closing_space: null,
				original_syntax: 'html',
			},
			{type: 'Text', content: '\n\n', start: 82, end: 84},
		],
	);
});

test('parses HTML safely for end-users (for now:)', () => {
	assert.equal(
		parse_markdown(
			'<span class="chip success">class</span> is allowed but <span class="chip" style="color: red">style</span> and most other attributes are not yet - it should support a safe and configurable subset of HTML, not every usecase has the same needs\n\n',
		),
		[
			{
				type: 'Element',
				name: 'span',
				attributes: [
					{
						type: 'Attribute',
						name: 'class',
						value: [{type: 'Text', content: 'chip success', start: 13, end: 25}],
						start: 6,
						end: 26,
						parent: null,
					},
				],
				children: [{type: 'Text', content: 'class', start: 27, end: 32}],
				start: 0,
				end: 39,
				self_closing: false,
				self_closing_space: null,
				original_syntax: 'html',
			},
			{type: 'Text', content: ' is allowed but ', start: 39, end: 55},
			{
				type: 'Element',
				name: 'span',
				attributes: [
					{
						type: 'Attribute',
						name: 'class',
						value: [{type: 'Text', content: 'chip', start: 68, end: 72}],
						start: 61,
						end: 73,
						parent: null,
					},
					{
						type: 'Attribute',
						name: 'style',
						value: [{type: 'Text', content: 'color: red', start: 81, end: 91}],
						start: 74,
						end: 92,
						parent: null,
					},
				],
				children: [{type: 'Text', content: 'style', start: 93, end: 98}],
				start: 55,
				end: 105,
				self_closing: false,
				self_closing_space: null,
				original_syntax: 'html',
			},
			{
				type: 'Text',
				content:
					' and most other attributes are not yet - it should support a safe and configurable subset of HTML, not every usecase has the same needs\n\n',
				start: 105,
				end: 242,
			},
		],
	);
});

test('parses HTML without XSS attacks', () => {
	assert.equal(
		parse_markdown(
			'<button onclick="alert(\'hax\')" title="this button tries to hack you with the onclick attribute but the attribute allowlist disallows it">onclick does not work</button>',
		),
		[
			{
				type: 'Element',
				name: 'button',
				attributes: [
					{
						type: 'Attribute',
						name: 'onclick',
						value: [{type: 'Text', content: "alert('hax')", start: 17, end: 29}],
						start: 8,
						end: 30,
						parent: null,
					},
					{
						type: 'Attribute',
						name: 'title',
						value: [
							{
								type: 'Text',
								content:
									'this button tries to hack you with the onclick attribute but the attribute allowlist disallows it',
								start: 38,
								end: 135,
							},
						],
						start: 31,
						end: 136,
						parent: null,
					},
				],
				children: [{type: 'Text', content: 'onclick does not work', start: 137, end: 158}],
				start: 0,
				end: 167,
				self_closing: false,
				self_closing_space: null,
				original_syntax: 'html',
			},
		],
	);
});

test.run();
