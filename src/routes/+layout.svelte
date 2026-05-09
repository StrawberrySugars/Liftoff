<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<base href="%sveltekit.assets%/">
</svelte:head>
<div class="flex flex-row p-5">
	{#snippet navItem(name: string, href: string)}
		<a class="border border-black/20 p-2 hover:bg-black/20" {href}>{name}</a>
	{/snippet}
	{@render navItem('Foods', '/')}
	{@render navItem('Beverages', '/beverages')}
</div>
{@render children()}
