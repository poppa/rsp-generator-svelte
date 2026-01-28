<script lang="ts">
import type { Maybe } from '$lib/type-types'
import { onMount } from 'svelte'

interface Props extends PropsWithChildren {
	title: string
	type?: 'alert' | 'confirm'
	onConfirm?: () => void
	onCancel?: () => void
	okButtonText?: string
	cancelButtonText?: string
}

const {
	title,
	type = 'alert',
	onConfirm = () => {},
	onCancel = () => {},
	children,
	cancelButtonText = 'Cancel',
	okButtonText = 'OK'
}: Props = $props()

let dialogElement: Maybe<HTMLDialogElement>

export function showModal() {
	dialogElement?.showModal()
}

export function close() {
	dialogElement?.close()
}

onMount(() => {
	showModal()
})
</script>

<dialog bind:this={dialogElement}>
	<h2>{title}</h2>
	<div class="dialog-content">
		{@render children()}
	</div>

	<div class="dialog-actions">
		{#if type === 'confirm'}
			<button
				onclick={() => {
					onConfirm()
					close()
				}}
			>
				{okButtonText}
			</button>
		{/if}
		<button
			onclick={() => {
				onCancel()
				close()
			}}
		>
			{type === 'confirm' ? cancelButtonText : okButtonText}
		</button>
	</div>
</dialog>

<style>
dialog {
	border: 2px solid var(--color-dark);
	border-radius: var(--border-radius);
	padding: var(--gutter);
	background-color: var(--color-lighter);
	box-shadow: 5px 5px 10px 2px rgb(0 0 0 / 0.2);
}

dialog::backdrop {
	background-color: color(from var(--color-dark) srgb r g b / 0.5);
}

.dialog-content {
	margin-bottom: var(--gutter);
}

h2 {
	--neg-space: calc(-1 * var(--gutter));
	margin: var(--neg-space) var(--neg-space) var(--gutter-block) var(--neg-space);
	padding: var(--gutter-block) var(--gutter);
	font-size: medium;
	background-color: var(--color-light);
}

.dialog-actions {
	display: flex;
	gap: 0.3em;
	justify-content: flex-end;
}
</style>
