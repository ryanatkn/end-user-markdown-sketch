<script lang="ts">
	// TODO this is just a hacky proof of concept

	import {base} from '$app/paths';

	import {
		is_host_relative_path,
		is_host_relative_path_valid,
		is_network_relative_path,
		is_network_relative_path_valid,
	} from '$lib/helpers.js';

	export let href: string;
	export let attrs: any = undefined;

	$: network_relative = is_network_relative_path(href);
	$: host_relative = is_host_relative_path(href);
	$: valid = network_relative
		? is_network_relative_path_valid(href)
		: host_relative
			? is_host_relative_path_valid(href)
			: true;
	$: final_href = network_relative ? 'https:' + href : host_relative ? base + href : href;
	$: external = !(host_relative || href[0] === '.');
	$: rel = external ? 'external noreferrer nofollow' : undefined; // TODO make configurable, maybe change default?
	$: target = external ? '_blank' : undefined; // TODO make configurable, maybe change default?
	// TODO this no longer works: `sveltekit:prefetch={prefetch}`, see https://github.com/sveltejs/kit/pull/7776
	// $: prefetch = external ? undefined : (true as const);
</script>

{#if valid}<a {...attrs} href={final_href} {rel} {target} on:click><slot /></a>{:else}<slot />{/if}
