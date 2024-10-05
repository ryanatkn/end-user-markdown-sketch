<script lang="ts">
	import Code from '@ryanatkn/fuz_code/Code.svelte';
	import type {Snippet} from 'svelte';

	import Markdown from '$lib/Markdown.svelte';

	interface Props {
		text: string;
		after?: Snippet;
		children?: Snippet;
	}

	const {text: content, after, children}: Props = $props();
</script>

<div class="markdown_text_example panel">
	{@render children?.()}
	<Code {content} />
	<p>
		<Markdown text={content} />
	</p>
	{@render after?.()}
</div>

<style>
	.markdown_text_example {
		background-color: var(--bg);
		display: flex;
		flex-direction: column;
		margin-bottom: var(--space_lg);
		padding: var(--space_sm);
	}
</style>
