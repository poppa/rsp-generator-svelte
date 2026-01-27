<script lang="ts">
import type { MatrixEntry, WeekTuple, WorkingSet } from '$lib/calculator'

interface Props {
	matrix: Array<MatrixEntry<WeekTuple<WorkingSet>>>
	plans?: Array<WeekTuple<boolean[]>>
	onchange?: VoidFunction
}

const { matrix, plans = $bindable(), onchange }: Props = $props()

const toggle = (week: number, day: number, set: number) => {
	if (!plans || !onchange) {
		return
	}

	plans[week][day][set] = !plans[week][day][set]
	onchange()
}

const isDayResolved = (week: number, day: number) => {
	if (!plans) {
		return false
	}

	return !plans[week][day].some((v) => !v)
}
</script>

{#each matrix as week, k (week.id)}
	<section>
		<h2>Week {k + 1}</h2>
		<div class="wdays">
			{#each week.data as day, n (day.id)}
				<div class="day">
					<header class:resolved={isDayResolved(k, n)}>
						<h3>Day {n + 1}</h3>
						<div>
							{#if day.calculatedWeight}
								<b
									>{Math.round(day.calculatedWeight) === day.calculatedWeight
										? day.calculatedWeight
										: day.calculatedWeight.toFixed(1)}</b
								> kg,
							{/if}
							<b>{day.sets}</b> sets of <b>{day.reps}</b> reps
						</div>
					</header>

					{#if plans}
						<div class="workingsets">
							{#each plans[k][n] as kex, x (x)}
								<input
									type="checkbox"
									checked={kex}
									onchange={() => {
										toggle(k, n, x)
										// console.log(`Change:`, k, n, x, kex)
									}}
								/>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</section>
{/each}

<style>
h2,
h3 {
	margin: 0;
}

h2 {
	margin-block-start: 1em;
	margin-block-end: 0.265em;
	color: var(--text-dim);
	background-color: var(--color-light);
	padding: calc(var(--gutter-block) / 2) var(--gutter-block);
	border-radius: 0.4rem;
}

h3 {
	color: var(--text-soft);
}

.wdays {
	display: flex;
	gap: 1em;
	padding-inline: var(--gutter-block);
}

section {
	container-type: inline-size;
}

@container (width < 880px) {
	section .wdays {
		flex-direction: column;
	}
}

.workingsets {
	padding: var(--gutter-block) 0;
	display: flex;
	gap: 0.5em;
}

.day header {
	display: flex;
	gap: 1em;
	align-items: end;
}

.day header.resolved::after {
	content: '✓ donzo';
	color: var(--color-highlight);
	margin-inline-start: auto;
}
</style>
