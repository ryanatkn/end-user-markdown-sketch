<script lang="ts">
	import Code from '@ryanatkn/fuz_code/Code.svelte';

	import Markdown from '$lib/Markdown.svelte';

	export let content: string;
</script>

<div class="markdown_text_example panel">
	<slot />
	<Code {content} />
	<p class="prose">
		<Markdown {content} />
	</p>
	<slot name="after" />
</div>

<style>
	.markdown_text_example {
		background-color: var(--bg);
		display: flex;
		flex-direction: column;
		margin-bottom: var(--spacing_lg);
		padding: var(--spacing_sm);
	}
</style>
