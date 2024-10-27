// TODO this is just a hacky proof of concept

import type {Component} from 'svelte';

import type {Parsed_Node} from '$lib/parse_markdown.js';

export type View_Node = Parsed_Node; // TODO root type?

export type Markdown_Components = Record<string, Component<any>>;

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
	view: Parsed_Node,
	allowed_html_attributes: Set<string> = ALLOWED_HTML_ATTRS,
): Record<string, any> | undefined => {
	let props: Record<string, any> | undefined;
	if ('attributes' in view) {
		for (const prop of view.attributes) {
			const {value} = prop;
			// Allow all component props but allowlist element attributes.
			// Importantly this means component props can cause security and privacy vulnerabilities
			// depending on their usage by the component.
			if (view.type === 'Component' || allowed_html_attributes.has(prop.name)) {
				let str = '';
				for (const v of value) {
					str += v.content;
				}
				if (str) {
					(props ??= Object.create(null))[prop.name] = str;
				}
			}
		}
	}
	return props;
};
