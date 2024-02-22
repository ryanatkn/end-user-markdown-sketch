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

---

Type definitions for non-npm package Unist 2.0
Project: https://github.com/syntax-tree/unist
Definitions by: bizen241 <https://github.com/bizen241>
                Jun Lu <https://github.com/lujun2>
                Hernan Rajchert <https://github.com/hrajchert>
                Titus Wormer <https://github.com/wooorm>
                Junyoung Choi <https://github.com/rokt33r>
                Ben Moon <https://github.com/GuiltyDolphin>
                JounQin <https://github.com/JounQin>
Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
TypeScript Version: 3.0

*/

/**
 * Location of a node in a source file.
 */
export interface Position {
	/**
	 * Place of the first character of the parsed source region.
	 */
	start: Point;

	/**
	 * Place of the first character after the parsed source region.
	 */
	end: Point;

	/**
	 * Start column at each index (plus start line) in the source region,
	 * for elements that span multiple lines.
	 */
	indent?: number[] | undefined;
}

/**
 * One place in a source file.
 */
export interface Point {
	/**
	 * Line in a source file (1-indexed integer).
	 */
	line: number;

	/**
	 * Column in a source file (1-indexed integer).
	 */
	column: number;
	/**
	 * Character in a source file (0-indexed integer).
	 */
	offset: number;

	index?: number;
}

export interface Base_Tag {
	type: string;
	tag?: string;
	properties?: Array<Property | Directive>;
	selfclosing?: boolean;

	value?: string | Array<Text | Svelte_Dynamic_Content>; // TODO hacky, overloaded `value` with `Base_Property`

	/**
	 * Location of a node in a source document.
	 * Must not be present if a node is generated.
	 */
	position?: Position | undefined;

	children?: Markdown_Children;
}

// TODO this works ok I guess but is confused
export type Markdown_Children = Svelte_Tag[] | Base_Tag[];

export type Svelte_Tag =
	| Svelte_Element
	| Svelte_Component
	| Comment
	| Text
	| Svelte_Dynamic_Content
	| Void_Block
	| Branching_Block
	| Svelte_Meta;

export interface Markdown_Root extends Base_Tag {
	type: 'root';
	children: Markdown_Children;
}

export interface Svelte_Meta extends Base_Tag {
	type: 'svelte_meta';
}

export interface Svelte_Element extends Base_Tag {
	type: 'svelte_element';
	tag: string;
	children: Markdown_Children;
}

export interface Svelte_Component extends Base_Tag {
	type: 'svelte_component';
	tag: string;
	children: Markdown_Children;
}

export interface Svelte_Script extends Base_Tag {
	type: 'svelte_script';
}

export interface Svelte_Style extends Base_Tag {
	type: 'svelte_style';
}

export interface Base_Property extends Base_Tag {
	name: string;
	shorthand: 'none' | 'boolean' | 'expression';
	value: Array<Text | Svelte_Dynamic_Content>;
	modifiers: Modifier[];
}

export interface Property extends Base_Property {
	type: 'svelte_property';
}

export interface Directive extends Base_Property {
	type: 'svelte_directive';
	specifier: string;
}

export interface Literal extends Base_Tag {
	value: string;
}
export interface Comment extends Literal {
	type: 'comment';
}
export interface Text extends Literal {
	type: 'text';
}
export interface Modifier extends Literal {
	type: 'modifier';
}
export interface Svelte_Expression extends Literal {
	type: 'svelte_expression';
}

export interface Svelte_Dynamic_Content extends Base_Tag {
	type: 'svelte_dynamic_content';
	expression: Svelte_Expression;
}
export interface Void_Block extends Base_Tag {
	type: 'svelte_void_block';
	name: string;
	expression: Svelte_Expression;
}

export interface Branching_Block extends Base_Tag {
	type: 'svelte_branching_block';
	name: string;
	branches: Branch[];
}

export interface Branch extends Base_Tag {
	type: 'svelte_branch';
	name: string;
	expression: Svelte_Expression;
	children: Markdown_Children;
}
