<script lang="ts">
import { goto } from '$app/navigation'
import { resolve } from '$app/paths'
import { calculateMatrix } from '$lib'
import Matrix from '$lib/comp/Matrix.svelte'
import { createPlan } from '$lib/plan'

let displayMax = $state('')

let max = $derived.by(() => {
	return parseInt(displayMax, 10) || 0
})

const matrix = $derived(calculateMatrix(max))

const savePlan = () => {
	const plan = createPlan(max, [...matrix])
	// This is stupid: https://github.com/sveltejs/kit/issues/14103
	// eslint-disable-next-line svelte/no-navigation-without-resolve
	goto(resolve(`/view/`) + `?id=${plan.id}`)
}
</script>

<svelte:head>
	<title>RSP: Create Program</title>
</svelte:head>

<div class="controls">
	<input
		type="text"
		inputmode="numeric"
		bind:value={displayMax}
		placeholder="Current Max"
		pattern="^[0-9]+$"
	/>
	<button onclick={savePlan} disabled={max <= 0}>Create Program</button>
</div>

<Matrix {matrix} />

<style>
.controls {
	display: flex;
	gap: 0.5em;
}
</style>
