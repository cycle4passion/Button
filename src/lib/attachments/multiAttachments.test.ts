import { describe, expect, test, vi } from 'vitest';
import type { Attachment } from 'svelte/attachments';
import { multi, type Attachments } from './multiAttachments';

/** A real element to act as the attachment target. */
function node() {
	return document.createElement('div');
}

describe('multi', () => {
	test('returns undefined when no attachments factory is given', () => {
		expect(multi()).toBeUndefined();
		expect(multi(undefined)).toBeUndefined();
	});

	test('returns an attachment (function) when given a factory', () => {
		const attachment = multi(() => []);
		expect(typeof attachment).toBe('function');
	});

	test('calls the factory once with the node', () => {
		const el = node();
		const factory = vi.fn<Attachments>(() => []);

		multi(factory)!(el);

		expect(factory).toHaveBeenCalledTimes(1);
		expect(factory).toHaveBeenCalledWith(el);
	});

	test('invokes each attachment with the node', () => {
		const el = node();
		const a = vi.fn<Attachment>();
		const b = vi.fn<Attachment>();

		multi(() => [a, b])!(el);

		expect(a).toHaveBeenCalledTimes(1);
		expect(a).toHaveBeenCalledWith(el);
		expect(b).toHaveBeenCalledTimes(1);
		expect(b).toHaveBeenCalledWith(el);
	});

	test('skips falsy entries without throwing', () => {
		const el = node();
		const real = vi.fn<Attachment>();

		const attachment = multi(() => [false, null, undefined, real]);
		expect(() => attachment!(el)).not.toThrow();
		expect(real).toHaveBeenCalledTimes(1);
	});

	test('aggregates cleanups: the returned cleanup runs every attachment cleanup', () => {
		const el = node();
		const cleanupA = vi.fn();
		const cleanupB = vi.fn();
		const a: Attachment = () => cleanupA;
		const b: Attachment = () => cleanupB;

		const cleanup = multi(() => [a, b])!(el);

		// Cleanups must not run until the aggregate cleanup is invoked.
		expect(cleanupA).not.toHaveBeenCalled();
		expect(cleanupB).not.toHaveBeenCalled();

		cleanup?.();

		expect(cleanupA).toHaveBeenCalledTimes(1);
		expect(cleanupB).toHaveBeenCalledTimes(1);
	});

	test('attachments that return no cleanup are handled (no throw on teardown)', () => {
		const el = node();
		const cleanupB = vi.fn();
		const a: Attachment = () => {}; // returns void
		const b: Attachment = () => cleanupB;

		const cleanup = multi(() => [a, b])!(el);

		expect(() => cleanup?.()).not.toThrow();
		expect(cleanupB).toHaveBeenCalledTimes(1);
	});

	test('only collects function cleanups, ignoring non-function return values', () => {
		const el = node();
		const cleanup = multi(
			// `as` casts simulate attachments whose return type isn't a cleanup fn.
			() => [(() => undefined) as Attachment, (() => 'not a fn') as unknown as Attachment]
		)!(el);

		// Aggregate cleanup is always a function and is safe to call.
		expect(typeof cleanup).toBe('function');
		expect(() => cleanup?.()).not.toThrow();
	});
});
