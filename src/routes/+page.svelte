<script lang="ts">
// This is stupid: https://github.com/sveltejs/kit/issues/14103
/* eslint-disable svelte/no-navigation-without-resolve */
import { goto } from '$app/navigation'
import { resolve } from '$app/paths'
import { calculateMatrix } from '$lib/calculator'
import Content from '$lib/comp/Content.svelte'
import Matrix from '$lib/comp/Matrix.svelte'
import { createPlan, loadPlans } from '$lib/plan'
import { formatDate } from '$lib/utils'

const plans = loadPlans()

let displayMax = $state('')

let max = $derived.by(() => {
	return parseInt(displayMax, 10) || 0
})

const matrix = $derived(calculateMatrix(max))

const savePlan = (e: Event) => {
	e.preventDefault()
	const plan = createPlan(max, [...matrix])
	void goto(resolve(`/view/`) + `?id=${plan.id}`)
}
</script>

<svelte:head>
	<title>Russian Squat Program Generator</title>
</svelte:head>

<Content style="light">
	<h2>My Programs</h2>
	<ul>
		{#each Object.entries(plans) as [id, plan] (id)}
			<li>
				<a href={resolve(`/view/`) + `?id=${id}`}>{plan.name}</a> &bull; {formatDate(
					plan.date,
					{ options: { dateStyle: 'short' } }
				)}
			</li>
		{:else}
			<li>You have no programs yet</li>
		{/each}
	</ul>
	<p class="notice">
		<strong>Note!</strong> Your programs will not be saved persitently, they are only
		saved to your browser's local storage.
	</p>
</Content>

<Content style="dark" type="text">
	<p>
		The "Russian" Squat Program (or Routine) is originally meant for increasing
		your squat, but it can effectively be used for deadlift as well. This
		program is primarily for building strength, not size.
	</p>
	<p>
		Fill in your current <em><b>1</b> rep max</em> below to generate the
		program, and hit <em>Create Program</em> to save it. You can then keep track of
		and check each set you've finished.
	</p>
</Content>

<Content style="lighter">
	<h2>Program Generator</h2>

	<form class="controls" onsubmit={savePlan}>
		<input
			type="text"
			inputmode="numeric"
			bind:value={displayMax}
			placeholder="Current 1 rep max in kg"
			pattern="^[0-9]+$"
		/>
		<button onclick={savePlan} disabled={max <= 0}>Create Program</button>
	</form>

	<Matrix {matrix} />
</Content>

<style>
.controls {
	display: flex;
	gap: 0.5em;
	margin-block-start: var(--gutter);
	/* margin-block-end: var(--gutter); */
}

@container section (max-width: 500px) {
	.controls {
		display: grid;
		grid-template-columns: 60% auto;
	}
}

input[type='text'] {
	border: 1px solid var(--input-border-color);
	border-radius: var(--border-radius);
	padding: var(--input-padding);
}

input[type='text']:focus {
	outline: 2px solid var(--color-highlight);
}

button {
	border: 1px solid var(--input-border-color);
	border-radius: var(--border-radius);
	padding: var(--input-padding);
}

button:disabled {
	border-color: var(--input-disabled-border-color);
}

button:focus-visible {
	outline: 2px solid var(--color-highlight);
}
</style>
