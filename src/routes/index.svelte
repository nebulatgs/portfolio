<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		window.onblur = () => {};
	});
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="p-5 font-cascadia z-10">
	<h1 class="text-ocean-blue">Nebula</h1>
	<p class="text-ocean-100 indent-4">hi</p>
</section>
