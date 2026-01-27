import type { MatrixEntry, WeekTuple, WorkingSet } from './calculator.js'
import type { Maybe } from './type-types.js'

const DbName = 'rsp'

export interface Plan {
	workingSets: Array<MatrixEntry<WeekTuple<WorkingSet>>>
	plans: Array<WeekTuple<boolean[]>>
	name: string
	date: number
	id: string
}

export type UninitializedPlan = Omit<Plan, 'id'> & { id?: string }

export type Plans = Record<string, Plan>

export function loadPlans() {
	const plans = JSON.parse(localStorage.getItem(DbName) ?? '{}') as Plans
	return plans
}

export function loadPlan(id: string) {
	return loadPlans()[id] as Maybe<Plan>
}

export function createPlan(max: number, ws: Plan['workingSets']) {
	const plans: Plan['plans'] = []

	for (const week of ws) {
		const tuple = week.data.map((w) =>
			new Array(w.sets).fill(false)
		) as WeekTuple<boolean[]>
		plans.push(tuple)
	}

	const myPlan: Plan = {
		workingSets: ws,
		plans,
		name: `${max} kg Max`,
		id: crypto.randomUUID(),
		date: Date.now()
	}

	console.log(`My Plan:`, myPlan)

	return savePlan(myPlan)
}

export function savePlan(plan: Plan) {
	const plans = loadPlans()
	plans[plan.id] = plan as Plan
	localStorage.setItem(DbName, JSON.stringify(plans))

	return plan
}
