<script lang="ts">
interface Props extends PropsWithChildren {
	style?: 'lighter' | 'light' | 'dark'
	type?: 'text' | 'default'
}
const { children, style = 'lighter', type = 'default' }: Props = $props()
</script>

<section
	class:light={style === 'light'}
	class:dark={style === 'dark'}
	class:text={type === 'text'}
>
	{@render children()}
</section>

<style>
section {
	--bgcolor: var(--section-bg-color, var(--color-lighter));
	--fgcolor: var(--section-fg-color, var(--text));

	container: section / inline-size;

	padding: var(--gutter);
	background-color: var(--bgcolor);
	color: var(--fgcolor);
}

section > :global(*:first-child) {
	margin-block-start: 0;
}
section > :global(*:last-child) {
	margin-block-end: 0;
}

@media screen and (min-width: 800px) {
	.text {
		padding-inline-end: 20em;
	}
}

.light {
	--bgcolor: var(--color-light);
}

.dark {
	--bgcolor: lch(from var(--color-dark) calc(l + 15) c h);
	--fgcolor: var(--text-light);
}
</style>
