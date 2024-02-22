<script lang="ts">
	// TODO this is just a hacky proof of concept

	import Markdown_View from '$lib/Markdown_View.svelte';
	import {todo_hacky_parse} from '$lib/todo_hacky_parse.js';

	// TODO maybe merge with `Markdown_View.svelte`

	export let content: string;

	$: view = todo_hacky_parse(content); // TODO caching with eviction
</script>

<Markdown_View {view} />
