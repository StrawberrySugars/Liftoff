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
            <div class="bevBox">
                <div class="flex h-full flex-col rounded-lg border border-gray-300 transition hover:border-gray-400">
                    <div>
                        <img src={beverage.img} alt={beverage.name} class="h-70 w-full rounded-t-lg object-cover">
                        <div class="bevTextStick">
                            <div class="flex-1">
                                <h3 class="font-semibold text-gray-900">{beverage.name}</h3>
                                <p class="bevIng text-sm text-gray-600">{beverage.ingStr} {beverage.requiredPlants.join(', ')}</p>
                            </div>
                            <div>
                                <div class="stickRight ml-auto flex items-center gap-3">
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
                            
                        </div>
                    </div>
                </div>
            </div>
		{/each}
	</div>
</div>

<br />
