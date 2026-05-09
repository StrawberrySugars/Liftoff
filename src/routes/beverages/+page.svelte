<script lang="ts">
	import { beverages } from '$lib/stores';
</script>

<div class="navBar">
	<ul>
		<li><a id="box" href="\">Foods</a></li>
		<li><a id="box" href="\beverages">Beverages</a></li>
	</ul>
</div>

<h2>Recommended Meal</h2>

<div class="recMeal">
	<h4>It is recommended for you to have:</h4>
	<ul>
		<li>ingredient 1</li>
		<li>ingredient 2</li>
	</ul>
</div>

<h2>List of Beverages</h2>
<div class="createBeverage">
    + add a beverage
</div>
<div>
    {#each $beverages as beverage (beverage.id)}
        <div class="beverages">
            <div>
                {beverage.name} - {beverage.description} 
            </div>
            <div class="item-middle">
                beverage nutrients
            </div>
            <div>
                delete
            </div>
        </div>
    {/each}
</div>