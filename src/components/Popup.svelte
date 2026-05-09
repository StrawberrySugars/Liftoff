<script lang="ts">
	import { XIcon } from '@lucide/svelte';
	import type { Snippet } from 'svelte';

	const {
		children,
		onDismiss
	}: {
		children: Snippet;
		onDismiss: () => void;
	} = $props();
</script>

<div onclick={onDismiss} />

<div
	class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50"
	onclick={onDismiss}
>
	<div class="rounded bg-white p-6">
		<div>
			<button
				onclick={onDismiss}
				class="ml-auto block cursor-pointer rounded-md p-1 hover:bg-black/10"
			>
				<XIcon />
			</button>
		</div>
		{@render children()}
	</div>
</div>
