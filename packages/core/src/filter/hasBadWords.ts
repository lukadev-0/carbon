let regExArray: RegExp[] = []
import axios from 'axios'

export const promise = axios
    .get('https://raw.githubusercontent.com/daimond113/badwords/master/en.txt')
    .then(
        (res) =>
            (regExArray = res.data
                .split('\n')
                .map((regex: string) => new RegExp(regex, 'gi'))),
    )

export function hasBadWords(content: string): boolean {
    const noWhitespace = content.replace(/\s+/g, '') // Using "+" is more performant
    return regExArray.some((regex) => regex.test(noWhitespace))
}
