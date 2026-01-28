<script lang="ts">
import { resolve } from '$app/paths'
import favicon from '$lib/assets/favicon.svg'
import '$lib/assets/base.css'

let { children } = $props()
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<header>
	<h1>
		<a href={resolve('/')}>
			<abbr title="Russian Squat Program"
				>RSP<span class="gen">Generator</span></abbr
			>
			<span class="byline">Russian Squat Program</span>
		</a>
	</h1>
</header>

<main>
	{@render children()}
</main>

<style>
h1 a {
	text-decoration: none;
	display: inline-flex;
	flex-direction: column;
	color: inherit;
}

h1 abbr {
	text-decoration: unset;
}

.gen {
	font-weight: normal;
	font-style: italic;
	font-family: Georgia, 'Times New Roman', Times, serif;
	color: var(--text-soft);
}

h1 a span.byline {
	font-weight: normal;
	font-size: 0.5em;
	color: color(from var(--color-highlight) srgb r g b / 0.5);
	letter-spacing: 2px;
}

header {
	padding: var(--gutter-block) var(--gutter);
	background-color: var(--color-dark);
	color: var(--color-highlight);
}
</style>
