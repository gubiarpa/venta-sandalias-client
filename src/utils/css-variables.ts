export const getCssVariable = (variableName: string) =>
	getComputedStyle(document.documentElement)?.getPropertyValue(variableName)?.trim()
