<script lang="ts">
	export let lang = '';

	let nodeVersion = '16.16.0';
	let rustVersion = '1.62.1';
	fetch('https://api.github.com/repos/rust-lang/rust/releases/latest')
		.then((res) => res.json())
		.then((res) => {
			rustVersion = res.tag_name ?? rustVersion;
		});
	let langMap: Record<string, string>;
	$: langMap = {
		js: `<span class="dark:text-ocean-green">  ${nodeVersion}</span>`,
		jsx: `<span class="dark:text-ocean-green">  ${nodeVersion}</span>`,
		ts: `<span class="dark:text-ocean-green">  ${nodeVersion}</span>`,
		tsx: `<span class="dark:text-ocean-green">  ${nodeVersion}</span>`,
		svelte: `<span class="dark:text-ocean-green">  ${nodeVersion}</span>`,

		rust: `<span class="dark:text-ocean-rust"> 🦀 v${rustVersion}</span>`
	};
</script>

{#if langMap[lang]}
	<span class="inline-block">
		via {@html langMap[lang]}
	</span>
{/if}
