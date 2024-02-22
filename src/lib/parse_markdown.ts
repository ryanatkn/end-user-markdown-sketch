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

import type {
	Point,
	Base_Tag,
	Svelte_Meta,
	Property,
	Svelte_Element,
	Directive,
	Text,
	Markdown_Root,
	Svelte_Expression,
	Void_Block,
	Branching_Block,
	Branch,
	Comment,
	Svelte_Dynamic_Content,
	Modifier,
} from '$lib/markdown.js';

export const parse_markdown = (content: string, generate_positions = false): Markdown_Root => {
	const root: Markdown_Root = {
		type: 'root',
		children: parse_siblings(
			content.replace(LINE_BREAKS, LINE_FEED),
			parse_siblings,
			generate_positions,
		)[0],
	};

	// console.log(JSON.stringify(root.children[root.children.length - 1], null, 2));
	if (generate_positions) {
		root.position = {
			start: {column: 1, line: 1, offset: 0},
			end: {...root.children[root.children.length - 1].position!.end},
		};
	}

	return root;
};

export interface Markdown_Parser {
	(...args: Parse_Node_Args): Parse_Return;
}

export type Parse_Return = [Base_Tag[], Point, number];

export interface Parse_Node {
	(...args: Parse_Node_Args): Parse_Result | undefined;
}

export type Parse_Node_Args = [
	value: string,
	parser: Markdown_Parser,
	generate_positions: boolean,
	current_position?: Point | undefined,
];

const parse_siblings: Markdown_Parser = (
	value,
	parser = parse_siblings,
	generate_positions = false,
	current_position = {line: 1, column: 1, offset: 0},
) => {
	const children = [];

	let unchomped = value;
	let position: Point = {...current_position};
	let parsed;
	let index = 0;
	let result;
	while (true) {
		result = parse_node(unchomped, parser, generate_positions, position);
		if (!result) break;
		position = result.position;
		unchomped = result.unchomped;
		parsed = result.parsed;

		index += position.index!;

		children.push(parsed);
		if (unchomped.trim().length === 0) break;
	}

	return [children, position, index];
};

/**
 *
 * @param value - The input value to be parsed
 * @param parser - The parser to use when parsing children, this defaults to `parse_node`
 * @param generate_positions - Generate positional data
 * @param current_position - The current position in the document
 * @returns
 */
export const parse_node: Parse_Node = (value, parser, generate_positions, current_position) => {
	let index = 0;
	let quote_type = '';
	let expr_quote_type = '';
	let closing_tag = '';
	let brace_count = 0;

	const node_stack: Base_Tag[] = [];
	const state: Parse_State[] = [];

	let position: Point = current_position || {
		line: 1,
		column: 1,
		offset: 0,
		index,
	};

	let char = value.charCodeAt(index);

	const chomp = (): void => {
		// newline means new line
		if (char === LINEFEED) {
			position.line++;
			position.column = 1;
		} else {
			// otherwise shift along the column pointer
			position.column++;
		}

		// refers to the current parse
		index++;

		position.offset++;
		// stay in sync
		position.index = index;
		char = value.charCodeAt(index);
	};

	const place = (): Point => ({
		line: position.line,
		column: position.column,
		offset: position.offset,
	});

	let current_state: Parse_State | undefined;

	const pop_state = (): void => {
		state.pop();
		current_state = state[state.length - 1];
	};

	const set_state = (name: Parse_State, replace?: boolean): void => {
		if (replace) state.pop();
		state.push((current_state = name));
	};

	let current_node!: Base_Tag;

	const push_node = (node: Base_Tag): void => {
		node_stack.push((current_node = node));
	};

	const pop_node = () => {
		node_stack.pop();
		current_node = node_stack[node_stack.length - 1];
	};

	let _n: Base_Tag;
	let _n2: Base_Tag;

	while (true) {
		// console.log(value[index], node_stack, state);

		if (value[index] === void 0) {
			if (generate_positions) current_node.position!.end = place();
			break;
		}

		// right at the start
		if (current_state === void 0) {
			if (BLOCK_BRANCH.test(value.substring(index))) {
				if (generate_positions && node_stack.length) current_node.position!.end = place();
				return;
			}

			if (END_TAG_START.test(value.substring(index))) {
				return;
			}

			if (COMMENT_START.test(value.substring(index))) {
				_n = {
					type: 'comment',
					value: '',
				} as Comment;

				if (generate_positions) _n.position = {start: place(), end: EMPTY_POINT};

				push_node(_n);
				set_state(Parse_State.IN_COMMENT);
				chomp();
				chomp();
				chomp();
				chomp();
				continue;
			}
			// "{" => tag
			if (char === OPEN_BRACE) {
				push_node({
					type: 'svelte_dynamic_content',
				});
				if (generate_positions) {
					current_node.position = {start: place(), end: EMPTY_POINT};
				}
				set_state(Parse_State.MAYBE_IN_DYNAMIC_CONTENT);
				chomp();
				continue;
			}

			if (char === OPEN_ANGLE_BRACKET) {
				set_state(Parse_State.IN_START_TAG);
				push_node({
					type: '',
					tag: '',
					properties: [],
					selfclosing: false,
					children: [],
				});
				if (generate_positions) current_node.position = {start: place(), end: EMPTY_POINT};

				chomp();
				continue;
			}
		}

		if (current_state === Parse_State.IN_COMMENT) {
			if (COMMENT_END.test(value.substring(index))) {
				chomp();
				chomp();
				chomp();

				if (generate_positions) current_node.position!.end = place();
				break;
			}

			(current_node as Comment).value += value[index];
			chomp();
			continue;
		}

		if (current_state === Parse_State.MAYBE_IN_DYNAMIC_CONTENT) {
			if (char === SPACE || char === LINEFEED || char === TAB) {
				chomp();
				continue;
			}

			if (char === AT) {
				_n = {
					type: 'svelte_void_block',
					name: '',
					expression: {
						type: 'svelte_expression',
						value: '',
					},
				} as Void_Block;

				if (generate_positions) {
					_n.position = {...current_node.position!};
				}

				pop_node();
				push_node(_n);

				set_state(Parse_State.IN_VOID_BLOCK, true);
				chomp();
				continue;
			}

			if (char === OCTOTHERP) {
				set_state(Parse_State.IN_BRANCHING_BLOCK, true);
				set_state(Parse_State.IN_BRANCHING_BLOCK_NAME);
				chomp();
				continue;
			}

			set_state(Parse_State.IN_DYNAMIC_CONTENT, true);

			continue;
		}

		if (current_state === Parse_State.IN_DYNAMIC_CONTENT) {
			if (char === CLOSE_BRACE) {
				chomp();
				if (generate_positions) {
					current_node.position!.end = place();
				}
				if (node_stack.length === 1) break;

				pop_node();
				pop_state();

				continue;
			}

			const n: Svelte_Expression = {
				type: 'svelte_expression',
				value: '',
			};
			(current_node as Svelte_Dynamic_Content).expression = n;
			push_node(n);

			if (generate_positions) {
				current_node.position = {start: place(), end: EMPTY_POINT};
			}

			set_state(Parse_State.IN_EXPRESSION);
			continue;
		}

		if (current_state === Parse_State.IN_BRANCHING_BLOCK_NAME) {
			if (char === CLOSE_BRACE) {
				// each
				pop_state();

				continue;
			}

			if (char === SPACE) {
				_n = {
					type: 'svelte_branching_block',
					name: (current_node as Svelte_Expression).value,
					branches: [],
				} as Branching_Block;
				_n2 = {
					type: 'svelte_branch',
					name: (current_node as Svelte_Expression).value,
					expression: {
						type: 'svelte_expression',
						value: '',
					},
					children: [],
				} as Branch;
				if (generate_positions) {
					_n.position = {...(current_node as Svelte_Expression).position!};
					_n2.position = {...(current_node as Svelte_Expression).position!};
				}

				pop_node();
				push_node(_n);
				push_node(_n2);

				push_node((_n2 as Branch).expression);
				(_n as Branching_Block).branches.push(_n2 as Branch);
				pop_state();

				continue;
			}

			if (!(current_node as Svelte_Expression).value) {
				current_node.value = '';
			}

			current_node.value += value[index];
			chomp();
			continue;
		}

		if (current_state === Parse_State.IN_BRANCHING_BLOCK_END) {
			if (char === SPACE || char === LINEFEED || char === TAB) {
				// ERROR - NAME AFTER CLOSING BLOCK SLASH
			}

			if (char === CLOSE_BRACE) {
				pop_node();
				chomp();
				if (generate_positions) current_node.position!.end = place();
				if (closing_tag !== (current_node as Branching_Block).name) {
					// ERROR SHOULD BE A MATCHING NAME (current_node.name)
				}

				break;
			}

			closing_tag += value[index];
			chomp();
			continue;
		}

		if (current_state === Parse_State.IN_BRANCHING_BLOCK_BRANCH_NAME) {
			if (
				(char === SPACE && value.substring(index - 4, index + 3) !== 'else if') ||
				char === CLOSE_BRACE
			) {
				_n2 = {
					type: 'svelte_branch',
					name: (current_node as Svelte_Expression).value,
					expression: {
						type: 'svelte_expression',
						value: '',
					},
					children: [],
				} as Branch;
				if (generate_positions) {
					_n2.position = {...(current_node as Svelte_Expression).position!};
				}
				pop_node();
				pop_node();
				(current_node as Branching_Block).branches.push(_n2 as Branch);
				push_node(_n2);
				push_node((_n2 as Branch).expression);

				pop_state();
				continue;
			}

			current_node.value += value[index];
			chomp();

			continue;
		}

		if (current_state === Parse_State.IN_BRANCHING_BLOCK) {
			if (char === CLOSE_BRACE) {
				if ((current_node as Svelte_Expression).type === 'svelte_expression') pop_node();
				chomp();
				set_state(Parse_State.PARSE_CHILDREN);
				continue;
			}

			if (char === SPACE) {
				set_state(Parse_State.IN_EXPRESSION);
				chomp();

				if (generate_positions) current_node.position = {start: place(), end: EMPTY_POINT};

				continue;
			}
		}

		if (current_state === Parse_State.IN_BRANCHING_BLOCK_BRANCH) {
			if (char === COLON) {
				set_state(Parse_State.IN_BRANCHING_BLOCK_BRANCH_NAME, true);

				chomp();
				continue;
			}

			if (char === SLASH) {
				closing_tag = '';
				pop_node();
				set_state(Parse_State.IN_BRANCHING_BLOCK_END, true);
				chomp();
				continue;
			}

			if (char === SPACE || char === LINEFEED || char === TAB) {
				chomp();
				continue;
			}
		}

		if (current_state === Parse_State.IN_VOID_BLOCK) {
			if (char === SPACE) {
				push_node((current_node as Void_Block).expression);
				set_state(Parse_State.IN_EXPRESSION);
				chomp();
				if (generate_positions) current_node.position = {start: place(), end: EMPTY_POINT};
				continue;
			}

			if (char === CLOSE_BRACE) {
				// if (generate_positions)
				// 	// @ts-expect-error
				// 	(current_node as Void_Block).expression.position = {
				// 		start: place(),
				// 		end: place(),
				// 	};

				chomp();
				if (generate_positions) current_node.position!.end = place();

				break;
			}

			(current_node as Void_Block).name += value[index];
			chomp();
			continue;
		}

		if (current_state === Parse_State.IN_START_TAG) {
			if (char === SLASH) return;
			// lowercase characters for element names
			if (char >= LOWERCASE_A && char <= LOWERCASE_Z) {
				current_node.type = 'svelte_element';
				set_state(Parse_State.IN_TAG_NAME);
				continue;
			}

			// uppercase characters for Component names UPPERCASE_A, UPPERCASE_Z
			if (char >= UPPERCASE_A && char <= UPPERCASE_Z) {
				current_node.type = 'svelte_component';
				set_state(Parse_State.IN_TAG_NAME);
				continue;
			}

			if (char === SPACE || char === TAB || char === LINEFEED) {
				chomp();
				continue;
			}
		}

		// we are inside a tags name
		if (current_state === Parse_State.IN_TAG_NAME) {
			if (char === SLASH || (char === CLOSE_ANGLE_BRACKET && void_els.has(current_node.tag!))) {
				set_state(Parse_State.IN_CLOSING_SLASH, true);
				current_node.selfclosing = true;
				if (char === SLASH) chomp();
				continue;
			}
			// space or linefeed put us into the tag body
			if (char === SPACE || char === TAB || char === LINEFEED) {
				set_state(Parse_State.IN_TAG_BODY, true);
				chomp();
				continue;
			}

			if (char === COLON) {
				current_node.type = 'svelte_meta';
				current_node.tag = '';
				chomp();
				continue;
			}

			if (char === CLOSE_ANGLE_BRACKET) {
				set_state(Parse_State.IN_TAG_BODY, true);
				continue;
			}

			(current_node as Svelte_Meta).tag += value[index];
			chomp();
			continue;
		}

		// we are inside a start tag after the name
		if (current_state === Parse_State.IN_TAG_BODY) {
			if (char === OPEN_BRACE) {
				set_state(Parse_State.IN_SHORTHAND_ATTR);
				const _node: Property = {
					type: 'svelte_property',
					name: '',
					value: [
						{
							type: 'svelte_dynamic_content',
							expression: {
								type: 'svelte_expression',
								value: '',
							},
						},
					],
					modifiers: [],
					shorthand: 'expression',
				};

				current_node.properties!.push(_node);
				push_node(_node);
				if (generate_positions) {
					current_node.position = {start: place(), end: EMPTY_POINT};
					(current_node as Property).value[0].position = {
						start: place(),
						end: EMPTY_POINT,
					};
				}
				chomp();

				if (generate_positions) {
					((current_node as Property).value[0] as Svelte_Dynamic_Content).expression.position = {
						start: place(),
						end: EMPTY_POINT,
					};
				}
				continue;
			}
			// letters mean we've hit an attribute
			if (
				(char >= LOWERCASE_A && char <= LOWERCASE_Z) ||
				(char >= UPPERCASE_A && char <= UPPERCASE_Z)
			) {
				set_state(Parse_State.IN_ATTR_NAME);
				const _node: Property = {
					type: 'svelte_property',
					name: '',
					value: [],
					modifiers: [],
					shorthand: 'none',
				};

				current_node.properties!.push(_node);
				push_node(_node);
				if (generate_positions) current_node.position = {start: place(), end: EMPTY_POINT};
				continue;
			}

			// "/" or  ">" (for void tags) put us in a terminal state
			if (char === SLASH || (char === CLOSE_ANGLE_BRACKET && void_els.has(current_node.tag!))) {
				set_state(Parse_State.IN_CLOSING_SLASH, true);
				current_node.selfclosing = true;
				if (char === SLASH) chomp();
				continue;
			}

			if (char === CLOSE_ANGLE_BRACKET) {
				set_state(Parse_State.PARSE_CHILDREN, true);
				chomp();
				if (generate_positions) current_node.position!.end = place();
				continue;
			}

			if (char === SPACE || char === TAB || char === LINEFEED) {
				chomp();
				continue;
			}
		}

		if (current_state === Parse_State.IN_SHORTHAND_ATTR) {
			if (char === CLOSE_BRACE) {
				(current_node as Property).name = (
					(current_node as Property).value[0] as Svelte_Dynamic_Content
				).expression.value;
				if (generate_positions) {
					current_node.position!.end = place();
					(current_node as Property).value[0].position!.end = place();
				}
				pop_state();
				pop_node();
				chomp();
				continue;
			}

			push_node(((current_node as Property).value[0] as Svelte_Dynamic_Content).expression);
			set_state(Parse_State.IN_EXPRESSION);

			continue;
		}

		// we are expecting the tag to close completely here
		if (current_state === Parse_State.IN_CLOSING_SLASH) {
			// ignore ws
			if (char === SPACE || char === TAB || char === LINEFEED) {
				chomp();
				continue;
			}
			// we closed successfully, end the parse
			if (char === CLOSE_ANGLE_BRACKET) {
				chomp();
				if (generate_positions) current_node.position!.end = place();
				break;
			}

			// DANGER ZONE - something went wrong
		}

		// we are parsing a property name
		if (current_state === Parse_State.IN_ATTR_NAME) {
			// " ", "\n", "/" or ">" => shorthand boolean attr

			if (
				char === SPACE ||
				char === TAB ||
				char === LINEFEED ||
				char === SLASH ||
				char === CLOSE_ANGLE_BRACKET
			) {
				(current_node as Property).shorthand = 'boolean';
				if (generate_positions) current_node.position!.end = place();
				pop_state();
				pop_node();
				continue;
			}

			// ":" => directive
			if (char === COLON) {
				(current_node as Directive).type = 'svelte_directive';
				(current_node as Directive).specifier = '';
				set_state(Parse_State.IN_DIRECTIVE_SPECIFIER, true);
				chomp();
				continue;
			}

			if (char === PIPE) {
				chomp();
				_n = {type: 'modifier', value: ''} as Modifier;
				if (generate_positions) _n.position = {start: place(), end: EMPTY_POINT};
				(current_node as Directive).modifiers.push(_n as Modifier);
				push_node(_n);
				set_state(Parse_State.IN_ATTR_MODIFIER, true);
				continue;
			}

			if (char === EQUALS) {
				set_state(Parse_State.IN_ATTR_VALUE, true);
				chomp();
				continue;
			}

			// process the token and chomp, everything is good
			(current_node as Property).name += value[index];
			chomp();
			continue;
		}

		// att values can be quoted or unquoted
		if (current_state === Parse_State.IN_ATTR_VALUE) {
			// ignore whitespace it is valid after `=`

			if (char === SPACE || char === TAB || char === LINEFEED) {
				chomp();
				continue;
			}

			// quoted attr

			if (char === QUOTE || char === APOSTROPHE) {
				set_state(Parse_State.IN_QUOTED_ATTR_VALUE, true);
				quote_type = value[index];

				push_node({type: 'blank'});
				chomp();
				continue;
			}

			set_state(Parse_State.IN_UNQUOTED_ATTR_VALUE, true);

			continue;
		}

		if (current_state === Parse_State.IN_UNQUOTED_ATTR_VALUE) {
			// " ", "\n", "/" or ">" => ends the whole thing
			if (
				char === SPACE ||
				char === TAB ||
				char === LINEFEED ||
				char === CLOSE_ANGLE_BRACKET ||
				CLOSING_TAG.test(value.substring(index))
			) {
				if (current_node.type === 'text') {
					if (generate_positions) current_node.position!.end = place();
					pop_node();
				}

				pop_state();

				if (generate_positions) current_node.position!.end = place();
				pop_node();
				continue;
			}

			if (char === OPEN_BRACE) {
				set_state(Parse_State.IN_DYNAMIC_CONTENT);
				const _n = {
					type: 'svelte_dynamic_content',
				} as Svelte_Dynamic_Content;

				(current_node as Property).value.push(_n);

				push_node(_n);
				// current_node.
				if (generate_positions) {
					current_node.position = {start: place(), end: EMPTY_POINT};
				}
				chomp();
				continue;
			}

			if (current_node.type !== 'text') {
				const _n: Text = {
					type: 'text',
					value: '',
				};

				(current_node as Property).value.push(_n);
				push_node(_n);
				if (generate_positions) {
					current_node.position = {start: place(), end: EMPTY_POINT};
				}
			}

			current_node.value += value[index];

			chomp();
			continue;
		}

		if (current_state === Parse_State.IN_QUOTED_ATTR_VALUE) {
			// if we meet our matching quote the attribute has ended
			if (value[index] === quote_type) {
				chomp();
				if (generate_positions) current_node.position!.end = place();
				pop_node();
				quote_type = '';

				pop_state();

				if (
					current_node.type !== 'svelte_element' &&
					current_node.type !== 'svelte_component' &&
					current_node.type !== 'svelte_meta'
				) {
					if (generate_positions) current_node.position!.end = place();
					pop_node();
				}

				continue;
			}

			if (char === OPEN_BRACE) {
				if (generate_positions && current_node.type !== 'blank')
					current_node.position!.end = place();
				current_node.type !== 'svelte_property' && pop_node();

				_n = {
					type: 'svelte_dynamic_content',
				};
				(current_node as Property).value.push(_n as Svelte_Dynamic_Content);
				if (generate_positions) _n.position = {start: place(), end: EMPTY_POINT};
				push_node(_n);
				set_state(Parse_State.IN_DYNAMIC_CONTENT);
				chomp();
				continue;
			}

			if (char === CLOSE_BRACE) {
				chomp();
				continue;
			}

			// " ", "\n" => still in the attribute value but make a new node
			if (char === SPACE || char === TAB || char === LINEFEED) {
				const _c = current_node as Text | Svelte_Expression;
				if (_c.type === 'text' && ONLY_WHITESPACE.test(_c.value)) {
					_c.value += value[index];
					chomp();
					continue;
				}

				current_node.type !== 'svelte_property' && pop_node();
				_n = {type: 'text', value: value[index]};

				if (generate_positions) _n.position = {start: place(), end: EMPTY_POINT};
				(current_node as Property).value.push(_n as Text);
				push_node(_n);
				chomp();
				continue;
			}

			if (value.charCodeAt(index - 1) === CLOSE_BRACE) {
				current_node.type !== 'svelte_property' && pop_node();
				_n = {type: 'text', value: value[index]};
				if (generate_positions) _n.position = {start: place(), end: EMPTY_POINT};
				(current_node as Property).value.push(_n as Text);
				push_node(_n);
				chomp();
				continue;
			}

			if (
				(current_node as Text).type === 'text' &&
				ONLY_WHITESPACE.test((current_node as Text).value)
			) {
				pop_node();
				_n = {type: 'text', value: ''};
				if (generate_positions) _n.position = {start: place(), end: EMPTY_POINT};
				(current_node as Property).value.push(_n as Text);
				push_node(_n);
			} else if (current_node.type === 'blank') {
				pop_node();
				_n = {type: 'text', value: ''};
				if (generate_positions) _n.position = {start: place(), end: EMPTY_POINT};
				(current_node as Property).value.push(_n as Text);
				push_node(_n);
			}

			// capture the token otherwise
			current_node.value += value[index];

			chomp();
			continue;
		}

		if (current_state === Parse_State.IN_DIRECTIVE_SPECIFIER) {
			if (char === EQUALS) {
				set_state(Parse_State.IN_ATTR_VALUE, true);
				chomp();
				continue;
			}

			if (char === PIPE) {
				_n = {type: 'modifier', value: ''};
				if (generate_positions) _n.position = {start: place(), end: EMPTY_POINT};
				(current_node as Directive).modifiers.push(_n as Modifier);
				push_node(_n);
				set_state(Parse_State.IN_ATTR_MODIFIER, true);
				chomp();
				continue;
			}

			// " ", "\n", "/" or ">" => ends the whole thing
			if (
				char === SPACE ||
				char === TAB ||
				char === LINEFEED ||
				char === SLASH ||
				char === CLOSE_ANGLE_BRACKET
			) {
				if (generate_positions) current_node.position!.end = place();
				pop_state();
				pop_node();
				continue;
			}

			(current_node as Directive).specifier += value[index];
			chomp();
			continue;
		}

		if (current_state === Parse_State.IN_ATTR_MODIFIER) {
			if (char === PIPE) {
				pop_node();
				_n = {type: 'modifier', value: ''};
				if (generate_positions) _n.position = {start: place(), end: EMPTY_POINT};
				(current_node as Directive).modifiers.push(_n as Modifier);
				push_node(_n);
				chomp();
				continue;
			}

			if (char === EQUALS) {
				set_state(Parse_State.IN_ATTR_VALUE, true);
				pop_node();
				chomp();
				continue;
			}

			if (
				char === SLASH ||
				char === CLOSE_ANGLE_BRACKET ||
				((value.charCodeAt(index - 1) === SPACE ||
					value.charCodeAt(index - 1) === TAB ||
					value.charCodeAt(index - 1) === LINEFEED) &&
					((char >= LOWERCASE_A && char <= LOWERCASE_Z) ||
						(char >= UPPERCASE_A && char <= UPPERCASE_Z)))
			) {
				pop_node();
				pop_node();
				pop_state();
				continue;
			}

			if (char === SPACE || char === TAB || char === LINEFEED) {
				chomp();
				continue;
			}

			(current_node as Modifier).value += value[index];
			chomp();
			continue;
		}

		if (current_state === Parse_State.IN_SCRIPT_STYLE) {
			if (char === OPEN_ANGLE_BRACKET) {
				if (SCRIPT_STYLE.test(value.substring(index))) {
					if (generate_positions) current_node.position!.end = place();
					pop_node();
					set_state(Parse_State.EXPECT_END_OR_BRANCH, true);
					continue;
				}
			}

			(current_node as Svelte_Meta).value += value[index];
			chomp();
			continue;
		}

		if (current_state === Parse_State.PARSE_CHILDREN) {
			if (
				(current_node as Svelte_Element | Svelte_Meta).tag === 'script' ||
				(current_node as Svelte_Element | Svelte_Meta).tag === 'style'
			) {
				current_node.type = 'svelteS' + current_node.tag!.substring(1);
				_n = {
					type: 'text',
					value: '',
				};
				if (generate_positions) _n.position = {start: place(), end: EMPTY_POINT};
				(current_node as Svelte_Meta).children!.push(_n as Text);
				push_node(_n);

				set_state(Parse_State.IN_SCRIPT_STYLE, true);
				continue;
			} else {
				const result = parser(value.substring(index), parser, generate_positions, position);

				current_node.children = result[0];
				const _index = position.index! + result[2];

				position = {...result[1]};
				position.index = _index;
				index = position.index;
				char = value.charCodeAt(index);
			}

			set_state(Parse_State.EXPECT_END_OR_BRANCH, true);
		}

		if (current_state === Parse_State.EXPECT_END_OR_BRANCH) {
			if (BLOCK_BRANCH.test(value.substring(index))) {
				set_state(Parse_State.IN_BRANCHING_BLOCK_BRANCH, true);
				_n = {
					type: 'text',
					value: '',
				};

				if (generate_positions) {
					_n.position = {start: place(), end: EMPTY_POINT};
				}

				if (generate_positions) current_node.position!.end = place();
				push_node(_n);
				chomp();
				continue;
			}

			if (char === OPEN_ANGLE_BRACKET) {
				chomp();
				continue;
			}

			if (char === SLASH) {
				chomp();
				continue;
			}

			if (char === SPACE) {
				chomp();
				continue;
			}

			if (char === CLOSE_ANGLE_BRACKET) {
				chomp();

				if (generate_positions) {
					current_node.position!.end = place();
				}

				let current_node_name = closing_tag;

				if (current_node.type === 'svelte_meta') {
					current_node_name = current_node_name.replace('svelte:', '');
				}

				if (current_node_name !== current_node.tag) {
					// TODO emit errors
					console.log(
						`Was expecting a closing tag for ${current_node.tag} but got ${closing_tag}`,
						JSON.stringify(current_node.position),
					);
				}

				break;
			}

			closing_tag += value[index];
			chomp();
			continue;
		}

		if (current_state === Parse_State.IN_TEXT) {
			if (char === OPEN_ANGLE_BRACKET || char === OPEN_BRACE) {
				if (generate_positions) current_node.position!.end = place();
				break;
			}

			current_node.value += value[index];
			chomp();
			continue;
		}

		if (current_state === Parse_State.IN_EXPRESSION) {
			if (expr_quote_type === '' && char === CLOSE_BRACE) {
				if (brace_count === 0) {
					if (generate_positions) {
						current_node.position!.end = place();
					}

					pop_node();
					pop_state();

					continue;
				}
				brace_count--;
			}

			if (expr_quote_type === '' && char === OPEN_BRACE) {
				brace_count++;
			}

			if (expr_quote_type === '' && (char === APOSTROPHE || char === QUOTE || char === BACKTICK)) {
				set_state(Parse_State.IN_EXPRESSION_QUOTE);
				expr_quote_type = value[index];
				current_node.value += value[index];
				chomp();
				continue;
			}

			current_node.value += value[index];
			chomp();
			continue;
		}

		if (current_state === Parse_State.IN_EXPRESSION_QUOTE) {
			if (value[index] === expr_quote_type && value.charCodeAt(index - 1) !== BACKSLASH) {
				expr_quote_type = '';
				current_node.value += value[index];
				chomp();
				pop_state();
				continue;
			}

			current_node.value += value[index];
			chomp();
			continue;
		}

		set_state(Parse_State.IN_TEXT);
		_n = {
			type: 'text',
			value: '',
		};

		push_node(_n);
		if (generate_positions) _n.position = {start: place(), end: EMPTY_POINT};
	}

	return {
		chomped: value.substring(0, index),
		unchomped: value.substring(index),
		parsed: node_stack[0],
		position,
	};
};

const TAB = 9; // "\t"
const LINEFEED = 10; // "\n"
const SPACE = 32; // " "
const QUOTE = 34; // "'"
const OCTOTHERP = 35; // "#"
const APOSTROPHE = 39; // "'"
// const DASH = 45; // "-"
// const DOT = 46; // "."
const SLASH = 47; // "/"
const COLON = 58; // ":"
const OPEN_ANGLE_BRACKET = 60; // "<"
const EQUALS = 61; // "="
const CLOSE_ANGLE_BRACKET = 62; // ">"
const AT = 64; // "@"
const OPEN_BRACE = 123; // "{"
const CLOSE_BRACE = 125; // "}"
const UPPERCASE_A = 65; // "A"
const UPPERCASE_Z = 90; // "Z"
const BACKSLASH = 92; // "\"
const BACKTICK = 96;
const LOWERCASE_A = 97; // "A"
const LOWERCASE_Z = 122; // "Z"
const PIPE = 124; // "|"
// eslint-disable-next-line require-unicode-regexp
const BLOCK_BRANCH = /^{\s*(?::|\/)/; // TODO client.ts:112 SyntaxError: Invalid regular expression: /^{\s*(?::|\/)/u: Lone quantifier brackets
const SCRIPT_STYLE = /^<\/(?:script|style)\s*>/u;
const COMMENT_START = /^<!--/u;
const COMMENT_END = /^-->/u;
const END_TAG_START = /^<\s*\//u;
const ONLY_WHITESPACE = /^\s*$/u;

const CLOSING_TAG = /^\/\s*>/u;
const LINE_BREAKS = /\r\n|\r/gu;
const LINE_FEED = '\n';

const EMPTY_POINT: Point = {
	line: 0,
	column: 0,
	offset: 0,
};

export interface Parse_Result {
	/**
	 * The chomped string, what has been parsed. This is a substring of the input value.
	 */
	chomped: string;

	/**
	 * The unchomped string, what is still left to parse. This is a substring of the input value.
	 */
	unchomped: string;

	/**
	 * The AST node. The result of the parse.
	 */
	parsed: Base_Tag;
	/**
	 * The location in the document where the parse finished. This can be passed back into the parse_node function to maintain positional information on subsequent passes.
	 */
	position: Point;
}

export interface Parse_Options {
	/**
	 * Generate positional data
	 */
	generate_positions: boolean;
}

export const enum Parse_State {
	IN_START_TAG,
	IN_TAG_NAME,
	IN_TAG_BODY,
	IN_SHORTHAND_ATTR,
	IN_ATTR_NAME,
	IN_DIRECTIVE_SPECIFIER,
	IN_ATTR_MODIFIER,
	START_ATTR_VALUE,
	IN_ATTR_VALUE,
	IN_UNQUOTED_ATTR_VALUE,
	IN_QUOTED_ATTR_VALUE,
	IN_ATTR_EXPRESSION,
	IN_CLOSING_SLASH,
	IN_CLOSE_TAG,
	IN_DYNAMIC_CONTENT,
	IN_EXPRESSION,
	PARSE_CHILDREN,
	EXPECT_END_OR_BRANCH,
	IN_TEXT,
	IN_EXPRESSION_QUOTE,
	MAYBE_IN_DYNAMIC_CONTENT,
	IN_VOID_BLOCK,
	IN_BRANCHING_BLOCK,
	IN_BRANCHING_BLOCK_BRANCH,
	IN_BRANCHING_BLOCK_END,
	IN_BRANCHING_BLOCK_NAME,
	IN_BRANCHING_BLOCK_BRANCH_NAME,
	IN_SCRIPT_STYLE,
	IN_COMMENT,
}

export const void_els: Set<string> = new Set([
	'area',
	'base',
	'basefont',
	'bgsound',
	'br',
	'col',
	'command',
	'embed',
	'frame',
	'hr',
	'image',
	'img',
	'input',
	'isindex',
	'keygen',
	'link',
	'menuitem',
	'meta',
	'nextid',
	'param',
	'source',
	'track',
	'wbr',
]);
