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

<div
	class="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50"
	onclick={(event) => {
		if (event.target === event.currentTarget) {
			onDismiss();
		}
	}}
	onkeydown={(event) => {
		if (event.key === 'Escape') {
			onDismiss();
		}
	}}
	role="dialog"
	aria-modal="true"
	aria-label="Modal dialog"
>
	<div class="relative mx-4 w-full max-w-2xl rounded bg-white p-6 shadow-lg">
		<button
			onclick={onDismiss}
			class="absolute top-4 right-4 rounded p-2 transition hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
			aria-label="Close dialog"
			title="Close (Esc)"
		>
			<XIcon size={24} aria-hidden="true" />
		</button>
		{@render children()}
	</div>
</div>

<style>
	:global(body.dialog-open) {
		overflow: hidden;
	}
</style>
