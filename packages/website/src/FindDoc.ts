/* eslint-disable @typescript-eslint/no-explicit-any */
import docs from '../../../docs.json'
import { Child } from './DocsTypes'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function FindDoc(parent?: any): null | Child[] {
    return (parent || docs.children).map((files) => {
        if (files.children) {
            return [ files, FindDoc(files.children) ]
        }
        return [ files ]
    }).filter((v) => v).flat(Infinity) as unknown as null | Child[]
}