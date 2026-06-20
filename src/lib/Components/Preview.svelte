<!-- Opt out of the project-wide `runes: true` (see vite.config.ts) to keep Svelte 4 syntax -->
<svelte:options runes={false} />

<script lang="ts">
	import { mdiCodeTags } from '@mdi/js';
	import { slide } from 'svelte/transition';

	import Button from '$lib/Components/Button.svelte';
	import Code from './Code.svelte';
	import { cls } from '@layerstack/tailwind';

	export let code: string | null = null;
	export let language = 'svelte';
	export let showCode = false;
</script>

<div class={cls('flex flex-col gap-1', $$props.class)}>
	<div class="Preview border rounded-sm bg-surface-100">
		<div class="p-4">
			<slot />
		</div>

		{#if code && showCode}
			<div transition:slide class="bg-surface-200">
				<Code source={code} {language} classes={{ pre: 'rounded-t-none' }} />
			</div>
		{/if}
	</div>

	{#if code}
		<Button
			icon={mdiCodeTags}
			class="text-surface-content/70 py-1"
			onclick={() => (showCode = !showCode)}
		>
			{showCode ? 'Hide' : 'Show'} Code
		</Button>
	{/if}
</div>
