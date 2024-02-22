<script lang="ts">
	// TODO this is just a hacky proof of concept

	import {get_contextmenu, to_contextmenu_params} from '@ryanatkn/fuz/contextmenu.js';

	import Hashtag_Contextmenu from '$routes/Hashtag_Contextmenu.svelte';
	import {do_something_with_hashtag} from './contextmenu_helpers';

	const contextmenu = get_contextmenu();

	// TODO should there but a get_markdown_context?

	export let name: string;
	export let inline = true;
</script>

<!-- TODO should be a button, deceptively looks like a link, I'm just being lazy -->
<span
	class="hashtag"
	class:inline
	use:contextmenu.action={to_contextmenu_params(Hashtag_Contextmenu, {name})}
	role="button"
	tabindex="0"
	on:keydown={undefined}
	on:click={() => {
		// TODO hacky
		do_something_with_hashtag(name);
	}}>#{name}</span
>

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
