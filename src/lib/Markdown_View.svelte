<script lang="ts">
	import Pending_Animation from '@ryanatkn/fuz/Pending_Animation.svelte';

	import {type Parsed_Node} from '$lib/parse_markdown.js';
	import {components_context} from '$routes/components.js';
	import {to_view_props} from '$lib/view.js';
	import Markdown_View from '$lib/Markdown_View.svelte';
	import Mention from '$routes/Mention.svelte';
	import Hashtag from '$routes/Hashtag.svelte';

	interface Props {
		view: Parsed_Node; // TODO rename to `node`?
	}

	const {view}: Props = $props();

	// TODO CLIENT_APP extract `components` (lazy loading?)
	const components = components_context.get();

	// TODO use components for Mention/Hashtag below
	const loading_component = $derived(
		view.type === 'Component' && view.name in components ? components[view.name] : null,
	);

	const node_props = $derived(to_view_props(view));

	// TODO consider passing through optional `children`
</script>

{#if view.type === 'Component'}
	{#if loading_component}
		{#await loading_component}
			<Pending_Animation />
		{:then Component}
			<Component {...node_props}>
				{#if view.children}
					{@render child_nodes(view.children)}
				{/if}
			</Component>
		{/await}
	{:else}
		<code class="error_text">{'<'}{view.name}{' />'}</code>
	{/if}
{:else if view.type === 'Element'}
	{#if view.self_closing}
		<svelte:element this={view.name} {...node_props} />
	{:else}
		<svelte:element this={view.name} {...node_props}>
			{@render child_nodes(view.children)}
		</svelte:element>
	{/if}
{:else if view.type === 'Text'}
	{view.content}
{:else if view.type === 'Code'}
	<code>{view.content}</code>
{:else if view.type === 'Code_Block'}
	<pre><code class={view.language}>{view.content}</code></pre>
{:else if view.type === 'Bold'}
	<strong>{@render child_nodes(view.children)}</strong>
{:else if view.type === 'Italic'}
	<em>{@render child_nodes(view.children)}</em>
{:else if view.type === 'Mention'}
	<Mention name={view.name} />
{:else if view.type === 'Hashtag'}
	<Hashtag name={view.name} />
{:else if view.type === 'Absolute_Link'}
	<a href={view.href}>{view.href}</a>
{:else if view.type === 'Global_Link'}
	<a href={view.href}>{view.href}</a>
{:else if view.type === 'Expression'}
	{view.content}
{:else if view.type === 'Markdown_Link'}
	<a href={view.href}>{@render child_nodes(view.text)}</a>
{:else if view.type === 'Blockquote'}
	<blockquote>{@render child_nodes(view.children)}</blockquote>
{:else if view.type === 'List'}
	<ul>
		{#each view.items as item}
			<li>{@render child_nodes(item.children)}</li>
		{/each}
	</ul>
{:else}
	<span class="error_text">Unknown node type: {view.type}</span>
{/if}

{#snippet child_nodes(children: Parsed_Node[])}
	{#each children as child}
		<Markdown_View view={child} />
	{/each}
{/snippet}
