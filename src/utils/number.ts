export function formatNumber(number?: number) {
	if (!number) return ''

	return number.toFixed(2)
}

export function isNumber(str: string) {
	return !isNaN(Number(str)) && str.trim() !== ''
}
