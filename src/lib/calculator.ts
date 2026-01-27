export interface WorkLoad {
	intencity: number
	reps: number
	sets: number
}

export interface WorkingSet extends WorkLoad {
	max: number
	calculatedWeight: number
	id: string
}

export type WeekTuple<T> = [T, T, T]

export interface MatrixEntry<Data extends unknown[]> {
	id: string
	data: Data
}

class Percentage {
	static P80 = 0.8
	static P85 = 0.85
	static P90 = 0.9
	static P95 = 0.95
	static P100 = 1
	static P105 = 1.05
}

const baseMatrix: Array<WeekTuple<WorkLoad>> = [
	// week 1
	[
		{
			intencity: Percentage.P80,
			reps: 2,
			sets: 6
		},
		{
			intencity: Percentage.P80,
			reps: 3,
			sets: 6
		},
		{
			intencity: Percentage.P80,
			reps: 2,
			sets: 6
		}
	],
	// Week 2
	[
		{
			intencity: Percentage.P80,
			reps: 4,
			sets: 6
		},
		{
			intencity: Percentage.P80,
			reps: 2,
			sets: 6
		},
		{
			intencity: Percentage.P80,
			reps: 5,
			sets: 6
		}
	],
	// week 3
	[
		{
			intencity: Percentage.P80,
			reps: 2,
			sets: 6
		},
		{
			intencity: Percentage.P80,
			reps: 6,
			sets: 6
		},
		{
			intencity: Percentage.P80,
			reps: 2,
			sets: 6
		}
	],
	// week 4
	[
		{
			intencity: Percentage.P85,
			reps: 5,
			sets: 5
		},
		{
			intencity: Percentage.P80,
			reps: 2,
			sets: 6
		},
		{
			intencity: Percentage.P90,
			reps: 4,
			sets: 4
		}
	],
	// week 5
	[
		{
			intencity: Percentage.P80,
			reps: 2,
			sets: 6
		},
		{
			intencity: Percentage.P95,
			reps: 3,
			sets: 3
		},
		{
			intencity: Percentage.P80,
			reps: 2,
			sets: 6
		}
	],
	// week 6
	[
		{
			intencity: Percentage.P100,
			reps: 2,
			sets: 2
		},
		{
			intencity: Percentage.P80,
			reps: 3,
			sets: 6
		},
		{
			intencity: Percentage.P105,
			reps: 1,
			sets: 1
		}
	]
]

/**
 *
 * @param {number} max
 */
export function calculateMatrix(max: number) {
	return [...baseMatrix].map((week, i) => {
		return {
			id: `row${i}`,
			data: week.map((w, j) => {
				return {
					...w,
					max,
					calculatedWeight: max * w.intencity,
					id: `x${i}y${j}`
				}
			})
		}
	}) as unknown as Array<MatrixEntry<WeekTuple<WorkingSet>>>
}
