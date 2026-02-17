<script lang="ts">
import type { MatrixEntry, WeekTuple, WorkingSet } from '$lib/calculator'

interface Props {
	matrix: Array<MatrixEntry<WeekTuple<WorkingSet>>>
	workouts?: Array<WeekTuple<boolean[]>>
	onchange?: VoidFunction
	disabled?: boolean
}

const { matrix, workouts = $bindable(), onchange, disabled }: Props = $props()

const toggle = (week: number, day: number, set: number) => {
	if (!workouts || !onchange) {
		return
	}

	workouts[week][day][set] = !workouts[week][day][set]
	onchange()
}

const isDayResolved = (week: number, day: number) => {
	if (!workouts) {
		return false
	}

	return !workouts[week][day].some((v) => !v)
}

const isWeekResolved = (week: number) => {
	if (!workouts) {
		return false
	}

	return workouts[week].every((day, n) => isDayResolved(week, n))
}
</script>

{#each matrix as week, k (week.id)}
	<section class:resolved={isWeekResolved(k)}>
		<h2>Week {k + 1}</h2>
		<div class="wdays">
			{#each week.data as day, n (day.id)}
				<div class="day">
					<header class:resolved={isDayResolved(k, n)}>
						<h3>Day {n + 1}</h3>
						<div>
							{#if day.calculatedWeight}
								{@const cw = 2.5 * Math.round(day.calculatedWeight / 2.5)}
								<b>{Math.round(cw) === cw ? cw : cw.toFixed(1)}</b> kg,
							{/if}
							{#if day.sets === 1 && day.reps === 1}
								<b>1</b> rep of your <strong>new max</strong>
							{:else}
								<b>{day.sets}</b> sets of <b>{day.reps}</b> reps
							{/if}
						</div>
					</header>

					{#if workouts}
						<div class="workingsets">
							{#each workouts[k][n] as kex, x (x)}
								<input
									type="checkbox"
									checked={kex}
									{disabled}
									onchange={() => toggle(k, n, x)}
								/>
							{/each}

							{#if isDayResolved(k, n)}
								<span class="donzo">✓ donzo</span>
							{/if}
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
	gap: 0.7em;
}

section.resolved h2::before {
	content: '✓';
	color: var(--color-success);
	margin-inline-end: var(--gutter-block);
}

.day {
	min-width: 252px;
}

.day header {
	display: flex;
	gap: 1em;
	align-items: end;
}

header.resolved {
	color: var(--text-dim);
}

.donzo {
	color: var(--color-success);
	line-height: 1;
}
</style>
