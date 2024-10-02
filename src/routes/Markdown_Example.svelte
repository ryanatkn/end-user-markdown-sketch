<script lang="ts">
	import Code from '@ryanatkn/fuz_code/Code.svelte';
	import type {Snippet} from 'svelte';

	import Markdown from '$lib/Markdown.svelte';

	interface Props {
		content: string;
		after?: Snippet;
		children?: Snippet;
	}

	const {content, after, children}: Props = $props();
</script>

<div class="markdown_text_example panel">
	{@render children?.()}
	<Code {content} />
	<p class="prose">
		<Markdown {content} />
	</p>
	{@render after?.()}
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
