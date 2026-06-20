<!--
	Svelte wrapper around @pierre/diffs.

	Accepts either precomputed `fileDiff` metadata or `oldFile` + `newFile` contents.
	The library renders into a custom `<diffs-container>` element and manages its own DOM.
-->
<script lang="ts" module>
	import type {
		DiffLineAnnotation,
		FileContents,
		FileDiffMetadata,
		FileDiffOptions,
		SelectedLineRange,
		VirtualFileMetrics,
		VirtualizerConfig
	} from '@pierre/diffs';
	import type { WorkerPoolManager } from '@pierre/diffs/worker';

	/** Public props — re-exports FileDiffOptions so callers can pass theme/diffStyle/etc. directly. */
	export type DiffProps<LAnnotation = undefined> = {
		fileDiff?: FileDiffMetadata;
		oldFile?: FileContents;
		newFile?: FileContents;
		options?: FileDiffOptions<LAnnotation>;
		metrics?: Partial<VirtualFileMetrics>;
		lineAnnotations?: DiffLineAnnotation<LAnnotation>[];
		selectedLines?: SelectedLineRange | null;
		prerenderedHTML?: string;
		disableWorkerPool?: boolean;
		workerPool?: WorkerPoolManager;
		virtualizerConfig?: Partial<VirtualizerConfig>;
		/** Use VirtualizedFileDiff. Defaults to false — better for dialogs and small views. */
		virtualized?: boolean;
		class?: string;
		style?: string | null;
		contentClass?: string;
		contentStyle?: string | null;
	} & FileDiffOptions<LAnnotation>;
</script>

<script lang="ts">
	import {
		FileDiff,
		Virtualizer,
		VirtualizedFileDiff,
		areOptionsEqual,
		parseDiffFromFile
	} from '@pierre/diffs';

	let {
		fileDiff: fileDiffProp,
		oldFile,
		newFile,
		options: optionsProp,
		metrics,
		lineAnnotations,
		selectedLines,
		prerenderedHTML,
		disableWorkerPool = false,
		workerPool,
		virtualizerConfig,
		virtualized = false,
		class: className,
		style,
		contentClass: contentClassName,
		contentStyle,
		// Remaining FileDiffOptions (theme, diffStyle, etc.) spread into mergedOptions
		...fileDiffOptions
	}: DiffProps = $props();

	// DOM refs — fileContainer is where @pierre/diffs mounts its output
	let scrollRoot = $state<HTMLDivElement>();
	let contentWrapper = $state<HTMLDivElement>();
	let fileContainer = $state<HTMLElement>();

	// Imperative library instances (not Svelte components)
	let virtualizer: Virtualizer | undefined;
	let diffInstance: FileDiff | VirtualizedFileDiff | undefined;

	// Merge top-level props with explicit `options` prop; enable controlled selection when requested
	const mergedOptions = $derived.by((): FileDiffOptions<undefined> => {
		const options: FileDiffOptions<undefined> = { ...fileDiffOptions, ...optionsProp };
		if (selectedLines !== undefined) {
			options.controlledSelection = true;
		}
		return options;
	});

	// Use provided metadata, or compute from old/new file pair
	const fileDiff = $derived.by((): FileDiffMetadata | undefined => {
		if (fileDiffProp) return fileDiffProp;
		if (oldFile && newFile) {
			return parseDiffFromFile(oldFile, newFile, mergedOptions.parseDiffOptions);
		}
		return undefined;
	});

	const workerManager = $derived(disableWorkerPool ? undefined : workerPool);

	/** Create, hydrate, or update the @pierre/diffs instance when inputs change. */
	function updateDiffInstance() {
		const container = fileContainer;
		const diff = fileDiff;
		const options = mergedOptions;
		if (!container || !diff) return;

		if (!diffInstance) {
			// First mount — hydrate attaches to diffs-container
			diffInstance = virtualized
				? new VirtualizedFileDiff(options, virtualizer!, metrics, workerManager, true)
				: new FileDiff(options, workerManager, true);
			diffInstance.hydrate({
				fileDiff: diff,
				fileContainer: container,
				lineAnnotations,
				prerenderedHTML,
				oldFile,
				newFile
			});
			return;
		}

		// Subsequent updates — re-render only when options materially change
		const forceRender = !areOptionsEqual(diffInstance.options, options);
		diffInstance.setOptions(options);
		if (virtualized && diffInstance instanceof VirtualizedFileDiff && metrics) {
			diffInstance.setMetrics(metrics);
		}
		diffInstance.render({
			forceRender,
			fileDiff: diff,
			lineAnnotations,
			oldFile,
			newFile
		});

		if (selectedLines !== undefined) {
			diffInstance.setSelectedLines(selectedLines);
		}
	}

	// Virtualized mode: wire scroll container ↔ content wrapper before diff mounts
	$effect(() => {
		if (!virtualized) return;

		const root = scrollRoot;
		const wrapper = contentWrapper;
		if (!root || !wrapper) return;

		const instance = new Virtualizer(virtualizerConfig);
		instance.setup(root, wrapper);
		virtualizer = instance;

		return () => {
			instance.cleanUp();
			virtualizer = undefined;
		};
	});

	// Re-run when fileDiff, options, or virtualizer readiness changes
	$effect(() => {
		if (virtualized && !virtualizer) return;
		updateDiffInstance();
	});

	// Tear down library instance on component destroy
	$effect(() => {
		return () => {
			diffInstance?.cleanUp();
			diffInstance = undefined;
		};
	});
</script>

{#if virtualized}
	<!-- Scroll root + inner wrapper required by Virtualizer -->
	<div bind:this={scrollRoot} class={className} {style}>
		<div bind:this={contentWrapper} class={contentClassName} style={contentStyle}>
			<diffs-container bind:this={fileContainer}></diffs-container>
		</div>
	</div>
{:else}
	<div class={className} {style}>
		<diffs-container bind:this={fileContainer}></diffs-container>
	</div>
{/if}
