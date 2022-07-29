<script lang="ts">
	export let workspace = '';
</script>

{#if workspace}
	<span class="inline-block">
		in <span class="dark:text-ocean-100">{workspace}</span>
	</span>
{/if}
