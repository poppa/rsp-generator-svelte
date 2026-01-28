<script lang="ts">
import { goto } from '$app/navigation'
import { resolve } from '$app/paths'
import { page } from '$app/state'
import Content from '$lib/comp/Content.svelte'
import Dialog from '$lib/comp/Dialog.svelte'
import Matrix from '$lib/comp/Matrix.svelte'
import { deletePlan, loadPlan, savePlan } from '$lib/plan.js'
import type { Maybe } from '$lib/type-types'
import { formatDate } from '$lib/utils'
import { error } from '@sveltejs/kit'

const id = $state(page.url.searchParams.get('id') ?? '')

// This is a hack to update the plan
let iterations = $state(0)

const plan = $derived.by(() => {
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	iterations
	return loadPlan(id)
})

// svelte-ignore state_referenced_locally
if (!plan) {
	void goto(resolve('/'))
	// This will cause an `Uncaught (in promise)` error, but hopefully we've
	// already been redirected then.
	error(404)
}

const date = $derived(new Date(plan.date))

let confirmDelete: 'none' | 'confirm' = $state('none')

const drop = () => {
	if (confirmDelete === 'none') {
		confirmDelete = 'confirm'
	} else if (confirmDelete === 'confirm') {
		deletePlan(id)
		confirmDelete = 'none'
		goto(resolve('/'))
	}
}

let editMode = $state(false)

const edit = () => {
	if (editMode) {
		editMode = false

		const titleValue = titleElem?.innerText.trim() || plan.name
		plan.name = titleValue

		const dateVal = dateElem?.valueAsDate ?? date
		plan.date = dateVal.getTime()

		savePlan(plan)

		iterations += 1

		return
	}

	editMode = true
}

let titleElem: Maybe<HTMLElement> = $state(undefined)
let dateElem: Maybe<HTMLInputElement> = $state(undefined)
</script>

<svelte:head>
	<title
		>RSP: View Program {plan.name} - {date.toISOString().split('T')[0]}</title
	>
</svelte:head>

<Content>
	<header class="page-header">
		<h2>
			{#if editMode}
				<span contenteditable="true" bind:this={titleElem}>{plan.name}</span>
				-
				<input
					type="date"
					value={date.toISOString().split('T')[0]}
					bind:this={dateElem}
				/>
			{:else}
				{plan.name} - {formatDate(plan.date)}
			{/if}
		</h2>
		<div class="actions">
			<button onclick={edit}>
				{#if editMode}
					Save
				{:else}
					Edit
				{/if}
			</button>
			<button onclick={drop} disabled={editMode}>Delete</button>
		</div>
	</header>

	<Matrix
		matrix={plan.workingSets}
		workouts={plan.workouts}
		disabled={editMode}
		onchange={() => {
			savePlan($state.snapshot(plan))
			iterations += 1
		}}
	/>
</Content>

{#if confirmDelete === 'confirm'}
	<Dialog
		title="Confirm Delete"
		type="confirm"
		onConfirm={() => drop()}
		onCancel={() => (confirmDelete = 'none')}
		>Are you sure you want to delete this program?</Dialog
	>
{/if}

<style>
.page-header {
	display: flex;
	justify-content: space-between;
	gap: var(--gutter);
	/* margin-block-end: var(--gutter); */
}

@media screen and (max-width: 800px) {
	.page-header {
		flex-direction: column;
		gap: calc(var(--gutter) / 2);
	}
}
</style>
