<script lang="ts">
	import {base} from '$app/paths';
	import {page} from '$app/stores';
</script>

<div class="box prose">
	<p>/{$page.params.slug}</p>
	<p><a href="{base}/">go home</a></p>
</div>
