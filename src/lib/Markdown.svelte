<script lang="ts">
	import Markdown_View from '$lib/Markdown_View.svelte';
	import {parse_markdown} from '$lib/parse_markdown.js';

	interface Props {
		content: string;
	}

	const {content}: Props = $props();

	const nodes = $derived(parse_markdown(content)); // TODO caching (with eviction in `update_space`/`delete_space`/etc)
</script>

{#each nodes as view (view)}
	<Markdown_View {view} />
{/each}
