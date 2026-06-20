<script lang="ts">
	import { slide } from 'svelte/transition';
	import { cls } from '@layerstack/tailwind';
	import { multi, type Attachments } from '$lib/attatchments/multi';
	import { Icon, ProgressCircle, getComponentSettings } from 'svelte-ux';
	import { asIconData } from 'svelte-ux/utils/icons';
	import { cva, compose, variantColorStyles } from '$lib/cva-helper';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import type { ButtonColor, ButtonVariant, ButtonRounded, ButtonSize } from 'svelte-ux';

	type IconInput = Parameters<typeof asIconData>[0];

	interface Props {
		type?: 'button' | 'submit' | 'reset';
		href?: string | undefined;
		target?: string | undefined;
		fullWidth?: boolean;
		icon?: IconInput;
		iconOnly?: boolean;
		attachments?: Attachments<HTMLAnchorElement | HTMLButtonElement> | undefined;
		loading?: boolean;
		disabled?: boolean;
		rounded?: ButtonRounded | undefined;
		variant?: ButtonVariant | undefined;
		size?: ButtonSize | undefined;
		color?: ButtonColor | undefined;
		classes?: {
			root?: string;
			icon?: string;
			loading?: string;
		};
		class?: string;
		style?: string;
		children?: Snippet;
	}

	type ButtonGroupContext = {
		variant: ButtonVariant | undefined;
		size: ButtonSize | undefined;
		color: ButtonColor | undefined;
		rounded: ButtonRounded | undefined;
	};

	let {
		type = 'button',
		href = undefined,
		target = undefined,
		fullWidth = false,
		icon = undefined,
		attachments = undefined,
		loading = false,
		disabled = false,
		rounded = undefined,
		variant = undefined,
		size = undefined,
		color = undefined,
		classes = {},
		class: className = '',
		style = '',
		children,
		iconOnly = icon !== undefined && !children,
		...restProps
	}: Props & (HTMLAnchorAttributes | HTMLButtonAttributes) = $props();

	// Every variant except `none`, which opts out of all layout/sizing/theming.
	const STYLED_VARIANTS: ButtonVariant[] = [
		'default',
		'outline',
		'fill',
		'fill-outline',
		'fill-light',
		'text'
	];

	const { classes: settingsClasses, defaults } = getComponentSettings('Button');

	// Override default from `ButtonGroup` if set (not used on docs page)
	const groupContext = undefined as ButtonGroupContext | undefined;

	// Structure: layout, sizing, shape and the per-variant CSS-variable bindings.
	const buttonBase = cva(
		[
			'Button',
			'transition duration-200 ring-surface-content/60 touch-manipulation',
			'focus:outline-none focus-visible:ring-1'
		],
		{
			variants: {
				variant: {
					default: 'text-[var(--text-color)] bg-[var(--bg-color)] ring-[var(--ring-color)]',
					outline:
						'text-[var(--text-color)] bg-[var(--bg-color)] ring-[var(--ring-color)] border border-[var(--border-color)] focus-visible:ring-offset-1',
					fill: 'text-[var(--text-color)] bg-[var(--bg-color)] ring-[var(--ring-color)] focus-visible:ring-offset-1',
					'fill-outline':
						'text-[var(--text-color)] bg-[var(--bg-color)] ring-[var(--ring-color)] border border-[var(--border-color)] focus-visible:ring-offset-1',
					'fill-light': 'text-[var(--text-color)] bg-[var(--bg-color)] ring-[var(--ring-color)]',
					text: 'text-[var(--text-color)] ring-[var(--ring-color)] p-0',
					none: ''
				},
				size: { sm: '', md: '', lg: '' },
				iconOnly: { true: '', false: '' },
				fullWidth: { true: 'flex w-full', false: 'inline-flex' },
				loading: { true: 'gap-2', false: 'gap-1' },
				disabled: { true: 'opacity-50 pointer-events-none', false: '' },
				rounded: { true: 'rounded', full: 'rounded-full', false: '' }
			},
			compoundVariants: [
				// Shared layout for every styled (non-`none`) variant.
				{
					variant: STYLED_VARIANTS,
					class: 'items-center justify-center font-medium tracking-wider whitespace-nowrap'
				},
				// Padding/text-size depends on both size and whether the button is icon-only.
				{ variant: STYLED_VARIANTS, iconOnly: false, size: 'sm', class: 'text-xs px-2 py-1' },
				{ variant: STYLED_VARIANTS, iconOnly: false, size: 'md', class: 'text-sm px-4 py-2' },
				{ variant: STYLED_VARIANTS, iconOnly: false, size: 'lg', class: 'text-base px-6 py-3' },
				{ variant: STYLED_VARIANTS, iconOnly: true, size: 'sm', class: 'text-xs p-1' },
				{ variant: STYLED_VARIANTS, iconOnly: true, size: 'md', class: 'text-sm p-2' },
				{ variant: STYLED_VARIANTS, iconOnly: true, size: 'lg', class: 'text-base p-3' }
			]
		}
	);

	// Theming: the variant × color matrix, expressed as compound variants.
	// Sourced from `variantColorStyles` so the data stays in one readable table.
	const buttonColor = cva('', {
		// This empty-string `color` map looks pointless but is load-bearing: it
		// (1) declares `color` as a typed prop on the composed `button()`, and
		// (2) keeps `variants` non-null — cva early-returns and skips
		// `compoundVariants` entirely when `variants` is missing. The actual
		// classes come from `compoundVariants` below; `variant` is omitted here
		// since it's already declared on `buttonBase` and read from props at runtime.
		variants: {
			color: Object.fromEntries(
				(Object.keys(variantColorStyles.default) as ButtonColor[]).map((c) => [c, ''])
			) as Record<ButtonColor, ''>
		},
		compoundVariants: (
			Object.entries(variantColorStyles) as [ButtonVariant, Record<ButtonColor, string[]>][]
		).flatMap(([variant, colors]) =>
			(Object.entries(colors) as [ButtonColor, string[]][]).map(([color, classList]) => ({
				variant,
				color,
				class: classList
			}))
		)
	});

	// `compose` merges the structural and theming definitions into one component.
	const button = compose(buttonBase, buttonColor);

	const _variant: ButtonVariant = $derived(
		variant ?? groupContext?.variant ?? defaults.variant ?? 'default'
	);
	const _size: ButtonSize = $derived(size ?? groupContext?.size ?? defaults.size ?? 'md');
	const _color: ButtonColor = $derived(color ?? groupContext?.color ?? defaults.color ?? 'default');
	const _rounded: ButtonRounded = $derived(
		rounded ?? groupContext?.rounded ?? defaults.rounded ?? (iconOnly ? 'full' : true)
	);

	const _class = $derived(
		cls(
			button({
				variant: _variant,
				color: _color,
				size: _size,
				iconOnly,
				fullWidth,
				loading,
				disabled,
				// `none` opts out of rounding; otherwise `_rounded` (true | 'full') picks the radius.
				rounded: _variant === 'none' ? false : _rounded
			}),
			// Marker class kept for external styling hooks / ButtonGroup selectors.
			`variant-${_variant}`,
			// `cls` (tailwind-merge) lets these override anything cva emitted.
			settingsClasses.root,
			classes.root,
			className
		)
	);
</script>

<!-- Shared inner content for both the anchor and button branches. -->
{#snippet content()}
	{#if loading}
		<span transition:slide={{ axis: 'x', duration: 200 }}>
			<ProgressCircle size={16} width={2} class={cls(settingsClasses.loading, classes.loading)} />
		</span>
	{:else if icon}
		<span in:slide={{ axis: 'x', duration: 200 }}>
			{#if typeof icon === 'string' || 'icon' in icon}
				<!-- font path/url/etc or font-awesome IconDefinition -->
				<Icon
					data={asIconData(icon)}
					class={cls('pointer-events-none', settingsClasses.icon, classes.icon)}
				/>
			{:else}
				<Icon class={cls('pointer-events-none', settingsClasses.icon, classes.icon)} {...icon} />
			{/if}
		</span>
	{/if}

	{@render children?.()}
{/snippet}

{#if href}
	<a
		href={disabled ? undefined : href}
		{target}
		{...restProps as HTMLAnchorAttributes}
		class={_class}
		{style}
		aria-disabled={disabled ? 'true' : undefined}
		tabindex={disabled ? -1 : undefined}
		{@attach multi(attachments)}
	>
		{@render content()}
	</a>
{:else}
	<button
		{type}
		{...restProps as HTMLButtonAttributes}
		class={_class}
		{style}
		{disabled}
		aria-disabled={disabled ? 'true' : undefined}
		{@attach multi(attachments)}
	>
		{@render content()}
	</button>
{/if}
