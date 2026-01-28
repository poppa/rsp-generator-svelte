export function formatDate(
	date: Date | number,
	{
		locales = undefined,
		options = { dateStyle: 'medium' }
	}: {
		options?: Intl.DateTimeFormatOptions
		locales?: Intl.LocalesArgument
	} = {}
) {
	const fmt = new Intl.DateTimeFormat(locales, options)
	return fmt.format(date)
}
