<script lang="ts">
	// TODO this is just a hacky proof of concept

	import Contextmenu_Entry from '@ryanatkn/fuz/Contextmenu_Entry.svelte';
	import type {Snippet} from 'svelte';

	import {do_something_with_hashtag} from '$routes/contextmenu_helpers.js';

	interface Props {
		name: string;
		icon?: Snippet;
	}

	const {name, icon}: Props = $props();
</script>

<Contextmenu_Entry
	run={() => {
		do_something_with_hashtag(name);
	}}
	>Do something with {#if icon}{@render icon()}{:else}#{/if}{name}</Contextmenu_Entry
>
