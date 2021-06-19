import React from 'react'
import { makeStyles, Typography, useTheme } from '@material-ui/core'
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
import { Tags } from '../../../src/DeveloperBadge'

interface Props {
    type: string
    doc: Child
    docKind: string
    codeString: string
    comment: string | null
    properties: Child2[]
    methods: Child2[]
    docTags: Tags[]
}
const useStyles = makeStyles({
    alert: {
        width: '250px',
        marginTop: '10px',
    },
})

export default function DynamicDoc({ type: name, doc, docKind, codeString, comment, properties, methods, docTags }: Props): JSX.Element {
    const theme = useTheme()
    const classes = useStyles()
    return (
        <div>
            <Head title={name} name={`API docs for ${name}`} description={`Carbon API docs for ${name}`} />
            <DeveloperHeader>
                <Typography variant="h5">
                    <span style={{ color: theme.palette.primary.main }}>{doc.kindString.toLowerCase()}</span> {name}
                </Typography>
                {comment && <Typography>{comment}</Typography>}
                {docTags.map((v, i) =>
                    <Alert className={classes.alert} variant="filled" severity="warning" key={i}>This {docKind} is {v.toLowerCase()}</Alert>,
                )}
                <CodeBlock style={{
                    width: '50%',
                }}>
                    {codeString}
                </CodeBlock>
                {(properties && properties.length > 0) && <DeveloperCollapse text={'Properties'}>
                    {properties.map((v, i) => {
                        const tags = GetTags(v)
                        return <DeveloperDocElement name={v.name} description={v?.comment?.shortText ?? v?.comment?.text ?? ''} isProperty key={i} tags={tags} />
                    })}
                </DeveloperCollapse>}
                {(methods && methods.length > 0) && <DeveloperCollapse text="Methods">
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
    const docRaw = FindDoc().filter((v) => allowedTypes.includes(v.kindString.toLowerCase())).filter((v) => v.name === id)
    const doc = docRaw?.[0]
    const docKind = doc.kindString.toLowerCase()
    const constructorKeyword = docKind === 'class' ? 'new ' : ''
    const packageName = doc.sources[0].fileName.split('/')[1]
    const params = docKind === 'class' ? doc.children.find((v) => v.kindString.toLowerCase() === 'constructor').signatures[0].parameters.map((v) => `${v.name}: ${v.type.name}`).join(', ') : ''
    const constructor = `.${doc.name}${docKind === 'class' || docKind === 'function' ? `(${params})` : ''}`
    const codeString = `${constructorKeyword}${packageName}${constructor}`
    const comment = doc?.comment?.shortText ?? doc?.comment?.text ?? null
    const properties = doc?.children?.filter((v) =>
        v.kindString.toLowerCase() === (docKind === 'class' ? 'property' : 'enumeration member'),
    ) ?? null
    const methods = doc?.children?.filter((v) =>
        v.kindString.toLowerCase() === 'method',
    ) ?? null
    const docTags = GetTags(doc)
    return {
        props: {
            type: Array.isArray(id) ? id[0] : id,
            doc,
            docKind,
            codeString,
            comment,
            properties,
            methods,
            docTags,
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