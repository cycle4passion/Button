<script lang="ts">
	import { mdiFileCompare, mdiHome, mdiMagnify, mdiMenu, mdiTrashCan } from '@mdi/js';
	import { faUser } from '@fortawesome/free-solid-svg-icons';

	import {
		Button as UxButton,
		Dialog,
		Field,
		SectionDivider,
		Tooltip,
		Toggle,
		ToggleGroup,
		ToggleOption
	} from 'svelte-ux';
	import ExampleColumns from '$lib/Components/ExampleColumns.svelte';
	import Preview from '$lib/Components/Preview.svelte';
	import Button from '$lib/Components/Button.svelte';
	import OldButton from '$lib/Components/OldButton.svelte';
	import Diff from '$lib/Components/Diff.svelte';
	import oldButtonSource from '$lib/Components/OldButton.svelte?raw';
	import buttonSource from '$lib/Components/Button.svelte?raw';

	let diffOpen = $state(false);
	let size = $state<'sm' | 'md' | 'lg'>('md');

	const variants = ['default', 'outline', 'fill', 'fill-light', 'fill-outline', 'text'] as const;
</script>

<div class="flex items-center justify-between gap-3 pt-5">
	<h1>Examples</h1>
	<Tooltip title="View source diff" placement="bottom">
		<UxButton
			type="button"
			iconOnly
			icon={mdiFileCompare}
			aria-label="View source diff"
			on:click={() => (diffOpen = true)}
		/>
	</Tooltip>
</div>

<div class="grid grid-cols-2 gap-6 border-b border-surface-content/10 pb-2">
	<h2 class="!mb-0 !mt-6">Old Button</h2>
	<h2 class="!mb-0 !mt-6">New Button</h2>
</div>

<h2>Basic</h2>

<ExampleColumns>
	<Preview>
		<OldButton on:click={() => alert('Why did you do that?')}>Click me</OldButton>
	</Preview>

	<Preview>
		<Button onclick={() => alert('Why did you do that?')}>Click me</Button>
	</Preview>
</ExampleColumns>

<h2>Link</h2>

<ExampleColumns>
	<Preview>
		<OldButton href="https://www.google.com" target="_blank">Open Google</OldButton>
	</Preview>

	<Preview>
		<Button href="https://www.google.com" target="_blank">Open Google</Button>
	</Preview>
</ExampleColumns>

<h2>Disabled</h2>

<ExampleColumns>
	<Preview>
		<OldButton disabled>Click me</OldButton>
	</Preview>

	<Preview>
		<Button disabled>Click me</Button>
	</Preview>
</ExampleColumns>

<h2>Loading</h2>

<ExampleColumns>
	<Preview>
		<OldButton loading>Loading...</OldButton>
		<OldButton variant="outline" color="primary" loading>Loading...</OldButton>
		<OldButton variant="fill" color="primary" loading>Loading...</OldButton>
		<OldButton variant="fill-light" color="primary" loading>Loading...</OldButton>
		<OldButton variant="fill-outline" color="primary" loading>Loading...</OldButton>
		<OldButton variant="text" color="primary" loading>Loading...</OldButton>

		<div class="mt-2">
			<Toggle let:on={loading} let:toggle>
				<OldButton {loading} on:click={toggle}>Click me</OldButton>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<OldButton variant="outline" color="primary" {loading} on:click={toggle}>Click me</OldButton
				>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<OldButton variant="fill" color="primary" {loading} on:click={toggle}>Click me</OldButton>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<OldButton variant="fill-light" color="primary" {loading} on:click={toggle}
					>Click me</OldButton
				>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<OldButton variant="fill-outline" color="primary" {loading} on:click={toggle}
					>Click me</OldButton
				>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<OldButton variant="text" color="primary" {loading} on:click={toggle}>Click me</OldButton>
			</Toggle>
		</div>

		<div class="mt-2">
			<Toggle let:on={loading} let:toggle>
				<OldButton icon={faUser} {loading} on:click={toggle}>Click me</OldButton>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<OldButton icon={faUser} variant="outline" color="primary" {loading} on:click={toggle}
					>Click me</OldButton
				>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<OldButton icon={faUser} variant="fill" color="primary" {loading} on:click={toggle}
					>Click me</OldButton
				>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<OldButton icon={faUser} variant="fill-light" color="primary" {loading} on:click={toggle}
					>Click me</OldButton
				>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<OldButton icon={faUser} variant="fill-outline" color="primary" {loading} on:click={toggle}
					>Click me</OldButton
				>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<OldButton icon={faUser} variant="text" color="primary" {loading} on:click={toggle}
					>Click me</OldButton
				>
			</Toggle>
		</div>
	</Preview>

	<Preview>
		<Button loading>Loading...</Button>
		<Button variant="outline" color="primary" loading>Loading...</Button>
		<Button variant="fill" color="primary" loading>Loading...</Button>
		<Button variant="fill-light" color="primary" loading>Loading...</Button>
		<Button variant="fill-outline" color="primary" loading>Loading...</Button>
		<Button variant="text" color="primary" loading>Loading...</Button>

		<div class="mt-2">
			<Toggle let:on={loading} let:toggle>
				<Button {loading} onclick={toggle}>Click me</Button>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<Button variant="outline" color="primary" {loading} onclick={toggle}>Click me</Button>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<Button variant="fill" color="primary" {loading} onclick={toggle}>Click me</Button>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<Button variant="fill-light" color="primary" {loading} onclick={toggle}>Click me</Button>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<Button variant="fill-outline" color="primary" {loading} onclick={toggle}>Click me</Button>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<Button variant="text" color="primary" {loading} onclick={toggle}>Click me</Button>
			</Toggle>
		</div>

		<div class="mt-2">
			<Toggle let:on={loading} let:toggle>
				<Button icon={faUser} {loading} onclick={toggle}>Click me</Button>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<Button icon={faUser} variant="outline" color="primary" {loading} onclick={toggle}
					>Click me</Button
				>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<Button icon={faUser} variant="fill" color="primary" {loading} onclick={toggle}
					>Click me</Button
				>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<Button icon={faUser} variant="fill-light" color="primary" {loading} onclick={toggle}
					>Click me</Button
				>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<Button icon={faUser} variant="fill-outline" color="primary" {loading} onclick={toggle}
					>Click me</Button
				>
			</Toggle>
			<Toggle let:on={loading} let:toggle>
				<Button icon={faUser} variant="text" color="primary" {loading} onclick={toggle}
					>Click me</Button
				>
			</Toggle>
		</div>
	</Preview>
</ExampleColumns>

<div class="grid grid-cols-[1fr_auto] gap-2 items-end">
	<h2>Variants, Color & Size</h2>
	<Field label="size: " labelPlacement="left" class="mb-1">
		<ToggleGroup bind:value={size} size="sm">
			<ToggleOption value="sm">sm</ToggleOption>
			<ToggleOption value="md">md</ToggleOption>
			<ToggleOption value="lg">lg</ToggleOption>
		</ToggleGroup>
	</Field>
</div>

<ExampleColumns>
	<Preview>
		<div class="grid gap-3 divide-y">
			{#each variants as variant (variant)}
				<div>
					<div class="font-semibold my-2">{variant}</div>
					<div class="grid gap-2 ml-4">
						<div>
							<OldButton {variant} {size}>Default</OldButton>
							<OldButton {variant} {size} color="primary">Primary</OldButton>
							<OldButton {variant} {size} color="secondary">Secondary</OldButton>
							<OldButton {variant} {size} color="accent">Accent</OldButton>
							<OldButton {variant} {size} color="neutral">Neutral</OldButton>
						</div>
						<div>
							<OldButton {variant} {size} color="info">Info</OldButton>
							<OldButton {variant} {size} color="success">Success</OldButton>
							<OldButton {variant} {size} color="warning">Warning</OldButton>
							<OldButton {variant} {size} color="danger">Danger</OldButton>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Preview>

	<Preview>
		<div class="grid gap-3 divide-y">
			{#each variants as variant (variant)}
				<div>
					<div class="font-semibold my-2">{variant}</div>
					<div class="grid gap-2 ml-4">
						<div>
							<Button {variant} {size}>Default</Button>
							<Button {variant} {size} color="primary">Primary</Button>
							<Button {variant} {size} color="secondary">Secondary</Button>
							<Button {variant} {size} color="accent">Accent</Button>
							<Button {variant} {size} color="neutral">Neutral</Button>
						</div>
						<div>
							<Button {variant} {size} color="info">Info</Button>
							<Button {variant} {size} color="success">Success</Button>
							<Button {variant} {size} color="warning">Warning</Button>
							<Button {variant} {size} color="danger">Danger</Button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</Preview>
</ExampleColumns>

<h2>`none` variant</h2>

<ExampleColumns>
	<Preview>
		<OldButton variant="none">Click me</OldButton>
	</Preview>

	<Preview>
		<Button variant="none">Click me</Button>
	</Preview>
</ExampleColumns>

<h2>Rounded</h2>

<ExampleColumns>
	<Preview>
		<div class="grid gap-2">
			<div>
				<OldButton>default</OldButton>
				<OldButton rounded>rounded</OldButton>
				<OldButton rounded="full">full</OldButton>
				<OldButton rounded={false}>false</OldButton>
			</div>
			<div>
				<OldButton variant="outline" color="primary">default</OldButton>
				<OldButton variant="outline" color="primary" rounded>rounded</OldButton>
				<OldButton variant="outline" color="primary" rounded="full">full</OldButton>
				<OldButton variant="outline" color="primary" rounded={false}>false</OldButton>
			</div>
			<div>
				<OldButton variant="fill" color="primary">default</OldButton>
				<OldButton variant="fill" color="primary" rounded>rounded</OldButton>
				<OldButton variant="fill" color="primary" rounded="full">full</OldButton>
				<OldButton variant="fill" color="primary" rounded={false}>false</OldButton>
			</div>
			<div>
				<OldButton variant="fill-light" color="primary">default</OldButton>
				<OldButton variant="fill-light" color="primary" rounded>rounded</OldButton>
				<OldButton variant="fill-light" color="primary" rounded="full">full</OldButton>
				<OldButton variant="fill-light" color="primary" rounded={false}>false</OldButton>
			</div>
			<div>
				<OldButton variant="fill-outline" color="primary">default</OldButton>
				<OldButton variant="fill-outline" color="primary" rounded>rounded</OldButton>
				<OldButton variant="fill-outline" color="primary" rounded="full">full</OldButton>
				<OldButton variant="fill-outline" color="primary" rounded={false}>false</OldButton>
			</div>
		</div>
	</Preview>

	<Preview>
		<div class="grid gap-2">
			<div>
				<Button>default</Button>
				<Button rounded>rounded</Button>
				<Button rounded="full">full</Button>
				<Button rounded={false}>false</Button>
			</div>
			<div>
				<Button variant="outline" color="primary">default</Button>
				<Button variant="outline" color="primary" rounded>rounded</Button>
				<Button variant="outline" color="primary" rounded="full">full</Button>
				<Button variant="outline" color="primary" rounded={false}>false</Button>
			</div>
			<div>
				<Button variant="fill" color="primary">default</Button>
				<Button variant="fill" color="primary" rounded>rounded</Button>
				<Button variant="fill" color="primary" rounded="full">full</Button>
				<Button variant="fill" color="primary" rounded={false}>false</Button>
			</div>
			<div>
				<Button variant="fill-light" color="primary">default</Button>
				<Button variant="fill-light" color="primary" rounded>rounded</Button>
				<Button variant="fill-light" color="primary" rounded="full">full</Button>
				<Button variant="fill-light" color="primary" rounded={false}>false</Button>
			</div>
			<div>
				<Button variant="fill-outline" color="primary">default</Button>
				<Button variant="fill-outline" color="primary" rounded>rounded</Button>
				<Button variant="fill-outline" color="primary" rounded="full">full</Button>
				<Button variant="fill-outline" color="primary" rounded={false}>false</Button>
			</div>
		</div>
	</Preview>
</ExampleColumns>

<h2>Uppercase</h2>

<ExampleColumns>
	<Preview>
		<OldButton class="uppercase">default</OldButton>
		<OldButton class="uppercase" variant="outline" color="primary">outline</OldButton>
		<OldButton class="uppercase" variant="fill" color="primary">fill</OldButton>
		<OldButton class="uppercase" variant="fill-light" color="primary">fill-light</OldButton>
		<OldButton class="uppercase" variant="fill-outline" color="primary">fill-outline</OldButton>
		<OldButton class="uppercase" variant="text" color="primary">text</OldButton>
	</Preview>

	<Preview>
		<Button class="uppercase">default</Button>
		<Button class="uppercase" variant="outline" color="primary">outline</Button>
		<Button class="uppercase" variant="fill" color="primary">fill</Button>
		<Button class="uppercase" variant="fill-light" color="primary">fill-light</Button>
		<Button class="uppercase" variant="fill-outline" color="primary">fill-outline</Button>
		<Button class="uppercase" variant="text" color="primary">text</Button>
	</Preview>
</ExampleColumns>

<h2>Tooltip</h2>

<ExampleColumns>
	<Preview>
		<Tooltip title="Really, do it!" placement="right" offset={2}>
			<OldButton>Click me</OldButton>
		</Tooltip>
	</Preview>

	<Preview>
		<Tooltip title="Really, do it!" placement="right" offset={2}>
			<Button>Click me</Button>
		</Tooltip>
	</Preview>
</ExampleColumns>

<h2>Tooltip (disabled)</h2>

<ExampleColumns>
	<Preview>
		<Tooltip title="Really, do it!" placement="right" offset={2}>
			<OldButton disabled>Click me</OldButton>
		</Tooltip>
	</Preview>

	<Preview>
		<Tooltip title="Really, do it!" placement="right" offset={2}>
			<Button disabled>Click me</Button>
		</Tooltip>
	</Preview>
</ExampleColumns>

<h2>Text with icon</h2>

<ExampleColumns>
	<Preview>
		<div class="flex items-center">
			<OldButton icon={mdiTrashCan} color="danger">Delete</OldButton>
			<OldButton icon={mdiMagnify} class="flex-row-reverse">Search</OldButton>
			<OldButton icon={mdiHome} class="flex-col">Home</OldButton>
			<OldButton icon={mdiHome} class="flex-col-reverse">Home</OldButton>
			<OldButton icon={faUser}>Profile</OldButton>
		</div>
	</Preview>

	<Preview>
		<div class="flex items-center">
			<Button icon={mdiTrashCan} color="danger">Delete</Button>
			<Button icon={mdiMagnify} class="flex-row-reverse">Search</Button>
			<Button icon={mdiHome} class="flex-col">Home</Button>
			<Button icon={mdiHome} class="flex-col-reverse">Home</Button>
			<Button icon={faUser}>Profile</Button>
		</div>
	</Preview>
</ExampleColumns>

<h2>Pass props to Icon</h2>

<ExampleColumns>
	<Preview>
		<OldButton icon={{ data: mdiTrashCan, size: '2rem', style: 'color: crimson' }} color="danger">
			Delete
		</OldButton>
	</Preview>

	<Preview>
		<Button icon={{ data: mdiTrashCan, size: '2rem', style: 'color: crimson' }} color="danger">
			Delete
		</Button>
	</Preview>
</ExampleColumns>

<h2>Pass class to Icon</h2>

<ExampleColumns>
	<Preview>
		<OldButton icon={mdiTrashCan} classes={{ icon: 'text-danger-300 text-lg' }} color="danger">
			Delete
		</OldButton>
	</Preview>

	<Preview>
		<Button icon={mdiTrashCan} classes={{ icon: 'text-danger-300 text-lg' }} color="danger">
			Delete
		</Button>
	</Preview>
</ExampleColumns>

<SectionDivider class="mt-12">Icon only</SectionDivider>

<h2>Icon-only button</h2>

<ExampleColumns>
	<Preview>
		<OldButton icon={mdiMenu} />
	</Preview>

	<Preview>
		<Button icon={mdiMenu} />
	</Preview>
</ExampleColumns>

<h2>Icon-only size</h2>

<ExampleColumns>
	<Preview>
		<OldButton icon={mdiMenu} size="sm" />
		<OldButton icon={mdiMenu} size="md" />
		<OldButton icon={mdiMenu} size="lg" />
	</Preview>

	<Preview>
		<Button icon={mdiMenu} size="sm" />
		<Button icon={mdiMenu} size="md" />
		<Button icon={mdiMenu} size="lg" />
	</Preview>
</ExampleColumns>

<h2>Icon-only button with custom padding</h2>

<ExampleColumns>
	<Preview>
		<OldButton icon={mdiMenu} class="p-2" />
	</Preview>

	<Preview>
		<Button icon={mdiMenu} class="p-2" />
	</Preview>
</ExampleColumns>

<h2>Icon via url</h2>

<ExampleColumns>
	<Preview>
		<OldButton icon="https://api.iconify.design/mdi:account.svg" class="p-2" />
	</Preview>

	<Preview>
		<Button icon="https://api.iconify.design/mdi:account.svg" class="p-2" />
	</Preview>
</ExampleColumns>

<h2>Icon via SVG string</h2>

<ExampleColumns>
	<Preview>
		<OldButton
			icon='<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/></svg>'
			class="p-2"
		/>
	</Preview>

	<Preview>
		<Button
			icon='<svg width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"/></svg>'
			class="p-2"
		/>
	</Preview>
</ExampleColumns>

<h2>Icon-only button variants and color</h2>

<ExampleColumns>
	<Preview>
		<div>
			<OldButton icon={mdiMenu} />
			<OldButton icon={mdiMenu} color="primary" />
		</div>
		<div>
			<OldButton icon={mdiMenu} variant="outline" />
			<OldButton icon={mdiMenu} variant="outline" color="primary" />
		</div>
		<div>
			<OldButton icon={mdiMenu} variant="fill" />
			<OldButton icon={mdiMenu} variant="fill" color="primary" />
		</div>
		<div>
			<OldButton icon={mdiMenu} variant="fill-light" />
			<OldButton icon={mdiMenu} variant="fill-light" color="primary" />
		</div>
		<div>
			<OldButton icon={mdiMenu} variant="fill-outline" />
			<OldButton icon={mdiMenu} variant="fill-outline" color="primary" />
		</div>
		<div>
			<OldButton icon={mdiMenu} variant="text" />
			<OldButton icon={mdiMenu} variant="text" color="primary" />
		</div>
	</Preview>

	<Preview>
		<div>
			<Button icon={mdiMenu} />
			<Button icon={mdiMenu} color="primary" />
		</div>
		<div>
			<Button icon={mdiMenu} variant="outline" />
			<Button icon={mdiMenu} variant="outline" color="primary" />
		</div>
		<div>
			<Button icon={mdiMenu} variant="fill" />
			<Button icon={mdiMenu} variant="fill" color="primary" />
		</div>
		<div>
			<Button icon={mdiMenu} variant="fill-light" />
			<Button icon={mdiMenu} variant="fill-light" color="primary" />
		</div>
		<div>
			<Button icon={mdiMenu} variant="fill-outline" />
			<Button icon={mdiMenu} variant="fill-outline" color="primary" />
		</div>
		<div>
			<Button icon={mdiMenu} variant="text" />
			<Button icon={mdiMenu} variant="text" color="primary" />
		</div>
	</Preview>
</ExampleColumns>

<Dialog
	bind:open={diffOpen}
	class="h-[92vh] w-[96vw] max-w-none"
	classes={{ dialog: 'flex h-full max-h-[92vh] flex-col' }}
>
	<div slot="title">Button.svelte diff</div>

	<div class="min-h-0 flex-1 overflow-hidden px-6 pb-4">
		<Diff
			class="h-full min-h-0 overflow-auto rounded"
			oldFile={{ name: 'OldButton.svelte', contents: oldButtonSource }}
			newFile={{ name: 'Button.svelte', contents: buttonSource }}
			theme={{ dark: 'pierre-dark', light: 'pierre-light' }}
			diffStyle="split"
		/>
	</div>

	<div slot="actions">
		<UxButton on:click={() => (diffOpen = false)}>Close</UxButton>
	</div>
</Dialog>
