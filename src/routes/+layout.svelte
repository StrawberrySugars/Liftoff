<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';
	import { page } from '$app/state';

	let { children }: { children: Snippet } = $props();
	const currentRoute = $derived(page.url.pathname);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex flex-row border-b border-gray-300 p-5">
	{#snippet navLink(route: string, label: string)}
		{@const isActive = currentRoute === route}
		<a
			class="mx-1 rounded-lg border p-2 transition-colors {isActive
				? 'border-2 border-black/50 bg-black/10'
				: 'border-black/20 hover:bg-black/20'}"
			href={route}>{label}</a
		>
	{/snippet}
	{@render navLink('/', 'Foods')}
	{@render navLink('/beverages', 'Beverages')}
	{@render navLink('/recommended', 'Recommended')}
</div>
{@render children()}
