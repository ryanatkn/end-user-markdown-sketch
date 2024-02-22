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
	Base_Tag,
	Text,
	Markdown_Root,
	Void_Block,
	Property,
	Directive,
	Branching_Block,
	Svelte_Dynamic_Content,
	Modifier,
} from '$lib/markdown.js';

// TODO HACK could have a type map to get the types in each
type Compile_Children = (nodes: Base_Tag[]) => string;

export const compile_node = (
	node: Base_Tag,
	compile_children: Compile_Children,
): string | undefined => {
	return handlers[node.type](node, compile_children);
};

export const stringify_markdown = (tree: Markdown_Root): string => {
	if (tree.type !== 'root') {
		throw new Error(
			`A Markdown tree must have a single 'root' node but instead got "${tree.type}"`,
		);
	}
	return compile_children(tree.children);
};

const compile_children = (children: Base_Tag[]) => {
	let str = '';
	for (let index = 0; index < children.length; index++) {
		str += compile_node(children[index], compile_children);
	}
	return str;
};

const render_attr_values = (values: Array<Text | Svelte_Dynamic_Content>): string => {
	let value = '';

	for (let index = 0; index < values.length; index++) {
		if (values[index].type === 'text') {
			value += values[index].value;
		}

		if (values[index].type === 'svelte_dynamic_content') {
			value += '{' + (values[index] as Svelte_Dynamic_Content).expression.value + '}';
		}
	}

	return value;
};

const render_modifiers = (modifiers: Modifier[]): string => {
	let mod_string = '';

	for (let index = 0; index < modifiers.length; index++) {
		mod_string += '|' + modifiers[index].value;
	}

	return mod_string;
};

const render_props = (props: Array<Property | Directive>): string => {
	let attrs = '\n';
	let p;
	for (let index = 0; index < props.length; index++) {
		p = props[index];
		if (p.type === 'svelte_property') {
			if (p.shorthand === 'boolean') {
				attrs += p.name + '\n';
				continue;
			} else if (p.shorthand === 'expression') {
				attrs += '{' + p.name + '}\n';
				continue;
			}
			attrs += p.name;
		}

		if (p.type === 'svelte_directive') {
			attrs += p.name + ':' + p.specifier;
		}

		if (p.modifiers.length > 0) {
			attrs += render_modifiers(p.modifiers);
		}

		if (p.value.length > 0) {
			attrs += '="' + render_attr_values(p.value) + '"';
		}

		attrs += '\n';
	}
	return attrs;
};

type Handler = (node: Base_Tag, compile_children: Compile_Children) => string;

const handlers: Record<string, Handler> = {
	text(node) {
		return (node as Text).value;
	},
	svelte_dynamic_content(node) {
		return '{' + (node as Svelte_Dynamic_Content).expression.value + '}';
	},
	svelte_void_block(node) {
		return '{@' + (node as Void_Block).name + ' ' + (node as Void_Block).expression.value + '}';
	},
	svelte_element(node, compile_children) {
		if (node.selfclosing === true) {
			return (
				'<' +
				node.tag +
				' ' +
				(node.properties!.length > 0 ? render_props(node.properties!) : '') +
				'/>'
			);
		} else {
			return (
				'<' +
				node.tag +
				' ' +
				(node.properties!.length > 0 ? render_props(node.properties!) : '') +
				'>' +
				(node.children!.length > 0 ? compile_children(node.children!) : '') +
				'</' +
				node.tag +
				'>'
			);
		}
	},
	svelte_meta(node, compile_children) {
		if (node.selfclosing === true) {
			return (
				'<svelte:' +
				node.tag +
				' ' +
				(node.properties!.length > 0 ? render_props(node.properties!) : '') +
				'/>'
			);
		} else {
			return (
				'<svelte:' +
				node.tag +
				' ' +
				(node.properties!.length > 0 ? render_props(node.properties!) : '') +
				'>' +
				(node.children!.length > 0 ? compile_children(node.children!) : '') +
				'</svelte:' +
				node.tag +
				'>'
			);
		}
	},
	svelte_branching_block(node, compile_children) {
		let branches = '';
		for (let index = 0; index < (node as Branching_Block).branches.length; index++) {
			if (index === 0) {
				branches += '{#';
			} else {
				branches += '{:';
			}

			branches +=
				(node as Branching_Block).branches[index].name +
				' ' +
				(node as Branching_Block).branches[index].expression.value +
				'}' +
				compile_children((node as Branching_Block).branches[index].children);
		}
		return branches + '{/' + (node as Branching_Block).name + '}';
	},
	svelte_component(node, compile_children) {
		return this.svelte_element(node, compile_children);
	},
	svelte_script(node, compile_children) {
		return this.svelte_element(node, compile_children);
	},
	svelte_style(node, compile_children) {
		return this.svelte_element(node, compile_children);
	},
};
