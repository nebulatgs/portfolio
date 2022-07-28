<script lang="ts">
	export let workspace = '';
</script>

{#if workspace}
	in <span class="dark:text-ocean-100">{workspace}</span>
{/if}
