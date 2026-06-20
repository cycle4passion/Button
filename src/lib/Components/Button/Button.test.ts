import { describe, expect, test } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import Button from '$lib/Components/Button/Button.svelte';

/** A children snippet that renders some static text, for content assertions. */
function label(text: string) {
	return createRawSnippet(() => ({
		render: () => `<span>${text}</span>`
	}));
}

describe('element type', () => {
	test('renders a <button type="button"> by default', async () => {
		const screen = render(Button, { 'data-testid': 'btn', children: label('Click me') });

		const btn = screen.getByTestId('btn');
		await expect.element(btn).toBeInTheDocument();
		expect(btn.element().tagName).toBe('BUTTON');
		await expect.element(btn).toHaveAttribute('type', 'button');
		await expect.element(btn).toHaveTextContent('Click me');
	});

	test('forwards the `type` prop (e.g. submit)', async () => {
		const screen = render(Button, { type: 'submit', 'data-testid': 'btn' });
		await expect.element(screen.getByTestId('btn')).toHaveAttribute('type', 'submit');
	});

	test('renders an <a> when `href` is set', async () => {
		const screen = render(Button, {
			href: '/somewhere',
			'data-testid': 'btn',
			children: label('Go')
		});

		const link = screen.getByTestId('btn');
		expect(link.element().tagName).toBe('A');
		await expect.element(link).toHaveAttribute('href', '/somewhere');
		// `type` must never leak onto the anchor.
		await expect.element(link).not.toHaveAttribute('type');
	});
});

describe('disabled state', () => {
	test('button: native disabled + aria-disabled, with disabled styling', async () => {
		const screen = render(Button, { disabled: true, 'data-testid': 'btn' });

		const btn = screen.getByTestId('btn');
		await expect.element(btn).toBeDisabled();
		await expect.element(btn).toHaveAttribute('aria-disabled', 'true');
		await expect.element(btn).toHaveClass('opacity-50');
		await expect.element(btn).toHaveClass('pointer-events-none');
	});

	test('button: no aria-disabled attribute when enabled', async () => {
		const screen = render(Button, { 'data-testid': 'btn' });
		await expect.element(screen.getByTestId('btn')).not.toHaveAttribute('aria-disabled');
	});

	// Regression test for the a11y fix: a disabled link must be inert to keyboard,
	// not just the mouse. It drops `href` (no activation target) and `tabindex=-1`
	// (out of the tab order).
	test('anchor: disabled drops href and is removed from the tab order', async () => {
		const screen = render(Button, {
			href: '/somewhere',
			disabled: true,
			'data-testid': 'btn',
			children: label('Go')
		});

		const link = screen.getByTestId('btn');
		expect(link.element().tagName).toBe('A');
		await expect.element(link).not.toHaveAttribute('href');
		await expect.element(link).toHaveAttribute('tabindex', '-1');
		await expect.element(link).toHaveAttribute('aria-disabled', 'true');
	});

	test('anchor: enabled keeps href, no tabindex override, no aria-disabled', async () => {
		const screen = render(Button, {
			href: '/somewhere',
			'data-testid': 'btn',
			children: label('Go')
		});

		const link = screen.getByTestId('btn');
		await expect.element(link).toHaveAttribute('href', '/somewhere');
		await expect.element(link).not.toHaveAttribute('tabindex');
		await expect.element(link).not.toHaveAttribute('aria-disabled');
	});
});

describe('variant / styling props', () => {
	test('emits the `variant-<name>` marker class (default)', async () => {
		const screen = render(Button, { 'data-testid': 'btn' });
		await expect.element(screen.getByTestId('btn')).toHaveClass('variant-default');
	});

	test('emits the `variant-<name>` marker class for an explicit variant', async () => {
		const screen = render(Button, { variant: 'outline', 'data-testid': 'btn' });
		await expect.element(screen.getByTestId('btn')).toHaveClass('variant-outline');
	});

	test('fullWidth switches to block flex layout', async () => {
		const screen = render(Button, { fullWidth: true, 'data-testid': 'btn' });
		const btn = screen.getByTestId('btn');
		await expect.element(btn).toHaveClass('flex');
		await expect.element(btn).toHaveClass('w-full');
	});

	test('loading toggles the gap utility (gap-2 vs gap-1)', async () => {
		const loadingScreen = render(Button, { loading: true, 'data-testid': 'btn' });
		await expect.element(loadingScreen.getByTestId('btn')).toHaveClass('gap-2');

		const idleScreen = render(Button, { 'data-testid': 'idle' });
		await expect.element(idleScreen.getByTestId('idle')).toHaveClass('gap-1');
	});

	test('merges a custom `class` onto the root', async () => {
		const screen = render(Button, { class: 'my-custom-class', 'data-testid': 'btn' });
		await expect.element(screen.getByTestId('btn')).toHaveClass('my-custom-class');
	});
});

describe('attribute forwarding', () => {
	test('forwards arbitrary rest props (aria-label, data-*)', async () => {
		const screen = render(Button, {
			'aria-label': 'Save document',
			'data-testid': 'btn'
		});
		await expect.element(screen.getByTestId('btn')).toHaveAttribute('aria-label', 'Save document');
	});
});

describe('content', () => {
	test('renders a loading spinner when `loading` is true', async () => {
		const screen = render(Button, { loading: true, 'data-testid': 'btn' });
		// ProgressCircle renders an <svg>; the icon branch is skipped while loading.
		expect(screen.getByTestId('btn').element().querySelector('svg')).not.toBeNull();
	});
});
