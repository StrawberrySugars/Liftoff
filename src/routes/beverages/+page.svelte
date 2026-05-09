<script lang="ts">
	import { beverages } from '$lib/stores';
	import Popup from '../../components/Popup.svelte';
	let shown = $state(false);
</script>

<h4>List of Beverages</h4>
<div>
	{#each $beverages as beverage (beverage.id)}
		<div class="beverages">
			<ul class="beverageList">
				<li>{beverage.name} - {beverage.description}</li>
			</ul>
		</div>
	{/each}
</div>
