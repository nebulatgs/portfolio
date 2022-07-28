<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { DateTime } from 'luxon';
	// Components
	import Branch from '$lib/components/Branch.svelte';
	import Language from '$lib/components/Language.svelte';
	import Workspace from '$lib/components/Workspace.svelte';
	import { getCodeData, getOtherActivities } from '$lib/rpcUtils';
	// Lanyard stuff
	import { onMount } from 'svelte';
	import type { useLanyard } from 'svelte-lanyard';

	const timeZone = 'America/New_York';
	let timeZoneToggle = false;

	$: timeFormatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone: timeZoneToggle ? timeZone : undefined
	});
	$: dateFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		timeZoneName: 'short',
		timeZone: timeZoneToggle ? timeZone : undefined
	});

	let now = new Date();
	setInterval(() => {
		now = new Date();
	}, 100);

	$: date = dateFormatter.format(now);
	$: time = timeFormatter.format(now);

	let data: ReturnType<typeof useLanyard>;
	onMount(async () => {
		const { useLanyard } = await import('svelte-lanyard');
		data = useLanyard('524722785302609941');
	});
	$: codeData = getCodeData($data);
	$: otherActivities = getOtherActivities($data);
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="p-24 py-16 font-cascadia z-10 flex justify-between">
	<div>
		<h1 class="text-ocean-700 dark:text-ocean-300">
			<span class="dark:text-ocean-blue">nebula</span>
			<Workspace workspace={codeData?.workspace} />
			<Branch name={codeData?.branch} />
			<Language lang={codeData?.lang} />
		</h1>
		<div class="flex flex-col px-3 py-7 gap-2">
			<span class="text-ocean-900 dark:text-ocean-100">a project</span>
			<span class="text-ocean-900 dark:text-ocean-100">another project</span>
			<span class="text-ocean-900 dark:text-ocean-100">yet another project</span>
			<span class="text-ocean-900 dark:text-ocean-100">you get the point</span>
		</div>
	</div>
	<div class="text-ocean-900 dark:text-ocean-300 flex flex-col items-end gap-7">
		<div
			class="flex flex-col items-end hover:underline cursor-pointer"
			on:click={() => (timeZoneToggle = !timeZoneToggle)}
		>
			<span>{date}</span>
			<span>{time}</span>
		</div>
		{#if $data?.spotify}
			<div class="flex flex-col items-end">
				<span class="text-ocean-900 dark:text-ocean-100">{$data.spotify?.song}</span>
				<span class="text-ocean-800 dark:text-ocean-300">{$data.spotify?.artist}</span>
				<span class="text-ocean-700 dark:text-ocean-400">{$data.spotify?.album}</span>
			</div>
		{/if}
		{#if codeData?.idling}
			<div class="flex flex-col items-end">
				<span class="text-ocean-900 dark:text-ocean-100">vsc</span>
				<span class="text-ocean-700 dark:text-ocean-400">currently idling </span>
			</div>
		{/if}
		{#if codeData && !codeData.idling}
			<div class="flex flex-col items-end">
				<span class="text-ocean-900 dark:text-ocean-100">vsc</span>
				<span class="text-ocean-800 dark:text-ocean-300"
					>{codeData.workspace}/{codeData.branch}</span
				>
				<span class="text-ocean-700 dark:text-ocean-400"
					>currently writing
					<span class="text-ocean-700 dark:text-ocean-200">{codeData.lang}</span>
				</span>
			</div>
		{/if}
		{#if otherActivities}
			{#each otherActivities as activity}
				<div class="flex flex-col items-end">
					<span class="text-ocean-700 dark:text-ocean-400"
						>playing <span class="text-ocean-700 dark:text-ocean-200">{activity.name}</span>
						{#if activity.start}
							for {DateTime.fromJSDate(activity.start)
								.toRelative({
									base: DateTime.fromJSDate(now)
								})
								?.replace(' ago', '')}
						{/if}
					</span>
				</div>
			{/each}
		{/if}
	</div>
</section>
