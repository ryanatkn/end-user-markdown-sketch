<script lang="ts">
	// TODO this is just a hacky proof of concept

	import {get_contextmenu} from '@ryanatkn/fuz/contextmenu.js';

	import {greet_actor} from '$routes/contextmenu_helpers.js'; // TODO hacky, shouldn't have a dep in $routes and we could move it to $lib

	const contextmenu = get_contextmenu();

	// TODO should there but a get_markdown_context?

	export let name: string;
	export let inline = true;

	// TODO hacky
	const onclick = () => {
		(greet_actor(name) as any).run();
	};
</script>

<!-- TODO should be a button, deceptively looks like a link, I'm just being lazy -->
<span
	class="mention"
	class:inline
	use:contextmenu.action={greet_actor(name)}
	role="button"
	tabindex="0"
	on:keydown={undefined}
	on:click={onclick}>@{name}</span
>

<style>
	.mention {
		--icon_size: var(--mention_icon_size, var(--icon_size_xs));
		display: flex;
		align-items: center;
		font-weight: 700;
		color: var(--color_g);
	}
	.mention:hover {
		text-decoration: underline;
		cursor: pointer;
	}
	.mention.inline {
		display: inline;
		white-space: nowrap;
		/* TODO might need to max-width this and `text-overflow: ellipsis;` */
	}
</style>
