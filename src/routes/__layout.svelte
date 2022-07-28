<script lang="ts">
	import srcsetAvif from '$lib/../../static/bg.png?w=1280;1920&avif&srcset';
	import srcsetWebp from '$lib/../../static/bg.png?w=1280;1920&webp&srcset';
	import { onMount } from 'svelte';
	import '../app.css';
	let img: HTMLImageElement;
	let canvas: HTMLCanvasElement;
	let width = 1920;
	let height = 1280;
	const setImgPos = (ctx: CanvasRenderingContext2D) => {
		const scaleX = canvas.width / window.screen.width;
		const scaleY = canvas.height / window.screen.height;
		const screenX = window.screenX * scaleX;
		const screenY = window.screenY * scaleY;
		ctx?.drawImage(
			img,
			Math.min(Math.max(-screenX, window.innerWidth - canvas.width), 0),
			Math.min(-screenY, 0),
			canvas.width,
			canvas.height
		);
		console.log(Math.min(Math.max(-screenY, window.innerWidth - canvas.width), 0), screenX);
		requestAnimationFrame(() => setImgPos(ctx));
	};
	onMount(() => {
		width = window.screen.width;
		height = window.screen.height;
		const ctx = canvas?.getContext('2d');
		if (ctx) {
			setImgPos(ctx);
		}
	});
</script>

<main>
	<picture>
		<source srcset="${srcsetAvif}" type="image/avif" />
		<source srcset="${srcsetWebp}" type="image/webp" />
		<img bind:this={img} class="hidden" alt="Background" />
	</picture>
	<canvas {width} {height} class="fixed -z-20" bind:this={canvas} />
	<div class="fixed bg-[#202020cc] backdrop-blur-[400px] top-0 bottom-0 w-full h-full -z-10" />
	<slot />
</main>

<footer />
