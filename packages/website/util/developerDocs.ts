import { readFile, readdir } from 'fs/promises'
import { join } from 'path'
import { loadFront } from 'yaml-front-matter'

const docsLocation = join(process.cwd(), 'developer-docs')

console.log(docsLocation)

let docs: Record<string, DocData>

export interface DocData {
    name: string
    content: string
    id: string
}

export async function getDocs(): Promise<Record<string, DocData>>  {
    return docs ?? (docs = (await readdir(docsLocation))
        .reduce(async (acc, id: string) => {
            const buffer = await readFile(join(docsLocation, id.split('.')[0]))
            const file = buffer.toString()

            const { name, __content: content } = loadFront(file)

            return { ...acc, [id]: { name, content, id } }
        }, {}))
}

export async function getDoc(id: string): Promise<DocData | null> {
    const docs = await getDocs()

    return docs[id] ?? null
}