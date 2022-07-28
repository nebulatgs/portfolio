<script lang="ts">
	export let name = '';
</script>

{#if name}
	on <span class="dark:text-ocean-magenta">  {name}</span>
{/if}
