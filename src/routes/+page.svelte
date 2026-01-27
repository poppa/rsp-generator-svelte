<script lang="ts">
/* eslint-disable svelte/no-navigation-without-resolve */
import { resolve } from '$app/paths'
import { loadPlans } from '$lib/plan'

const plans = loadPlans()
</script>

<p>
	<a href={resolve('/create')}>Create Plan</a>
</p>

<ul>
	{#each Object.entries(plans) as [id, plan] (id)}
		<li>
			<a href={`/view/?id=${id}`}>{plan.name}</a>
		</li>
	{/each}
</ul>
