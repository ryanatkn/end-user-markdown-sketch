<script lang="ts">
	// TODO this is just a hacky proof of concept

	import {base} from '$app/paths';
	import type {Snippet} from 'svelte';

	import {
		is_host_relative_path,
		is_host_relative_path_valid,
		is_network_relative_path,
		is_network_relative_path_valid,
		is_path_relative_path,
	} from '$lib/helpers.js';

	interface Props {
		href: string;
		attrs?: any;
		children: Snippet;
	}

	const {href, attrs = undefined, children}: Props = $props();

	const network_relative = $derived(is_network_relative_path(href));
	const host_relative = $derived(is_host_relative_path(href));
	const path_relative = $derived(is_path_relative_path(href));
	const valid = $derived(
		network_relative
			? is_network_relative_path_valid(href)
			: host_relative
				? is_host_relative_path_valid(href)
				: true,
	);
	const final_href = $derived(
		network_relative ? 'https:' + href : host_relative ? base + href : href,
	);
	const external = $derived(!(host_relative || path_relative));
	const rel = $derived(external ? 'external noreferrer nofollow' : undefined); // TODO make configurable, maybe change default?
	// TODO this no longer works: `sveltekit:prefetch={prefetch}`, see https://github.com/sveltejs/kit/pull/7776
	// $: prefetch = external ? undefined : (true as const);
</script>

{#if valid}<a {...attrs} href={final_href} {rel}>{@render children()}</a
	>{:else}{@render children()}{/if}
