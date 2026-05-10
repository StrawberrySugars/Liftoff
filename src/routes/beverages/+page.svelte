<script lang="ts">
	import { beverages } from '$lib/beverages';
	import { MinusIcon, PlusIcon } from '@lucide/svelte';
	import Popup from '../../components/Popup.svelte';
	import { plants } from '$lib/planting';
</script>

<div class="p-5">
	<h2 class="pb-2 text-lg">List of Beverages</h2>
	<div class="mt-5">
		{#each $beverages as beverage, index (beverage.name)}
			<div class="mb-2 flex rounded-lg border border-gray-300 p-3">
				<div>
					<div>
						{beverage.name}
					</div>
                    <div>
                        <img src={beverage.img} alt={beverage.name}>
                    </div>
					<div class="text-black/60">{beverage.ingStr} {beverage.requiredPlants.join(', ')}</div>
					<div class="mt-1 text-xs text-black/50"></div>
				</div>
				<div class="ml-auto flex items-center gap-3">
					<button
						disabled={beverage.amount <= 0}
						class="rounded p-1 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
						onclick={() => beverages.decreaseBeverageAmount(index)}
					>
						<MinusIcon />
					</button>
					<div>{beverage.amount}</div>
					<button
						class="rounded p-1 hover:bg-gray-300"
						onclick={() => beverages.increaseBeverageAmount(index)}
					>
						<PlusIcon />
					</button>
				</div>
			</div>
		{/each}
	</div>
</div>

<br />
