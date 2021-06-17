import React from 'react'
import { Typography, useTheme } from '@material-ui/core'
import DeveloperHeader from '../../../src/DeveloperHeader'
import CodeBlock from '../../../src/CodeBlock'
import FindDoc from '../../../src/FindDoc'
import DeveloperCollapse from '../../../src/DeveloperCollapse'
import DeveloperDocElement from '../../../src/DeveloperDocElement'
import GetTags from '../../../src/GetTags'
import { Alert } from '@material-ui/lab'
import Head from '../../../src/Head'
import { allowedTypes, Child, Child2 } from '../../../src/DocsTypes'
import { GetStaticProps } from 'next'

interface Props {
    type: string
    doc: Child
    isClass: boolean
    codeString: string
    comment: string | null
    properties: Child2[]
    methods: Child2[]
}

export default function DynamicDoc({ type: name, doc, isClass, codeString, comment, properties, methods }: Props): JSX.Element {
    const theme = useTheme()
    const docTags = GetTags(doc)
    return (
        <div>
            <Head title={name} name='API docs for Carbon' description={`Carbon API docs for ${name}`} />
            <DeveloperHeader>
                <Typography variant="h5">
                    <span style={{ color: theme.palette.primary.main }}>{doc.kindString.toLowerCase()}</span> {name}
                </Typography>
                {comment && <Typography>{comment}</Typography>}
                {docTags.map((v, i) =>
                    <Alert style={{ width: '250px', marginTop: '10px' }} variant="filled" severity="warning" key={i}>This {isClass ? 'class' : 'enum'} is {v.toLowerCase()}</Alert>,
                )}
                <CodeBlock style={{
                    width: '50%',
                }}>
                    {codeString}
                </CodeBlock>
                {properties.length > 0 && <DeveloperCollapse text={'Properties'}>
                    {properties.map((v, i) => {
                        const tags = GetTags(v)
                        return <DeveloperDocElement name={v.name} description={v?.comment?.shortText ?? v?.comment?.text ?? ''} isProperty key={i} tags={tags} />
                    })}
                </DeveloperCollapse>}
                {methods.length > 0 && <DeveloperCollapse text="Methods">
                    {methods?.map((v, i) => {
                        const tags = GetTags(v)
                        const params = v.signatures?.[0]?.parameters?.map((p) => `${p.name}: ${p.type.name}`).join(', ')
                        return <DeveloperDocElement name={v.name} description={v?.comment?.shortText ?? v?.comment?.text ?? ''} key={i} tags={tags} params={params} />
                    })}
                </DeveloperCollapse>}
            </DeveloperHeader>
        </div>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps: GetStaticProps<Props> = async ({ params: { type: id } }) => {
    const docRaw = FindDoc().flat().filter((v) => allowedTypes.includes(v.kindString.toLowerCase())).filter((v) => v.name === id)
    const doc = docRaw?.[0]
    const isClass = doc.kindString.toLowerCase() === 'class'
    const constructorKeyword = isClass ? 'new ' : ''
    const packageName = doc.sources[0].fileName.split('/')[1]
    const params = isClass ? doc.children.find((v) => v.kindString.toLowerCase() === 'constructor').signatures[0].parameters.map((v) => `${v.name}: ${v.type.name}`).join(', ') : ''
    const constructor = `.${doc.name}${isClass ? `(${params})` : ''}`
    const codeString = `${constructorKeyword}${packageName}${constructor}`
    const comment = doc.comment.shortText ?? doc.comment.text ?? null
    const properties = doc.children.filter((v) =>
        v.kindString.toLowerCase() === (isClass ? 'property' : 'enumeration member'),
    )
    const methods = doc.children.filter((v) =>
        v.kindString.toLowerCase() === 'method',
    )
    return {
        props: {
            type: Array.isArray(id) ? id[0] : id,
            doc,
            isClass,
            codeString,
            comment,
            properties,
            methods,
        },
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticPaths: any = async () => {
    const paths = FindDoc().flat().filter((v) => allowedTypes.includes(v.kindString.toLowerCase())).map((v) => {
        return { params: { type: v.name } }
    })
    return {
        paths,
        fallback: false,
    }
}