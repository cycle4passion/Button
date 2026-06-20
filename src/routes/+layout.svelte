<script lang="ts">
	import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import {
		AppBar,
		AppLayout,
		getSettings,
		settings,
		ThemeInit,
		ThemeSelect
	} from 'svelte-ux';
	import { themes } from '$lib/themes';

	let { children } = $props();

	settings({
		themes,
		components: {
			AppLayout: {
				classes: {
					root: 'bg-surface-200'
				}
			},
			AppBar: {
				classes: {
					root: 'bg-primary text-primary-content shadow-md [text-shadow:1px_1px_2px_theme(colors.primary-700)]'
				}
			}
		}
	});

	const { showDrawer } = getSettings();

	onMount(() => {
		showDrawer.set(false);

		// Delay adding scroll-smooth — matches svelte-ux site (+layout.svelte)
		setTimeout(() => {
			document.documentElement.classList.add('scroll-smooth');
		}, 0);
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ThemeInit />

<AppLayout>
	<AppBar title="Button" menuIcon={null}>
		<div slot="actions" class="flex items-center gap-3">
			<div class="border-r border-primary-content/20 pr-2">
				<ThemeSelect keyboardShortcuts />
			</div>
		</div>
	</AppBar>

	<main class="isolate px-4 pb-8">
		{@render children()}
	</main>
</AppLayout>
