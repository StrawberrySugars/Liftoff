<script lang="ts">
	import { beverages } from '$lib/beverages';
	import Popup from '../../components/Popup.svelte';
	import RecommendedMeals from '../../components/RecommendedMeals.svelte';
	let shown = $state(false);
</script>

<RecommendedMeals />

<h2>List of Beverages</h2>
<div class="createBeverage">+ add a beverage</div>
<div>
	{#each $beverages as beverage (beverage.id)}
		<div class="beverages">
			<div>
				{beverage.name} - {beverage.description}
			</div>
			<div class="item-middle">beverage nutrients</div>
			<div class="editBeverage">edit</div>
		</div>
	{/each}
</div>
