// TODO this is just a hacky proof of concept

import {getContext, setContext, type SvelteComponent} from 'svelte';

import type {Markdown_Root, Svelte_Tag} from '$lib/markdown.js';

export type View_Node = Markdown_Root | Svelte_Tag; // TODO does this technically need to include `Node`?

export type MarkdownComponents = Record<string, typeof SvelteComponent<any>>;

const COMPONENTS_KEY = Symbol('components');

export const get_components = (): MarkdownComponents => getContext(COMPONENTS_KEY);

export const set_components = (components: MarkdownComponents): MarkdownComponents =>
	setContext(COMPONENTS_KEY, components);

export const ALLOWED_HTML_ATTRS = new Set([
	'class',
	// TODO handle external links (href/src/srcset) differently from internal ones,
	// so for example external images are not auto-embedded
	// unless the domain is allowlisted by the user
	'href',
	'src',
	'srcset',
	'alt',
	'title',
	'name',
	'width',
	'height',
]);

/**
 * Returns the props object for a Svelte component FAST node,
 * e.g. `<Foo a="A" b="B" />` returns `{a: 'A', b: 'B'}`.
 * @param view - A view's parsed FAST
 * @returns Props object that can be splatted into a Svelte component.
 */
export const to_view_props = (
	view: View_Node,
	allowed_html_attrs: Set<string> = ALLOWED_HTML_ATTRS,
): Record<string, any> | undefined => {
	let props: Record<string, any> | undefined;
	if (view.properties) {
		for (const prop of view.properties) {
			const {value} = prop;
			// Allow all component props but allowlist element attributes.
			// Importantly this means component props can cause security and privacy vulnerabilities
			// depending on their usage by the component.
			if (view.type === 'svelte_component' || allowed_html_attrs.has(prop.name)) {
				let str = '';
				for (const v of value) {
					if (v.type !== 'text') break;
					str += v.value;
				}
				if (str) {
					(props || (props = Object.create(null)))[prop.name] = str;
				}
			}
		}
	}
	return props;
};
