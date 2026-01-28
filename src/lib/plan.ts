import type { MatrixEntry, WeekTuple, WorkingSet } from './calculator.js'
import type { Maybe } from './type-types.js'

const DbName = 'rsp'

export interface Plan {
	workingSets: Array<MatrixEntry<WeekTuple<WorkingSet>>>
	workouts: Array<WeekTuple<boolean[]>>
	name: string
	date: number
	id: string
}

export type Plans = Record<string, Plan>

export function loadPlans() {
	const plans = JSON.parse(localStorage.getItem(DbName) ?? '{}') as Plans
	return plans
}

export function loadPlan(id: string) {
	return loadPlans()[id] as Maybe<Plan>
}

export function createPlan(max: number, ws: Plan['workingSets']) {
	const plans: Plan['workouts'] = []

	for (const week of ws) {
		const tuple = week.data.map((w) =>
			new Array(w.sets).fill(false)
		) as WeekTuple<boolean[]>
		plans.push(tuple)
	}

	const myPlan: Plan = {
		workingSets: ws,
		workouts: plans,
		name: `${max} kg Max`,
		id: crypto.randomUUID(),
		date: Date.now()
	}

	return savePlan(myPlan)
}

export function savePlan(plan: Plan) {
	const plans = loadPlans()
	plans[plan.id] = plan as Plan
	localStorage.setItem(DbName, JSON.stringify(plans))

	return plan
}

export function deletePlan(id: string) {
	const plans = loadPlans()
	console.log(`Drop %o`, id)
	console.log(`Plans: %O`, plans)
	delete plans[id]

	localStorage.setItem(DbName, JSON.stringify(plans))
}

export function percentageDone(plan: Plan) {
	const data = { total: 0, checked: 0 }

	if (!plan.workingSets) {
		return 0
	}

	for (const week of plan.workingSets) {
		for (const day of week.data) {
			data.total += day.sets
		}
	}

	for (const w of plan.workouts) {
		for (const d of w) {
			data.checked += d.reduce((p, c) => (c ? p + 1 : p), 0)
		}
	}

	return Math.round((data.checked / data.total) * 100)
}
