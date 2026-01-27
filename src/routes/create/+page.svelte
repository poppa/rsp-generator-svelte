<script lang="ts">
import { calculateMatrix } from '$lib'
import Matrix from '$lib/comp/Matrix.svelte'
import { createPlan, loadPlans } from '$lib/plan'

let displayMax = $state('')

let max = $derived.by(() => {
	return parseInt(displayMax, 10) || 0
})

const matrix = $derived(calculateMatrix(max))

function init() {
	const plans = loadPlans()
	console.log(`Plans:`, plans)
}

void init()

const savePlan = () => {
	createPlan(max, [...matrix])
}
</script>

<div class="controls">
	<input
		type="text"
		inputmode="numeric"
		bind:value={displayMax}
		placeholder="Current Max"
		pattern="^[0-9]+$"
	/>
	<button onclick={savePlan} disabled={max <= 0}>Create Plan</button>
</div>

<Matrix {matrix} />

<style>
.controls {
	display: flex;
	gap: 0.5em;
}
</style>
