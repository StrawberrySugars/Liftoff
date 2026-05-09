<script lang="ts">
	import { beverages } from '$lib/beverages';
	import Popup from '../../components/Popup.svelte';
	import RecommendedMeals from '../../components/RecommendedMeals.svelte';
	let shown = $state(false);
</script>

<RecommendedMeals />

<h2>List of Beverages</h2>
<div class="create">+ add a beverage</div>
<div>
	{#each $beverages as beverage (beverage.id)}
		<div class="list">
			<div class="item item1">
				{beverage.name}
			</div>
			<div class="item item2">{beverage.calories} calories/8oz</div>
            <div class="item item3">{beverage.amount}g remaining</div>
			<div class="item item4">edit</div>
		</div>
	{/each}
</div>
