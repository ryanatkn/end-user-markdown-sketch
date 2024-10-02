<script lang="ts">
	// TODO this is just a hacky proof of concept

	import {contextmenu_action} from '@ryanatkn/fuz/contextmenu_state.svelte.js';

	import Hashtag_Contextmenu from '$routes/Hashtag_Contextmenu.svelte';
	import {do_something_with_hashtag} from '$routes/contextmenu_helpers.js';

	// TODO should there but a get_markdown_context?

	interface Props {
		name: string;
		inline?: boolean;
	}

	const {name, inline = true}: Props = $props();
</script>

<!-- TODO should be a button, deceptively looks like a link, I'm just being lazy -->
<span
	class="hashtag"
	class:inline
	use:contextmenu_action={hashtag_contextmenu}
	role="button"
	tabindex="0"
	onkeydown={undefined}
	onclick={() => {
		// TODO hacky
		do_something_with_hashtag(name);
	}}>#{name}</span
>

{#snippet hashtag_contextmenu()}
	<Hashtag_Contextmenu {name} />
{/snippet}

<style>
	.hashtag {
		--icon_size: var(--hashtag_icon_size, var(--icon_size_xs));
		display: flex;
		align-items: center;
		font-weight: 700;
		color: var(--color_d);
	}
	.hashtag:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	.hashtag.inline {
		display: inline;
		white-space: nowrap;
		/* TODO might need to max-width this and `text-overflow: ellipsis;` */
	}
</style>
