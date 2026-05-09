<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="navBar">
	<ul>
		<li><a id="box" href="\">Foods</a></li>
		<li><a id="box" href="\beverages">Beverages</a></li>
	</ul>
</div>
{@render children()}
