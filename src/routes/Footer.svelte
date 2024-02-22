<script lang="ts">
	import Github_Logo from '@ryanatkn/fuz/Github_Logo.svelte';
</script>

<footer class="logo box">
	<a href="https://github.com/ryanatkn/end-user-markdown-sketch"
		><slot name="logo"><Github_Logo /></slot></a
	>
</footer>

<style>
	footer {
		margin: var(--spacing_7) 0;
	}
	.logo {
		display: flex;
	}
	.logo a {
		--border_width: var(--border_width_4);
		--border_color: transparent;
		text-decoration: none;
		display: flex;
		border-radius: 50%;
		border: var(--border_width) double var(--border_color);
	}
	.logo a:hover {
		--border_color: var(--color_a);
	}
</style>
