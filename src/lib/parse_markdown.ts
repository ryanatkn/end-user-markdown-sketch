/*

parse_markdown.ts

Parser for a custom language that extends
Svelte and HTML with some Markdown and Markdown-like features.

## Features

- bold text is implemented with *single asterisks* -
	double asterisks like **this** are plain text
- italics are implemented with _single underscores_ -
	like with asterisks, double underscores like __this__ are plain text
- prefixes are supported like @mentions and #hashtags and /absolute_links and //global_links
- Windows is ignored, so carriage returns like `\r\n` are not used, only `\n`

## Style guide

Notice the code style uses `#`-prefixed identifiers for private methods and properties.
It does NOT use the TypeScript `private` prefix, nor should it -
generated code MUST use the `#` prefix and NOT the `private` keyword.
All identifiers use `snake_case` including `Title_Snakes` for type and class names.

*/
export const parse_markdown = (text: string): Parsed_Node[] => new Parser(text).parse();

export type Parsed_Node =
	| Code_Node
	| Code_Block_Node
	| Bold_Node
	| Italic_Node
	| Mention_Node
	| Hashtag_Node
	| Absolute_Link_Node
	| Global_Link_Node
	| Regular_Element_Node
	| Component_Node
	| Expression_Node
	| Text_Node
	| Attribute_Node
	| Markdown_Link_Node
	| Blockquote_Node
	| List_Node
	| List_Item_Node;

export interface Base_Node {
	type: string;
	start: number;
	end: number;
}

export interface Code_Node extends Base_Node {
	type: 'Code';
	content: string;
}

export interface Code_Block_Node extends Base_Node {
	type: 'Code_Block';
	content: string;
	language: string | null;
	fence: string;
	leading_whitespace: string;
	trailing_whitespace: string;
}

export interface Bold_Node extends Base_Node {
	type: 'Bold';
	children: Parsed_Node[];
}

export interface Italic_Node extends Base_Node {
	type: 'Italic';
	children: Parsed_Node[];
}

export interface Mention_Node extends Base_Node {
	type: 'Mention';
	name: string;
}

export interface Hashtag_Node extends Base_Node {
	type: 'Hashtag';
	name: string;
}

export interface Absolute_Link_Node extends Base_Node {
	type: 'Absolute_Link';
	href: string;
}

export interface Global_Link_Node extends Base_Node {
	type: 'Global_Link';
	href: string;
}

export interface Regular_Element_Node extends Base_Node {
	type: 'Regular_Element';
	name: string;
	attributes: Attribute_Node[];
	children: Parsed_Node[];
	self_closing: boolean;
	self_closing_space: boolean;
	original_syntax: 'html' | 'markdown';
}

export interface Component_Node extends Base_Node {
	type: 'Component';
	name: string;
	attributes: Attribute_Node[];
	children: Parsed_Node[];
	self_closing: boolean;
	self_closing_space: boolean;
	original_syntax: 'html' | 'markdown';
}

export interface Expression_Node extends Base_Node {
	type: 'Expression';
	content: string;
}

export interface Text_Node extends Base_Node {
	type: 'Text';
	content: string;
}

export interface Attribute_Node extends Base_Node {
	type: 'Attribute';
	name: string;
	value: Text_Node[];
	parent: Regular_Element_Node | Component_Node | null;
}

export interface Markdown_Link_Node extends Base_Node {
	type: 'Markdown_Link';
	text: Parsed_Node[];
	href: string;
}

export interface Blockquote_Node extends Base_Node {
	type: 'Blockquote';
	children: Parsed_Node[];
	original_syntax: 'html' | 'markdown';
}

export interface List_Node extends Base_Node {
	type: 'List';
	items: List_Item_Node[];
	indent_level: number;
	indent_text: string;
}

export interface List_Item_Node extends Base_Node {
	type: 'List_Item';
	children: Parsed_Node[];
}

export class Parser {
	#index: number = 0;

	constructor(protected template: string) {}

	parse(): Parsed_Node[] {
		const nodes: Parsed_Node[] = [];
		while (this.#index < this.template.length) {
			if (this.#match_list()) {
				const list = this.#parse_list(0);
				nodes.push(list);

				// After parsing a list, consume any remaining blank lines and add them as Text nodes
				let newlines = '';
				while (this.#match('\n')) {
					newlines += '\n';
					this.#eat('\n');
				}
				if (newlines) {
					nodes.push({
						type: 'Text',
						content: newlines,
						start: this.#index - newlines.length,
						end: this.#index,
					});
				}
			} else {
				const node = this.#parse_node();
				if (node.type === 'Text' && nodes.length > 0 && nodes[nodes.length - 1].type === 'Text') {
					const last_node = nodes[nodes.length - 1] as Text_Node;
					last_node.content += node.content;
					last_node.end = node.end;
				} else {
					nodes.push(node);
				}
			}
		}
		return nodes;
	}

	#parse_node(): Parsed_Node {
		if (this.#match('> ')) {
			return this.#parse_blockquote();
		} else if (this.#match_list()) {
			return this.#parse_list(0);
		} else if (this.#match_code_block()) {
			return this.#parse_code_block();
		} else if (this.#match('`')) {
			return this.#parse_code();
		} else if (this.#match('*')) {
			return this.#parse_asterisk();
		} else if (this.#match('_')) {
			return this.#parse_underscore();
		} else if (this.#match('@')) {
			return this.#parse_mention();
		} else if (this.#match('#')) {
			return this.#parse_hashtag();
		} else if (this.#match('[')) {
			return this.#parse_markdown_link();
		} else if (this.#match_global_link()) {
			return this.#parse_global_link();
		} else if (this.#match('/')) {
			return this.#parse_absolute_link();
		} else if (this.#match('<')) {
			return this.#parse_regular_element_or_component();
		} else if (this.#match('{')) {
			return this.#parse_expression();
		} else {
			return this.#parse_text();
		}
	}

	#parse_list(current_indent: number, parent_indent_text: string = ''): List_Node {
		const start = this.#index;
		const items: List_Item_Node[] = [];
		let indent_text = current_indent === 0 ? '' : parent_indent_text;

		while (this.#index < this.template.length) {
			const {indent_chars, effective_indent} = this.#count_leading_whitespace();

			if (this.#match_list_at_indent(effective_indent, current_indent)) {
				if (current_indent > 0 && indent_text === parent_indent_text) {
					indent_text += indent_chars.slice(parent_indent_text.length);
				}

				const item_start = this.#index;
				this.#eat_whitespace();
				this.#eat('- ');
				const content_start = this.#index;

				let content_end = this.template.indexOf('\n', this.#index);
				if (content_end === -1) content_end = this.template.length;

				const content = this.template.slice(this.#index, content_end);
				this.#index = content_end;

				const content_parser = new Parser(content);
				const children = content_parser.parse();
				children.forEach((node) => this.#adjust_positions(node, content_start));

				const item: List_Item_Node = {
					type: 'List_Item',
					children,
					start: item_start,
					end: this.#index,
				};

				items.push(item);

				if (this.#match('\n')) {
					this.#eat('\n');
					const {effective_indent: next_effective_indent} = this.#count_leading_whitespace();
					if (next_effective_indent > effective_indent) {
						const nested_list = this.#parse_list(next_effective_indent, indent_text);
						item.children.push(nested_list);
					} else if (next_effective_indent < effective_indent) {
						break;
					}
				} else {
					break;
				}
			} else {
				break;
			}
		}

		return {
			type: 'List',
			start,
			end: this.#index,
			items,
			indent_level: this.#calculate_indent_level(current_indent),
			indent_text,
		};
	}

	#count_leading_whitespace(): {indent_chars: string; effective_indent: number} {
		let indent_chars = '';
		let effective_indent = 0;
		while (this.#index + indent_chars.length < this.template.length) {
			const char = this.template[this.#index + indent_chars.length];
			if (char === ' ') {
				indent_chars += ' ';
				effective_indent += 1;
			} else if (char === '\t') {
				indent_chars += '\t';
				effective_indent += 2; // Count a tab as 2 spaces for nesting purposes
			} else {
				break;
			}
		}
		return {indent_chars, effective_indent};
	}

	#match_list_at_indent(effective_indent: number, current_indent: number): boolean {
		if (effective_indent < current_indent) return false;
		const start_index = this.#index + this.#count_leading_whitespace().indent_chars.length;
		return this.template.startsWith('- ', start_index);
	}

	#eat_whitespace(): void {
		const {indent_chars} = this.#count_leading_whitespace();
		this.#index += indent_chars.length;
	}

	#calculate_indent_level(indent: number): number {
		return Math.floor(indent / 2);
	}

	#match_code_block(): boolean {
		return this.#peek_count_consecutive('`') >= 3;
	}

	#match_list(): boolean {
		return (
			(this.#index === 0 || this.template[this.#index - 1] === '\n') &&
			this.template.startsWith('- ', this.#index)
		);
	}

	#parse_code_block(): Code_Block_Node {
		const start = this.#index;

		const raw_fence = this.#read_consecutive('`');

		let language: string | null = null;
		let leading_whitespace = '';
		let content = '';
		let trailing_whitespace = '';

		const language_start = start + raw_fence.length;

		// Check for language specifier
		const next_newline = this.template.indexOf('\n', language_start);
		const next_fence = this.template.indexOf(raw_fence, language_start);

		if (next_newline !== -1 && (next_fence === -1 || next_newline < next_fence)) {
			// Capture the entire string from immediately after the fence to newline
			const potential_language = this.template.slice(language_start, next_newline);

			language = potential_language.trim() || null;

			this.#index = next_newline + 1;
			leading_whitespace = '\n';
		} else {
			this.#index = language_start;
		}

		const content_end = this.template.indexOf(raw_fence, this.#index);

		if (content_end === -1) {
			content = this.template.slice(this.#index);
			this.#index = this.template.length;
		} else {
			const raw_content = this.template.slice(this.#index, content_end);

			this.#index = content_end + raw_fence.length;

			const match = /^(\s*)([\s\S]*?)(\s*)$/.exec(raw_content);
			if (match) {
				leading_whitespace += match[1];
				content = match[2];
				trailing_whitespace = match[3];
			} else {
				content = raw_content;
			}
		}

		// Determine the fence to use in the output
		const fence =
			content.trim() === '' && raw_fence.length >= 6 && raw_fence.length % 2 === 0
				? raw_fence[0].repeat(raw_fence.length / 2)
				: raw_fence;

		return {
			type: 'Code_Block',
			content,
			language,
			fence,
			leading_whitespace,
			trailing_whitespace,
			start,
			end: this.#index,
		};
	}

	#parse_code(): Code_Node {
		const start = this.#index;
		this.#eat('`');
		const content_start = this.#index;
		const content_end = this.template.indexOf('`', this.#index);
		if (content_end === -1) {
			throw new Error('Unclosed inline code');
		}
		const content = this.template.slice(content_start, content_end);
		this.#index = content_end + 1;
		return {type: 'Code', content, start, end: this.#index};
	}

	#parse_styled_text<T_Node_Type extends 'Bold' | 'Italic'>(
		char: string,
		nodeType: T_Node_Type,
	): (T_Node_Type extends 'Bold' ? Bold_Node : Italic_Node) | Text_Node {
		const start = this.#index;
		const count = this.#peek_count_consecutive(char);

		if (count === 1) {
			this.#eat(char);
			const children = this.#parse_nodes_until((c) => c === char);
			if (this.#match(char)) {
				this.#eat(char);
				return {
					type: nodeType,
					children,
					start,
					end: this.#index,
				} as T_Node_Type extends 'Bold' ? Bold_Node : Italic_Node;
			} else {
				this.#index = start;
				const content = this.template[this.#index];
				this.#index++;
				return {type: 'Text', content, start, end: this.#index};
			}
		}

		const content = char.repeat(count);
		this.#index += count;
		return {type: 'Text', content, start, end: this.#index};
	}

	#parse_asterisk(): Bold_Node | Text_Node {
		return this.#parse_styled_text('*', 'Bold');
	}

	#parse_underscore(): Italic_Node | Text_Node {
		return this.#parse_styled_text('_', 'Italic');
	}

	#parse_mention(): Mention_Node {
		const start = this.#index;
		this.#eat('@');
		const name = this.#read_identifier();
		return {type: 'Mention', name, start, end: this.#index};
	}

	#parse_hashtag(): Hashtag_Node {
		const start = this.#index;
		this.#eat('#');
		const name = this.#read_identifier();
		return {type: 'Hashtag', name, start, end: this.#index};
	}

	#parse_markdown_link(): Markdown_Link_Node | Text_Node {
		const start = this.#index;
		this.#eat('[');
		let content = '';
		let bracket_count = 1;

		while (this.#index < this.template.length) {
			const char = this.template[this.#index];
			this.#index++;
			content += char;

			if (char === '[') {
				bracket_count++;
			} else if (char === ']') {
				bracket_count--;
				if (bracket_count === 0 && this.#match('(')) {
					this.#eat('(');
					return this.#complete_markdown_link(start, content.slice(0, -1));
				}
				if (bracket_count === 0) {
					return {type: 'Text', content, start, end: this.#index};
				}
			}
		}

		return {type: 'Text', content, start, end: this.#index};
	}

	#complete_markdown_link(start: number, text_content: string): Markdown_Link_Node | Text_Node {
		const href_end = this.template.indexOf(')', this.#index);
		if (href_end === -1) {
			// No closing parenthesis, treat as plain text
			this.#index = this.template.length;
			return {type: 'Text', content: `[${text_content}(`, start, end: this.#index};
		}
		const href = this.template.slice(this.#index, href_end);
		this.#index = href_end + 1;
		const text_nodes = new Parser(text_content).parse();
		text_nodes.forEach((node) => this.#adjust_positions(node, start + 1));
		return {
			type: 'Markdown_Link',
			text: text_nodes,
			href,
			start,
			end: this.#index,
		};
	}

	#parse_global_link(): Global_Link_Node | Text_Node {
		const start = this.#index;
		let href: string;
		if (this.#match('http://') || this.#match('https://') || this.#match('//')) {
			href = this.#read_until((c) => /[\s,<>]/.test(c));
			return {type: 'Global_Link', href, start, end: this.#index};
		} else {
			const content = this.template[this.#index];
			this.#index++;
			return {type: 'Text', content, start, end: this.#index};
		}
	}

	#parse_absolute_link(): Absolute_Link_Node | Text_Node {
		const start = this.#index;
		if (this.#match('/')) {
			this.#eat('/');
			const href = '/' + this.#read_until((c) => /[\s,<>]/.test(c));
			return {type: 'Absolute_Link', href, start, end: this.#index};
		} else {
			const content = this.template[this.#index];
			this.#index++;
			return {type: 'Text', content, start, end: this.#index};
		}
	}

	#parse_regular_element_or_component(): Regular_Element_Node | Component_Node {
		const start = this.#index;
		this.#eat('<');
		const tag_name = this.#read_tag_name();
		const is_component = /^[A-Z]/.test(tag_name);

		const attributes = this.#parse_attributes();

		const whitespace_start = this.#index;
		this.#skip_whitespace();
		const has_whitespace = this.#index > whitespace_start;

		let self_closing = false;

		if (this.#match('/>')) {
			self_closing = true;
			this.#eat('/>');
		} else if (this.#match('>')) {
			this.#eat('>');
		} else {
			throw new Error(`Expected '>' or '/>' at index ${this.#index}`);
		}

		if (self_closing) {
			return {
				type: is_component ? 'Component' : 'Regular_Element',
				name: tag_name,
				attributes,
				children: [],
				start,
				end: this.#index,
				self_closing,
				self_closing_space: has_whitespace,
				original_syntax: 'html',
			};
		} else {
			const children = this.#parse_nodes_until(() =>
				this.template.startsWith(`</${tag_name}>`, this.#index),
			);
			this.#eat(`</${tag_name}>`);
			return {
				type: is_component ? 'Component' : 'Regular_Element',
				name: tag_name,
				attributes,
				children,
				start,
				end: this.#index,
				self_closing: false,
				self_closing_space: false,
				original_syntax: 'html',
			};
		}
	}

	#parse_attributes(): Attribute_Node[] {
		const attributes: Attribute_Node[] = [];
		while (true) {
			if (this.#match('>') || this.#match('/>')) {
				break;
			}

			const current_index = this.#index;
			this.#skip_whitespace();

			if (this.#match('>') || this.#match('/>')) {
				this.#index = current_index;
				break;
			}

			const attr_start = this.#index;
			const name = this.#read_attribute_name();
			if (!name) {
				break;
			}

			let value: Text_Node[] = [];
			this.#skip_whitespace();

			if (this.#match('=')) {
				this.#eat('=');
				this.#skip_whitespace();
				const quote_char = this.template[this.#index];
				if (quote_char === '"' || quote_char === "'") {
					this.#eat(quote_char);
					const value_start = this.#index;
					const attribute_value = this.#read_until((c) => c === quote_char);
					const value_end = this.#index;
					this.#eat(quote_char);
					value = [{type: 'Text', content: attribute_value, start: value_start, end: value_end}];
				} else {
					const value_start = this.#index;
					const attribute_value = this.#read_until((c) => /[\s/>]/.test(c));
					const value_end = this.#index;
					value = [{type: 'Text', content: attribute_value, start: value_start, end: value_end}];
				}
			}

			attributes.push({
				type: 'Attribute',
				name,
				value,
				start: attr_start,
				end: this.#index,
				parent: null,
			});
		}
		return attributes;
	}

	#parse_expression(): Expression_Node {
		const start = this.#index;
		this.#eat('{');
		const content = this.#read_until((c) => c === '}');
		this.#eat('}');
		return {type: 'Expression', content, start, end: this.#index};
	}

	#parse_text(): Text_Node {
		const start = this.#index;
		let content = '';
		while (this.#index < this.template.length) {
			if (this.#match_list()) break;
			const c = this.template[this.#index];
			if (
				/[`*_@#<{[]/.test(c) ||
				this.template.startsWith('http://', this.#index) ||
				this.template.startsWith('https://', this.#index) ||
				this.template.startsWith('//', this.#index) ||
				c === '/'
			) {
				break;
			}
			content += c;
			this.#index++;
		}
		return {type: 'Text', content, start, end: this.#index};
	}

	#parse_nodes_until(predicate: (char: string) => boolean): Parsed_Node[] {
		const nodes: Parsed_Node[] = [];
		while (this.#index < this.template.length && !predicate(this.template[this.#index])) {
			const node = this.#parse_node();
			if (node.type === 'Text' && nodes.length > 0 && nodes[nodes.length - 1].type === 'Text') {
				const last_node = nodes[nodes.length - 1] as Text_Node;
				last_node.content += node.content;
				last_node.end = node.end;
			} else {
				nodes.push(node);
			}
		}
		return nodes;
	}

	#read_attribute_name(): string {
		const start = this.#index;
		while (this.#index < this.template.length && !/[\s=/>]/.test(this.template[this.#index])) {
			this.#index++;
		}
		return this.template.slice(start, this.#index);
	}

	#read_tag_name(): string {
		const start = this.#index;
		while (this.#index < this.template.length && !/[\s/>]/.test(this.template[this.#index])) {
			this.#index++;
		}
		return this.template.slice(start, this.#index);
	}

	#read_identifier(): string {
		const start = this.#index;
		while (this.#index < this.template.length && /[a-zA-Z0-9_]/.test(this.template[this.#index])) {
			this.#index++;
		}
		return this.template.slice(start, this.#index);
	}

	#read_consecutive(char: string): string {
		const start = this.#index;
		while (this.#index < this.template.length && this.template[this.#index] === char) {
			this.#index++;
		}
		return this.template.slice(start, this.#index);
	}

	#skip_whitespace(): void {
		while (this.#index < this.template.length && /\s/.test(this.template[this.#index])) {
			this.#index++;
		}
	}

	#match_global_link(): boolean {
		return this.#match('http://') || this.#match('https://') || this.#match('//');
	}

	#match(str: string): boolean {
		return this.template.startsWith(str, this.#index);
	}

	#eat(str: string): void {
		if (this.#match(str)) {
			this.#index += str.length;
		} else {
			throw new Error(`Expected "${str}" at index ${this.#index}`);
		}
	}

	#peek_count_consecutive(char: string): number {
		let count = 0;
		let idx = this.#index;
		while (idx < this.template.length && this.template[idx] === char) {
			count++;
			idx++;
		}
		return count;
	}

	#parse_blockquote(): Blockquote_Node {
		const start = this.#index;
		const content_start = this.#index;
		let content = '';

		while (this.#index < this.template.length) {
			const line_start_index = this.#index;

			// Skip leading spaces or tabs
			while (
				this.#index < this.template.length &&
				(this.template[this.#index] === ' ' || this.template[this.#index] === '\t')
			) {
				this.#index++;
			}

			if (this.#match('> ')) {
				this.#eat('> ');
			} else if (this.#match('>')) {
				this.#eat('>');
			} else {
				this.#index = line_start_index;
				break;
			}

			const line_content = this.#read_until((c) => c === '\n');
			content += line_content;

			if (this.#match('\n')) {
				content += '\n';
				this.#eat('\n');
			} else {
				break;
			}
		}

		if (content.endsWith('\n')) {
			content = content.slice(0, -1);
		}

		const content_parser = new Parser(content);
		const children = content_parser.parse();

		children.forEach((node) => this.#adjust_positions(node, content_start));

		const end = this.#index;

		return {
			type: 'Blockquote',
			children,
			start,
			end,
			original_syntax: 'markdown',
		};
	}

	#read_until(predicate: (char: string) => boolean): string {
		let result = '';
		while (this.#index < this.template.length && !predicate(this.template[this.#index])) {
			result += this.template[this.#index];
			this.#index++;
		}
		return result;
	}

	#adjust_positions(node: Parsed_Node, offset: number): void {
		node.start += offset;
		node.end += offset;

		if ('children' in node && Array.isArray(node.children)) {
			node.children.forEach((child) => this.#adjust_positions(child, offset));
		}
		if ('value' in node && Array.isArray(node.value)) {
			node.value.forEach((child) => this.#adjust_positions(child, offset));
		}
		if ('attributes' in node && Array.isArray(node.attributes)) {
			node.attributes.forEach((attr) => this.#adjust_positions(attr, offset));
		}
		if ('text' in node && Array.isArray(node.text)) {
			node.text.forEach((textNode) => this.#adjust_positions(textNode, offset));
		}
	}
}