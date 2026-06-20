import type { Attachment } from 'svelte/attachments';

export type Attachments<TNode extends EventTarget = Element> = (
	node: TNode
) => (Attachment<TNode> | undefined | null | void | false)[];

/**
 * Helper attachment to handle multiple attachments as a single attachment.
 * Useful for adding attachments to custom components.
 */
export function multi<TNode extends EventTarget = Element>(
	attachments?: Attachments<TNode>
): Attachment<TNode> | undefined {
	if (!attachments) return undefined;

	return (node) => {
		const cleanups: (() => void)[] = [];

		for (const attachment of attachments(node)) {
			if (attachment) {
				const cleanup = attachment(node);
				if (typeof cleanup === 'function') {
					cleanups.push(cleanup);
				}
			}
		}

		return () => {
			for (const cleanup of cleanups) cleanup();
		};
	};
}
