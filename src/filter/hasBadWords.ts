import Filter from 'bad-words'

const filter = new Filter()

export function hasBadWords(content: string) {
	return filter.isProfane(content)
}
