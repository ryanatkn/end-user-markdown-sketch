<script lang="ts">
	// TODO this is just a hacky proof of concept

	import Contextmenu_Entry from '@ryanatkn/fuz/Contextmenu_Entry.svelte';

	import {do_something_with_hashtag} from '$routes/contextmenu_helpers.js';

	export let name: string;
</script>

<Contextmenu_Entry
	run={() => {
		do_something_with_hashtag(name);
	}}>Do something with #{name}<svelte:fragment slot="icon">#</svelte:fragment></Contextmenu_Entry
>
