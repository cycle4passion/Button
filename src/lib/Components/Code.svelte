<!-- Opt out of the project-wide `runes: true` (see vite.config.ts) to keep Svelte 4 syntax -->
<svelte:options runes={false} />

<script lang="ts">
	import Prism from 'prismjs';
	import 'prism-svelte';

	import { cls } from '@layerstack/tailwind';

	export let source: string | null = null;
	export let language = 'svelte';

	export let classes: {
		root?: string;
		pre?: string;
		code?: string;
	} = {};

	$: grammar = Prism.languages[language] ?? Prism.languages.svelte;
	$: highlighted = source ? Prism.highlight(source, grammar, language) : '';
</script>

<div class={cls('Code', 'rounded', 'overflow-auto', classes.root, $$props.class)}>
	{#if source}
		<div class="relative">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			<pre class={cls(`language-${language} rounded`, classes.pre)} style="margin: 0;"><code class={cls(`language-${language}`, classes.code)}>{@html highlighted}</code></pre>
		</div>
	{/if}
</div>
