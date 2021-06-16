import docs from '../../../docs.json'
import { Child } from './DocsTypes'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function IsValidChild(array: any[]): array is Child[] {
    const props = [ 'name', 'kindString', 'sources', 'comment' ]
    for (const obj of array) {
        for (const prop of props) {
            if (!Object.prototype.hasOwnProperty.call(obj, prop)) return false
        }
    }
    return true
}

export default function FindDoc(): null | Child[] {
    return docs.children.map((files) => {
        if (!files || !files.children || !Array.isArray(files.children)) return
        if (!IsValidChild(files.children)) return
        return ((files.children as Child[]))
    }).filter((v) => v) as unknown as null | Child[]
}