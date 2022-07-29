<script lang="ts">
	export let name = '';
</script>

{#if name}
	<span class="inline-block">
		on <span class="dark:text-ocean-magenta inline-block">  {name}</span>
	</span>
{/if}
