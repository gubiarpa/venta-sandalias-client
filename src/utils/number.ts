export function formatNumber(number?: number) {
	if (!number) return ''

	return number.toFixed(2)
}
