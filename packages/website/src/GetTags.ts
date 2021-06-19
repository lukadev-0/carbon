import { Tags } from './DeveloperBadge'
import { Child, Child2 } from './DocsTypes'
const propTag = [ 'deprecated', 'readonly' ]
const propsObj = {
    deprecated: 'DEPRECATED',
    readonly: 'READ-ONLY',
}

export default function GetTags(v: Child | Child2): Tags[] {
    const tags = []
    v?.flags?.isReadonly && tags.push('READ-ONLY')
    v?.flags?.isPrivate && tags.push('PRIVATE')
    v?.comment?.tags?.map((v) => {
        if (!(propTag.includes(v?.tag?.toLowerCase()))) return
        tags.push(propsObj[v?.tag?.toLowerCase()])
    })
    return tags
}