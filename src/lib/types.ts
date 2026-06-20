declare module 'svelte-ux/dist/components/ButtonGroup.svelte' {
	import type { ButtonColor, ButtonRounded, ButtonSize, ButtonVariant } from 'svelte-ux';

	type ButtonGroupContext = {
		variant: ButtonVariant | undefined;
		size: ButtonSize | undefined;
		color: ButtonColor | undefined;
		rounded: ButtonRounded | undefined;
	};

	export function getButtonGroup(): ButtonGroupContext | undefined;
	export function setButtonGroup(value: ButtonGroupContext | undefined): void;
}
