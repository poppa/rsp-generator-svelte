// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { Snippet } from 'svelte'
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	declare interface PropsWithChildren<T = void> {
		children: Snippet<[T]>
	}

	declare interface PropsWithOptionalChildren<T = void> {
		children?: Snippet<[T]>
	}
}

export {}
