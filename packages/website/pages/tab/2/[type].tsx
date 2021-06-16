import React from 'react'
import { Typography, useTheme } from '@material-ui/core'
import { useRouter } from 'next/router'
import DeveloperHeader from '../../../src/DeveloperHeader'
import CodeBlock from '../../../src/CodeBlock'
import FindDoc from '../../../src/FindDoc'

export default function DynamicDoc(): JSX.Element {
    const theme = useTheme()
    const router = useRouter()
    const { type: name } = router.query
    const possibleDoc = FindDoc().flat()
    if (!possibleDoc || possibleDoc.length <= 0) return <div>This page doesn't exist.</div>
    const doc = possibleDoc.find((v) => v.name === name)
    if (!doc) return <div>This page doesn't exist.</div>
    console.log(doc)
    const isClass = doc.kindString.toLowerCase() === 'class'
    // START: code string constructing
    const constructorKeyword = isClass ? 'new ' : ''
    const packageName = doc.sources[0].fileName.split('/')[1]
    const params = isClass ? doc.children.find((v) => v.kindString === 'Constructor').signatures[0].parameters.map((v) => `${v.name}: ${v.type.name}`) : ''
    const constructor = isClass ? `.${doc.name}(${params})` : `.${doc.name}`
    const codeString = `${constructorKeyword}${packageName}${constructor}`
    // END
    return (
        <div>
            <DeveloperHeader>
                <Typography variant="h4">
                    <span style={{ color: theme.palette.primary.main }}>{doc.kindString.toLowerCase()}</span> {name}
                    <br />
                    {doc.comment.shortText}
                </Typography>
                <CodeBlock>
                    {codeString}
                </CodeBlock>
            </DeveloperHeader>
        </div>
    )
}