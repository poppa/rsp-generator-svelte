<script lang="ts">
interface Props extends PropsWithChildren {
	style?: 'lighter' | 'light' | 'dark'
}
const { children, style = 'lighter' }: Props = $props()
</script>

<section class:light={style === 'light'} class:dark={style === 'dark'}>
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

.light {
	--bgcolor: var(--color-light);
}

.dark {
	--bgcolor: var(--color-dark);
	--fgcolor: var(--text-light);
}
</style>
