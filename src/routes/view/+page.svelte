<script lang="ts">
import { page } from '$app/state'
import Matrix from '$lib/comp/Matrix.svelte'
import { loadPlan, savePlan } from '$lib/plan.js'
import { error } from '@sveltejs/kit'

const id = $state(page.url.searchParams.get('id') ?? '')

let iterations = $state(0)
const plan = $derived.by(() => {
	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	iterations
	return loadPlan(id)
})

// svelte-ignore state_referenced_locally
if (!plan) {
	error(404)
}

const date = $derived(new Date(plan.date))
</script>

<h2>{plan.name} - {date.toISOString().split('T')[0]}</h2>

<Matrix
	matrix={plan.workingSets}
	plans={plan.plans}
	onchange={() => {
		savePlan($state.snapshot(plan))
		iterations += 1
	}}
/>
