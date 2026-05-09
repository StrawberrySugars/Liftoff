<script lang="ts">
	import { beverages } from '$lib/stores';
	import Popup from '../../components/Popup.svelte';
	let shown = $state(false);
</script>

{#each $beverages as beverage (beverage.id)}
	<div>{beverage.name} - {beverage.description}</div>
{/each}
