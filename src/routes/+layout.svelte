<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';

	let { children }: { children: Snippet } = $props();
	const currentRoute = $derived(page.url.pathname);
	type Route = '/' | '/beverages' | '/ingredients' | '/nutrition';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<style>
		:global(.sr-only) {
			position: absolute;
			width: 1px;
			height: 1px;
			padding: 0;
			margin: -1px;
			overflow: hidden;
			clip: rect(0, 0, 0, 0);
			white-space: nowrap;
			border-width: 0;
		}
		:global(.focus\:not-sr-only:focus) {
			position: static;
			width: auto;
			height: auto;
			padding: inherit;
			margin: inherit;
			overflow: visible;
			clip: auto;
			white-space: normal;
		}
	</style>
</svelte:head>
<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-blue-600 focus:p-2 focus:text-white"
	>Skip to main content</a
>
<nav class="border-b border-gray-300 p-5" aria-label="Main navigation">
	<div class="flex flex-row">
	<img src={favicon} alt="favicon" class="invert w-8 mr-4" />
		{#snippet navLink(route: Route, label: string)}
			{@const isActive = currentRoute === route}
			<a
				class="mx-1 rounded-lg border p-2 transition-colors {isActive
					? 'border-2 border-black/50 bg-black/10'
					: 'border-black/20 hover:bg-black/20'}"
				href={resolve(route)}
				aria-current={isActive ? 'page' : undefined}>{label}</a
			>
		{/snippet}
		{@render navLink('/', 'Foods')}
		{@render navLink('/beverages', 'Beverages')}
		{@render navLink('/ingredients', 'Ingredients')}
		{@render navLink('/nutrition', 'Nutrition')}
	</div>
</nav>
<main id="main-content">
	{@render children()}
</main>
