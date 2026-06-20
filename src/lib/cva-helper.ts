import { cva, cx } from 'class-variance-authority';
import type { VariantProps } from 'class-variance-authority';
import type { ButtonColor, ButtonVariant } from 'svelte-ux';

export { cva, cx };
export type { VariantProps };

type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
	k: infer I
) => void
	? I
	: never;

type ComponentProps<F> = F extends (props?: infer P) => string
	? Omit<NonNullable<P>, 'class' | 'className'>
	: never;

/**
 * Local stand-in for cva 1.0's `compose()`, which is documented at
 * beta.cva.style but has not been published to npm (latest is 0.7.1).
 *
 * Combines several cva definitions into a single component: the returned
 * function forwards the same props to each definition and merges their
 * class output with `cx`. When cva 1.0 ships, this whole file can be
 * replaced by `export { cva, cx, compose } from 'class-variance-authority'`.
 */
export function compose<T extends Array<(props?: never) => string>>(...components: T) {
	type Props = UnionToIntersection<{ [K in keyof T]: ComponentProps<T[K]> }[number]>;
	return (props?: Props): string => cx(components.map((component) => component(props as never)));
}

const BUTTON_COLORS: ButtonColor[] = [
	'default',
	'primary',
	'secondary',
	'accent',
	'neutral',
	'info',
	'success',
	'warning',
	'danger'
];

// `tone` resolves the `default` color to the neutral `surface-content` token;
// every other color uses its own name verbatim.
const tone = (c: ButtonColor) => (c === 'default' ? 'surface-content' : c);

// Per-variant templates: each maps a color to its CSS-variable class list.
const variantColorTemplates: Record<ButtonVariant, (c: ButtonColor) => string[]> = {
	default: (c) => [
		`hover:[--bg-color:var(--color-${tone(c)})]/10`,
		// `default` color inherits text-color rather than setting it.
		...(c === 'default' ? [] : [`[--text-color:var(--color-${c})]`]),
		`[--ring-color:var(--color-${tone(c)})]/60`
	],
	outline: (c) => [
		`hover:[--bg-color:var(--color-${tone(c)})]/10`,
		`[--border-color:var(--color-${tone(c)})]`,
		`[--text-color:var(--color-${tone(c)})]`,
		`[--ring-color:var(--color-${tone(c)})]/60`
	],
	fill: (c) =>
		c === 'default'
			? [
					'[--bg-color:var(--color-surface-content)]',
					'hover:[--bg-color:var(--color-surface-content)]/80',
					'[--text-color:var(--color-surface-200)]',
					'[--ring-color:var(--color-surface-content)]/60'
				]
			: [
					`[--bg-color:var(--color-${c})]`,
					`hover:[--bg-color:var(--color-${c}-600)]`,
					`[--text-color:var(--color-${c}-content)]`,
					`[--ring-color:var(--color-${c})]/60`
				],
	'fill-light': (c) => [
		`[--bg-color:var(--color-${tone(c)})]/10`,
		`hover:[--bg-color:var(--color-${tone(c)})]/20`,
		`[--text-color:var(--color-${tone(c)})]`,
		`[--ring-color:var(--color-${tone(c)})]/60`
	],
	'fill-outline': (c) => [
		`[--bg-color:var(--color-${tone(c)})]/10`,
		`hover:[--bg-color:var(--color-${tone(c)})]/20`,
		`[--border-color:var(--color-${tone(c)})]`,
		`[--text-color:var(--color-${tone(c)})]`,
		`[--ring-color:var(--color-${tone(c)})]/60`
	],
	text: (c) =>
		c === 'default'
			? [
					'[--text-color:var(--color-surface-content)]',
					'hover:[--text-color:var(--color-surface-content)]/80',
					'[--ring-color:var(--color-surface-content)]/60'
				]
			: [
					`[--text-color:var(--color-${c})]`,
					`hover:[--text-color:var(--color-${c}-700)]`,
					`[--ring-color:var(--color-${c})]/60`
				],
	none: () => []
};

/**
 * The variant × color theming matrix, generated from `variantColorTemplates`.
 * Each cell is the list of CSS-variable utility classes for that combination.
 */
export const variantColorStyles = Object.fromEntries(
	(Object.keys(variantColorTemplates) as ButtonVariant[]).map((variant) => [
		variant,
		Object.fromEntries(BUTTON_COLORS.map((color) => [color, variantColorTemplates[variant](color)]))
	])
) as Record<ButtonVariant, Record<ButtonColor, string[]>>;
