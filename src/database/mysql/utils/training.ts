const FIELD_REGEX = /(^- )|((<br+>)(- )?)/g

export const parseValueToArray = (field: string | null) => {
	if (!field) return []

	return field
		.replace(FIELD_REGEX, ',')
		.split(',')
		.map(e => e.trim())
		.filter(e => e.length > 0)
}
