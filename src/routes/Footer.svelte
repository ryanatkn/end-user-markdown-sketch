<script lang="ts">
	import Svg from '@ryanatkn/fuz/Svg.svelte';
	import {github_logo} from '@ryanatkn/fuz/logos.js';
	import type {Snippet} from 'svelte';

	interface Props {
		logo?: Snippet;
	}

	const {logo}: Props = $props();
</script>

<footer class="logo box">
	<a href="https://github.com/ryanatkn/end-user-markdown-sketch"
		>{#if logo}{@render logo()}{:else}<Svg data={github_logo} />{/if}</a
	>
</footer>

<style>
	footer {
		margin: var(--space_xl7) 0;
	}
	.logo {
		display: flex;
	}
	.logo a {
		width: var(--icon_size_lg);
		height: var(--icon_size_lg);
		--border_width: var(--border_width_4);
		--border_color: transparent;
		text-decoration: none;
		display: flex;
		border-radius: 50%;
		border: var(--border_width) double var(--border_color);
	}
	.logo a:hover {
		--border_color: var(--color_a_5);
	}
</style>
