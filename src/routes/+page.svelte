<script lang="ts">
	import { foods } from '$lib/foods';

	let shown = $state(false);
</script>


<h2>Recommended Foods to Grow</h2>

<div class="recGrow">
	<h4>It is recommended for you to have:</h4>
	<ul>
		<li>ingredient 1</li>
		<li>ingredient 2</li>
	</ul>
</div>

<h2>List of Foods</h2>
<div class="create">+ add a food</div>
<div>
	{#each $foods as food (food.id)}
		<div class="list">
			<div class="item item1">
				{food.name}
			</div>
			<div class="item item2">{food.calories} calories/8oz</div>
            <div class="item item3">{food.amount}g remaining</div>
			<div class="item item4">edit</div>
		</div>
	{/each}
</div>