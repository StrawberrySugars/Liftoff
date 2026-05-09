<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>
<div class="flex flex-row p-5">
	{#snippet navItem(name: string, href: string)}
		<a class="mx-1 rounded-lg border border-black/20 p-2 hover:bg-black/20" {href}>{name}</a>
	{/snippet}
	{@render navItem('Foods', '/')}
	{@render navItem('Beverages', '/beverages')}
	{@render navItem('Recommended', '/recommended')}
</div>
{@render children()}
