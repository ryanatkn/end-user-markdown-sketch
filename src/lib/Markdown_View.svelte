<script lang="ts">
	// TODO this is just a hacky proof of concept

	import {type View_Node, to_view_props, get_components} from '$lib/view.js';

	export let view: View_Node;

	const components = get_components();

	$: props = to_view_props(view);
</script>

{#if view.type === 'svelte_component'}{#if view.tag in components}{#if view.children.length}<svelte:component
				this={components[view.tag]}
				{...props}
				>{#each view.children as child (child)}<svelte:self view={child} />{/each}</svelte:component
			>{:else}<svelte:component this={components[view.tag]} {...props} />{/if}{:else}<code
			class="error"
			title="the component {view.tag} was not found">{'<'}{view.tag} /></code
		>{/if}{:else if view.type === 'svelte_element'}{#if view.children.length}<svelte:element
			this={view.tag}
			{...props}
			>{#each view.children as child (child)}<svelte:self view={child} />{/each}</svelte:element
		>{:else}<svelte:element
			this={view.tag}
			{...props}
		/>{/if}{:else if view.type === 'root'}{#each view.children as child (child)}<svelte:self
			view={child}
		/>{/each}{:else if view.type === 'text'}{view.value}{/if}
