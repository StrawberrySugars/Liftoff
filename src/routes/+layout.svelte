<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex flex-row p-5">
	{#snippet navItem(name: string, href: string)}
	{/snippet}
	{@render navItem('Foods', '/')}
	{@render navItem('Beverages', '/beverages')}
	{@render navItem('Recommended', '/recommended')}
</div>
{@render children()}
