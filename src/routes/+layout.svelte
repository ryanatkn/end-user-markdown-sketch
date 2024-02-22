<script lang="ts">
	import '@ryanatkn/fuz/style.css';
	import '@ryanatkn/fuz/theme.css';
	import '@ryanatkn/fuz_code/prism.css';
	import '$routes/style.css';

	import 'prismjs';
	import 'prism-svelte';
	import Themed from '@ryanatkn/fuz/Themed.svelte';
	import Dialog from '@ryanatkn/fuz/Dialog.svelte';
	import Contextmenu from '@ryanatkn/fuz/Contextmenu.svelte';
	import {create_contextmenu, set_contextmenu} from '@ryanatkn/fuz/contextmenu.js';

	import Settings from '$routes/Settings.svelte';
	import {components} from '$routes/components.js';
	import {set_components} from '$lib/view.js'; // TODO HACK where should this live?
	import Header from '$routes/Header.svelte';
	import Footer from '$routes/Footer.svelte';

	set_components(components);

	const contextmenu = set_contextmenu(create_contextmenu());

	let showSettings = false;
</script>

<svelte:head>
	<title>End-user markdown sketch</title>
</svelte:head>

<svelte:body
	use:contextmenu.action={[
		{
			content: 'Settings',
			icon: '?',
			run: () => {
				showSettings = true;
			},
		},
		{
			content: 'Reload',
			icon: '⟳', // ↻
			run: () => {
				location.reload();
			},
		},
	]}
/>

<Themed>
	<Header />
	<slot />
	<Contextmenu {contextmenu} />
	{#if showSettings}
		<Dialog on:close={() => (showSettings = false)}>
			<div class="pane">
				<Settings />
			</div>
		</Dialog>
	{/if}
	<Footer />
</Themed>
