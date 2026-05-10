<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="flex flex-row p-5">
	<a class="mx-1 rounded-lg border border-black/20 p-2 hover:bg-black/20" href={resolve('/')}
		>Foods</a
	>
	<a
		class="mx-1 rounded-lg border border-black/20 p-2 hover:bg-black/20"
		href={resolve('/beverages')}>Beverages</a
	>
	<a
		class="mx-1 rounded-lg border border-black/20 p-2 hover:bg-black/20"
		href={resolve('/recommended')}>Recommended</a
	>
</div>
{@render children()}
