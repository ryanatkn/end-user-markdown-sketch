<script lang="ts">
	// TODO this is just a hacky proof of concept

	import Markdown from '$lib/Markdown.svelte';

	const INITIAL_VALUE =
		'*bold* _italics_ `code`\n\n' +
		'#hashtag and @mention\n\n' +
		'[markdown link](./markdown-link)\n\n' +
		'/root/link\n\n' +
		'network link - //github.com/ryanatkn/end-user-markdown-sketch\n\n' +
		'<aside>basic safe <a href="https://wikipedia.org/wiki/HTML">html</a> works</aside>\n\n' +
		'<span class="chip success">class</span> is allowed but <span class="chip" style="color: red">style</span> and most other attributes are not yet - it should support a safe and configurable subset of HTML, not every usecase has the same needs\n\n' +
		'<button onclick="alert(\'hax\')" title="this button tries to hack you with the onclick attribute but the attribute allowlist disallows it">onclick does not work</button>';

	interface Props {
		value?: string;
	}

	let {value = $bindable(INITIAL_VALUE)}: Props = $props();

	const contents = $derived(value.split('\n').filter(Boolean)); // TODO is super hacky
</script>

<div class="playground">
	<textarea bind:value></textarea>
	<div class="preview">
		<!-- TODO is super hacky, remove the loop when the parser is fixed -->
		{#each contents as content}<div class="spaced"><Markdown {content} /></div>{/each}
	</div>
</div>

<style>
	.playground {
		display: flex;
		gap: var(--space_md);
		flex-wrap: wrap;
	}
	textarea {
		flex: 1;
		min-width: 210px;
		min-height: 100px;
		height: 370px;
		margin-bottom: 0;
	}
	.preview {
		flex: 1;
		min-height: 100px;
		display: flex;
		flex-direction: column;
	}
</style>
