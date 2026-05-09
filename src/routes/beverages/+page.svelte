<script lang="ts">
	import { beverages } from '$lib/stores';
</script>

{#each $beverages as beverage (beverage.id)}
	<div>{beverage.name} - {beverage.description}</div>
{/each}
