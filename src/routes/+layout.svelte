<script lang="ts">
	import '@ryanatkn/moss/style.css';
	import '@ryanatkn/moss/theme.css';
	import '@ryanatkn/fuz_code/prism.css';
	import '$routes/moss.css';
	import '$routes/style.css';

	import 'prismjs';
	import 'prism-svelte';
	import Themed from '@ryanatkn/fuz/Themed.svelte';
	import Dialog from '@ryanatkn/fuz/Dialog.svelte';
	import Contextmenu_Root from '@ryanatkn/fuz/Contextmenu_Root.svelte';
	import type {Snippet} from 'svelte';
	import {contextmenu_action} from '@ryanatkn/fuz/contextmenu_state.svelte.js';

	import Settings from '$routes/Settings.svelte';
	import {components, components_context} from '$routes/components.js';
	import Header from '$routes/Header.svelte';
	import Footer from '$routes/Footer.svelte';

	interface Props {
		children: Snippet;
	}

	const {children}: Props = $props();

	components_context.set(components);

	let show_settings = $state(false);
</script>

<svelte:head>
	<title>End-user markdown sketch</title>
</svelte:head>

<svelte:body
	use:contextmenu_action={[
		{
			snippet: 'text',
			props: {
				content: 'Settings',
				icon: '?',
				run: () => {
					show_settings = true;
				},
			},
		},
		{
			snippet: 'text',
			props: {
				content: 'Reload',
				icon: '⟳', // ↻
				run: () => {
					location.reload();
				},
			},
		},
	]}
/>

<Themed>
	<Contextmenu_Root>
		<Header />
		{@render children()}
		{#if show_settings}
			<Dialog onclose={() => (show_settings = false)}>
				<div class="pane">
					<Settings />
				</div>
			</Dialog>
		{/if}
		<Footer />
	</Contextmenu_Root>
</Themed>
