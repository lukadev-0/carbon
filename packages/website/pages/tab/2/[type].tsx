import React from 'react'
import { Typography, useTheme } from '@material-ui/core'
import { useRouter } from 'next/router'
import DeveloperHeader from '../../../src/DeveloperHeader'
import CodeBlock from '../../../src/CodeBlock'
import FindDoc from '../../../src/FindDoc'
import DeveloperCollapse from '../../../src/DeveloperCollapse'
import DeveloperDocElement from '../../../src/DeveloperDocElement'
import GetTags from '../../../src/GetTags'
import { Alert } from '@material-ui/lab'
import Head from '../../../src/Head'

export default function DynamicDoc(): JSX.Element {
    const theme = useTheme()
    const router = useRouter()
    const { type: name } = router.query
    const possibleDoc = FindDoc().flat()
    const doc = possibleDoc?.find((v) => v.name === name)
    if (!possibleDoc || possibleDoc.length <= 0 || !doc) return <div>This page doesn't exist.</div>
    const isClass = doc.kindString.toLowerCase() === 'class'
    // START: code string constructing
    const constructorKeyword = isClass ? 'new ' : ''
    const packageName = doc.sources[0].fileName.split('/')[1]
    const params = isClass ? doc.children.find((v) => v.kindString.toLowerCase() === 'constructor').signatures[0].parameters.map((v) => `${v.name}: ${v.type.name}`).join(', ') : ''
    const constructor = `.${doc.name}${isClass ? `(${params})` : ''}`
    const codeString = `${constructorKeyword}${packageName}${constructor}`
    // END
    const comment = doc.comment.shortText ?? doc.comment.text ?? null
    const properties = doc.children.filter((v) =>
        v.kindString.toLowerCase() === (isClass ? 'property' : 'enumeration member'),
    )
    const methods = doc.children.filter((v) =>
        v.kindString.toLowerCase() === 'method',
    )
    const docTags = GetTags(doc)
    return (
        <div>
            <Head title={Array.isArray(name) ? name[0] : name} name='API docs for Carbon' description={`Carbon API docs for ${name}`} />
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